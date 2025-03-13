import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Add authorization check
export async function GET(request: Request) {
  try {
    // Check for admin authorization
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // This is a simplified check - in production use a proper admin token
    const token = authHeader.split(" ")[1]
    if (token !== process.env.ADMIN_SETUP_TOKEN) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 })
    }

    // Original setup code continues below
    const supabase = createClient(cookies())

    // Rest of the function remains the same...
    const { data, error } = await supabase.storage.createBucket("avatars", {
      public: true,
    })

    if (error) {
      console.error("Error creating bucket:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (e: any) {
    console.error("Unexpected error:", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

