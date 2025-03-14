import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error

    if (!session) {
      return Response.json({ success: false, error: "No active session" }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    return Response.json({
      success: true,
      data: {
        session,
        profile,
      },
    })
  } catch (error: any) {
    console.error("Session error:", error)
    return Response.json(
      { success: false, error: error.message || "Session verification failed" },
      { status: 400 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error

    if (!session) {
      return Response.json({ success: false, error: "No active session" }, { status: 401 })
    }

    // Refresh the session
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
    if (refreshError) throw refreshError

    return Response.json({
      success: true,
      data: refreshData,
    })
  } catch (error: any) {
    console.error("Session refresh error:", error)
    return Response.json(
      { success: false, error: error.message || "Session refresh failed" },
      { status: 400 }
    )
  }
}
