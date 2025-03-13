import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { SessionStore } from "@/lib/session-store"

// Get all active sessions for the current user
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(cookies())

    // Get current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get all sessions for this user
    const sessions = await SessionStore.getUserSessions(session.user.id)

    // Mark current session
    const currentSessionId = session.access_token
    const formattedSessions = Object.entries(sessions).map(([id, data]) => ({
      id,
      ...data,
      current: id === currentSessionId,
    }))

    return NextResponse.json({ sessions: formattedSessions })
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}

// Delete a specific session or all other sessions
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient(cookies())

    // Get current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("id")
    const deleteOthers = searchParams.get("others") === "true"

    if (deleteOthers) {
      // Delete all other sessions
      const count = await SessionStore.deleteOtherSessions(session.user.id, session.access_token)
      return NextResponse.json({ success: true, message: `Deleted ${count} other sessions` })
    } else if (sessionId) {
      // Check if this is the current session
      if (sessionId === session.access_token) {
        // Sign out from Supabase
        await supabase.auth.signOut()
      }

      // Delete the specific session
      await SessionStore.deleteSession(sessionId)
      return NextResponse.json({ success: true, message: "Session deleted" })
    } else {
      return NextResponse.json({ error: "Missing session ID or 'others' parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error deleting session:", error)
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 })
  }
}

