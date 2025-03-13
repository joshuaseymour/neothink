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

    // Create a trigger to automatically create profile records for new users
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Trigger setup error:", error)
    return NextResponse.json({ error: "Failed to set up triggers" }, { status: 500 })
  }
}

