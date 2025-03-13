// Import cookies from next/headers
import { cookies } from "next/headers"
import { validateCsrfToken } from "@/lib/csrf"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

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

    // CSRF validation for non-GET requests
    const csrfToken = request.headers.get("x-csrf-token")
    if (request.method !== "GET" && !validateCsrfToken(csrfToken || "")) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 })
    }

    const supabase = createClient(cookies())

    // Setup database tables
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
      
      -- Remove unused tables and fields that aren't needed
      DROP TABLE IF EXISTS data_export_requests;
    `)

    // Create storage buckets
    const { data: storageData, error: storageError } = await supabase.storage.createBucket("avatars", {
      public: true,
    })

    if (storageError) {
      console.error("Error creating bucket:", storageError)
    }

    // Create triggers
    await supabase.query(`
      -- Function to handle new user creation
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        -- Insert into profiles
        INSERT INTO public.profiles (id, full_name, onboarding_completed, created_at)
        VALUES (
          NEW.id,
          NEW.raw_user_meta_data->>'full_name',
          false,
          NOW()
        );
        
        -- Insert into user_account_data
        INSERT INTO public.user_account_data (id, account_status, login_notifications_enabled)
        VALUES (
          NEW.id,
          'active',
          true
        );
        
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Drop the trigger if it exists
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

      -- Create the trigger
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `)

    return NextResponse.json({ message: "Setup complete", success: true }, { status: 200 })
  } catch (error) {
    console.error("Setup failed:", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}

