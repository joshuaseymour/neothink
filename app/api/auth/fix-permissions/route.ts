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

    // Execute SQL to check if profiles table exists
    const { data: tableExists, error: tableCheckError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_name", "profiles")
      .eq("table_schema", "public")
      .single()

    if (tableCheckError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Error checking if profiles table exists",
          error: tableCheckError,
        },
        { status: 500 },
      )
    }

    if (!tableExists) {
      // Create profiles table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT,
          role TEXT DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      const { error: createTableError } = await supabase.rpc("exec_sql", { sql: createTableSQL })

      if (createTableError) {
        // If RPC doesn't exist, we can't create the table this way
        return NextResponse.json(
          {
            status: "error",
            message: "Failed to create profiles table",
            error: createTableError,
          },
          { status: 500 },
        )
      }
    }

    // Check if we can access the profiles table
    const { data: profilesTest, error: profilesError } = await supabase.from("profiles").select("count").limit(1)

    if (profilesError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Cannot access profiles table",
          error: profilesError,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      test: profilesTest,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Error checking database",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

