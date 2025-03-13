import { type NextRequest, NextResponse } from "next/server"
import { SessionStore } from "@/lib/session-store"

/**
 * API endpoint to verify session storage in Redis
 * This is used by the verification utility and doesn't affect the UI
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      console.error("Missing session ID in request")
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 })
    }

    console.log(`Verifying session storage for ID: ${sessionId}`)

    // Check if session exists in Redis
    try {
      const sessionData = await SessionStore.getSession(sessionId)

      if (!sessionData) {
        console.log(`Session not found: ${sessionId}`)
        return NextResponse.json({ error: "Session not found in storage" }, { status: 404 })
      }

      console.log(`Session found: ${sessionId}`)
      return NextResponse.json(
        {
          success: true,
          message: "Session found in storage",
          data: {
            exists: true,
            // Don't return sensitive session data, just confirmation
            lastActive: sessionData.lastActive || null,
          },
        },
        { status: 200 },
      )
    } catch (error) {
      console.error("Error retrieving session:", error)
      return NextResponse.json({ error: "Error retrieving session" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error verifying session storage:", error)
    return NextResponse.json({ error: "Failed to verify session storage" }, { status: 500 })
  }
}

