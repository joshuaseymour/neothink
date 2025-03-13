import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
// Import cookies from next/headers
import { cookies } from "next/headers"

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

    // Update any instances of createClient() to createClient(cookies())
    const supabase = createClient(cookies())

    // Add protection-related fields to user_account_data
    await supabase.query(`
      -- Add protection-related fields to user_account_data if they don't exist
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'user_account_data' AND column_name = 'login_notifications_enabled'
        ) THEN
          ALTER TABLE user_account_data ADD COLUMN login_notifications_enabled BOOLEAN DEFAULT true;
        END IF;
        
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'user_account_data' AND column_name = 'last_password_check'
        ) THEN
          ALTER TABLE user_account_data ADD COLUMN last_password_check TIMESTAMP WITH TIME ZONE;
        END IF;
        
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'user_account_data' AND column_name = 'advanced_protection_enabled'
        ) THEN
          ALTER TABLE user_account_data ADD COLUMN advanced_protection_enabled BOOLEAN DEFAULT false;
        END IF;
      END
      $$;
    `)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error setting up protection features:", error)
    return NextResponse.json({ error: "Failed to set up protection features" }, { status: 500 })
  }
}

