import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Rate limit configuration for different endpoints
const RATE_LIMIT_CONFIG = {
  // Login endpoint rate limiting
  login: {
    points: 5, // 5 attempts
    duration: 300, // per 5 minutes (in seconds)
    blockDuration: 1800, // block for 30 minutes after exceeding (in seconds)
  },
  // General API rate limiting
  api: {
    points: 60, // 60 requests
    duration: 60, // per minute (in seconds)
    blockDuration: 300, // block for 5 minutes after exceeding (in seconds)
  },
  // User-specific login rate limiting
  userLogin: {
    points: 3, // 3 attempts
    duration: 300, // per 5 minutes (in seconds)
    blockDuration: 3600, // block for 1 hour after exceeding (in seconds)
  },
}

// Types for rate limiting
export interface RateLimitResult {
  limited: boolean
  remaining: number
  reset: number
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  // Try to get IP from Vercel-specific headers first
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  // Try to get IP from Vercel's x-real-ip header
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }

  // Fallback to a default IP
  return "127.0.0.1"
}

/**
 * Get client fingerprint from request
 * This combines IP with user agent for better tracking
 */
function getClientFingerprint(request: NextRequest): string {
  const ip = getClientIp(request)
  const userAgent = request.headers.get("user-agent") || "unknown-agent"
  return `${ip}:${userAgent}`.substring(0, 100)
}

/**
 * Rate limiter for login attempts by IP address
 */
export async function loginRateLimiter(request: NextRequest): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIG.login
  const fingerprint = getClientFingerprint(request)
  const key = `rate_limit:login:${fingerprint}`
  const now = Date.now()

  try {
    const data = (await redis.get(key)) as { count: number; timestamp: number } | null

    if (!data) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (now - data.timestamp > config.duration * 1000) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (data.count >= config.points) {
      await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.blockDuration })
      return {
        limited: true,
        remaining: 0,
        reset: data.timestamp + config.blockDuration * 1000,
      }
    }

    await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.duration })
    return {
      limited: false,
      remaining: config.points - data.count - 1,
      reset: data.timestamp + config.duration * 1000,
    }
  } catch (error) {
    console.error("Rate limit error:", error)
    return { limited: false, remaining: 1, reset: now + config.duration * 1000 }
  }
}

/**
 * Rate limiter for login attempts by email address
 */
export async function userLoginRateLimiter(email: string): Promise<RateLimitResult> {
  if (!email) {
    return { limited: false, remaining: 999, reset: Date.now() + 3600000 }
  }

  const config = RATE_LIMIT_CONFIG.userLogin
  const key = `rate_limit:user_login:${email.toLowerCase()}`
  const now = Date.now()

  try {
    const data = (await redis.get(key)) as { count: number; timestamp: number } | null

    if (!data) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (now - data.timestamp > config.duration * 1000) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (data.count >= config.points) {
      await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.blockDuration })
      return {
        limited: true,
        remaining: 0,
        reset: data.timestamp + config.blockDuration * 1000,
      }
    }

    await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.duration })
    return {
      limited: false,
      remaining: config.points - data.count - 1,
      reset: data.timestamp + config.duration * 1000,
    }
  } catch (error) {
    console.error("User rate limit error:", error)
    return { limited: false, remaining: 1, reset: now + config.duration * 1000 }
  }
}

/**
 * General rate limiter middleware for API routes
 */
export async function rateLimitMiddleware(request: NextRequest): Promise<RateLimitResult> {
  const path = request.nextUrl.pathname

  // Only apply rate limiting to authentication and API routes
  if (!path.startsWith("/api/auth") && !path.startsWith("/api/admin")) {
    return { limited: false, remaining: 999, reset: Date.now() + 3600000 }
  }

  const config = RATE_LIMIT_CONFIG.api
  const fingerprint = getClientFingerprint(request)
  const key = `rate_limit:api:${fingerprint}`
  const now = Date.now()

  try {
    const data = (await redis.get(key)) as { count: number; timestamp: number } | null

    if (!data) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (now - data.timestamp > config.duration * 1000) {
      await redis.set(key, { count: 1, timestamp: now }, { ex: config.duration })
      return {
        limited: false,
        remaining: config.points - 1,
        reset: now + config.duration * 1000,
      }
    }

    if (data.count >= config.points) {
      await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.blockDuration })
      return {
        limited: true,
        remaining: 0,
        reset: data.timestamp + config.blockDuration * 1000,
      }
    }

    await redis.set(key, { count: data.count + 1, timestamp: data.timestamp }, { ex: config.duration })
    return {
      limited: false,
      remaining: config.points - data.count - 1,
      reset: data.timestamp + config.duration * 1000,
    }
  } catch (error) {
    console.error("API rate limit error:", error)
    return { limited: false, remaining: 1, reset: now + config.duration * 1000 }
  }
}

/**
 * Get rate limit response for blocked requests
 */
export function getRateLimitResponse(result: RateLimitResult): NextResponse {
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)
  
  return new NextResponse(
    JSON.stringify({
      error: "Too many requests",
      message: "Please try again later",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": result.remaining.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": result.reset.toString(),
        "Retry-After": retryAfter.toString(),
      },
    }
  )
}
