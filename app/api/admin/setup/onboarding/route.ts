// Import cookies from next/headers
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

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

    const supabase = createClient(cookies())

    // Add onboarding_completed field to profiles table
    await supabase.query(`
      -- Add onboarding_completed field to profiles if it doesn't exist
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'profiles' AND column_name = 'onboarding_completed'
        ) THEN
          ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
        END IF;
      END
      $$;
    `)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error setting up onboarding:", error)
    return NextResponse.json({ error: "Failed to set up onboarding" }, { status: 500 })
  }
}

