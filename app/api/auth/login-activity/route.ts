import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { validateCsrfToken } from "@/lib/csrf"

/**
 * API endpoint to record login activity with CSRF protection
 */
export async function POST(request: NextRequest) {
  // Validate CSRF token
  const csrfToken = request.headers.get("X-CSRF-Token")
  if (!csrfToken || !validateCsrfToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid security token" }, { status: 403 })
  }

  try {
    const { userId, userAgent, timestamp } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get client IP address
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Get location information based on IP (simplified)
    let location = "Unknown"
    try {
      // This would typically use a geolocation service
      // For now, we'll just use a placeholder
      location = "Unknown location"
    } catch (error) {
      console.error("Failed to get location:", error)
    }

    // Create Supabase client
    const supabase = createClient()

    // Record login in database
    const { error: insertError } = await supabase.from("login_activity").insert({
      user_id: userId,
      ip_address: ip,
      user_agent: userAgent,
      timestamp: timestamp || new Date().toISOString(),
      location: location,
    })

    if (insertError) {
      console.error("Failed to record login activity:", insertError)
      return NextResponse.json({ error: "Failed to record login activity" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Login activity recorded" }, { status: 200 })
  } catch (error) {
    console.error("Error recording login activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

