import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { rateLimitMiddleware, getRateLimitResponse } from "@/middleware/rate-limit"

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/reset-password"]
const AUTH_ROUTES = ["/login", "/signup", "/reset-password"]
const ADMIN_ROUTES = ["/admin"]

export async function middleware(request: NextRequest) {
  console.log("Middleware processing path:", request.nextUrl.pathname)

  // Skip middleware for static assets and API routes
  if (request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.includes(".")) {
    return addSecurityHeaders(NextResponse.next())
  }

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  // Check rate limiting first
  const rateLimitResult = await rateLimitMiddleware(request)
  if (rateLimitResult.limited) {
    return getRateLimitResponse(rateLimitResult)
  }

  // Get session
  const { data: { session } } = await supabase.auth.getSession()

  // Auth pages are only accessible when not logged in
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Protected routes require authentication
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/api/admin")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // Admin routes require admin role
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (!profile || profile.role !== "admin") {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 403 }
        )
      }
    }
  }

  // Refresh session if expired - required for Server Components
  const { data: { session: refreshedSession }, error: sessionError } = await supabase.auth.getSession()

  // Handle authentication based on route
  if (AUTH_ROUTES.includes(request.nextUrl.pathname)) {
    // Redirect to dashboard if already authenticated
    if (refreshedSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  } else if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    // Protected route
    if (!refreshedSession) {
      // Save the original URL to redirect after login
      const redirectUrl = `/login?next=${encodeURIComponent(request.nextUrl.pathname)}`
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }

    // Handle admin routes
    if (ADMIN_ROUTES.some(route => request.nextUrl.pathname.startsWith(route))) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", refreshedSession.user.id)
          .single()

        if (!profile || profile.role !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  // Redirect logged in users away from auth pages
  if (refreshedSession && (request.nextUrl.pathname.startsWith("/auth") || request.nextUrl.pathname === "/")) {
    console.log("Redirecting authenticated user from auth page")

    try {
      // Check if user has completed onboarding
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", refreshedSession.user.id)
        .single()

      if (!profile?.onboarding_completed) {
        console.log("User has not completed onboarding, redirecting to welcome")
        return addSecurityHeaders(NextResponse.redirect(new URL("/welcome", request.url)))
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error)
    }

    console.log("Redirecting to dashboard")
    return addSecurityHeaders(NextResponse.redirect(new URL("/dashboard", request.url)))
  }

  return addSecurityHeaders(NextResponse.next())
}

/**
 * Add security headers to the response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Set security headers
  const headers = response.headers

  // Content Security Policy
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://*.supabase.co; frame-src 'self'",
  )

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY")

  // Enable XSS protection in browsers
  headers.set("X-XSS-Protection", "1; mode=block")

  // Strict Transport Security
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Permissions Policy
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't require auth
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/public).*)",
  ],
}
