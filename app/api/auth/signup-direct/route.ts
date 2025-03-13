import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters",
        },
        { status: 400 },
      )
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          success: false,
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

    // Check if user already exists
    try {
      const { data: existsData, error: existsError } = await supabase.rpc("user_exists", {
        user_email: email,
      })

      if (!existsError && existsData === true) {
        return NextResponse.json(
          {
            success: false,
            message: "A user with this email already exists",
          },
          { status: 400 },
        )
      }
    } catch (err) {
      // If the function doesn't exist, continue anyway
      console.warn("Could not check if user exists:", err)
    }

    // Create user with admin API
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (userError) {
      console.error("Error creating user:", userError)
      return NextResponse.json(
        {
          success: false,
          message: "Error creating user",
          error: userError.message,
        },
        { status: 400 },
      )
    }

    const userId = userData.user.id

    // Create profile using RPC function
    try {
      const { error: profileError } = await supabase.rpc("create_profile", {
        user_id: userId,
        user_email: email,
        user_role: "user",
      })

      if (profileError) {
        console.error("Error creating profile with RPC:", profileError)

        // Fallback: Try direct insert
        const { error: directInsertError } = await supabase.from("profiles").insert({
          id: userId,
          email,
          role: "user",
        })

        if (directInsertError) {
          console.error("Error creating profile with direct insert:", directInsertError)
          // We'll continue anyway since the user was created
        }
      }
    } catch (err) {
      console.warn("Error creating profile:", err)
      // Continue anyway since the user was created
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      userId,
    })
  } catch (error: any) {
    console.error("Unexpected error in signup:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

