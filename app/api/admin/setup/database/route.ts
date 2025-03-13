import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
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

    // Pass the cookies to createClient
    const supabase = createClient(cookies())

    // Create profiles table if it doesn't exist
    await supabase.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT,
        avatar_url TEXT,
        bio TEXT,
        website TEXT,
        location TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE,
        email_confirmed_at TIMESTAMP WITH TIME ZONE,
        onboarding_completed BOOLEAN DEFAULT false
      );
      
      -- Create user_account_data table if it doesn't exist
      CREATE TABLE IF NOT EXISTS user_account_data (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        account_status TEXT DEFAULT 'active',
        login_notifications_enabled BOOLEAN DEFAULT true,
        last_password_check TIMESTAMP WITH TIME ZONE,
        advanced_protection_enabled BOOLEAN DEFAULT false,
        last_data_export TIMESTAMP WITH TIME ZONE
      );
      
      -- Create security_notifications table if it doesn't exist
      CREATE TABLE IF NOT EXISTS security_notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        notification_type TEXT NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json({ error: "Failed to set up database" }, { status: 500 })
  }
}

