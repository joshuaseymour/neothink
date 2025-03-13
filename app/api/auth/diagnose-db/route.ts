import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing Supabase environment variables",
        },
        { status: 500 },
      )
    }

    // Create admin client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Use a raw SQL query to check tables
    const { data: tables, error: tablesError } = await supabase
      .rpc("get_tables")
      .catch(() => ({ data: null, error: { message: "RPC function not available" } }))

    // Fallback: Try a direct query to check if profiles table exists
    const { data: profilesExists, error: profilesExistsError } = await supabase
      .from("profiles")
      .select("count")
      .limit(1)
      .catch(() => ({ data: null, error: { message: "Could not query profiles table" } }))

    // Check if we can access auth.users
    const { data: usersTest, error: usersError } = await supabase.auth.admin
      .listUsers({
        page: 1,
        perPage: 1,
      })
      .catch(() => ({ data: null, error: { message: "Could not access auth.users" } }))

    // Try to create a test user to check permissions
    let userCreationTest = { success: false, error: null }
    try {
      const testEmail = `test-${Date.now()}@example.com`
      const { data: user, error } = await supabase.auth.admin.createUser({
        email: testEmail,
        password: "Test1234!",
        email_confirm: true,
      })

      userCreationTest = {
        success: !!user && !error,
        error: error ? error.message : null,
      }

      // Clean up - delete the test user
      if (user?.user?.id) {
        await supabase.auth.admin.deleteUser(user.user.id)
      }
    } catch (e: any) {
      userCreationTest.error = e.message
    }

    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    }

    return NextResponse.json({
      status: "success",
      message: "Database diagnostic complete",
      tables: tables || "Could not retrieve tables",
      tablesError: tablesError ? tablesError.message : null,
      profilesAccess: !!profilesExists && !profilesExistsError,
      profilesError: profilesExistsError ? profilesExistsError.message : null,
      usersAccess: !!usersTest && !usersError,
      usersError: usersError ? usersError.message : null,
      userCreationTest,
      envVars,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Error running diagnostics",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}

