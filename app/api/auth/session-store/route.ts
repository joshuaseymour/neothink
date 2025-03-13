import { type NextRequest, NextResponse } from "next/server"
import { SessionStore } from "@/lib/session-store"
import { validateCsrfToken } from "@/lib/csrf"

/**
 * API endpoint to store session data with CSRF protection
 */
export async function POST(request: NextRequest) {
  // Validate CSRF token
  const csrfToken = request.headers.get("X-CSRF-Token")
  if (!csrfToken || !validateCsrfToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid security token" }, { status: 403 })
  }

  try {
    const { sessionId, userId, userAgent, timestamp } = await request.json()

    if (!sessionId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get client IP address
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Store session data
    await SessionStore.createSession(sessionId, {
      userId,
      userAgent,
      ip,
      createdAt: timestamp || Date.now(),
      lastActive: Date.now(),
    })

    return NextResponse.json({ success: true, message: "Session stored successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error storing session:", error)
    return NextResponse.json({ error: "Failed to store session" }, { status: 500 })
  }
}

