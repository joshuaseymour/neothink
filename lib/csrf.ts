import { Redis } from '@upstash/redis'
import { v4 as uuidv4 } from 'uuid'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CSRF_TOKEN_TTL = 600 // 10 minutes in seconds

export async function generateCsrfToken(): Promise<string> {
  const token = uuidv4()
  await redis.set(`csrf:${token}`, true, { ex: CSRF_TOKEN_TTL })
  return token
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  if (!token) return false
  
  const isValid = await redis.get(`csrf:${token}`)
  if (isValid) {
    // Delete the token after use for added security
    await redis.del(`csrf:${token}`)
  }
  
  return !!isValid
}
