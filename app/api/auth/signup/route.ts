import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log(`Attempting to create user with email: ${email}`)

    // Initialize Supabase client with service role key for admin operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Authentication service configuration error" }, { status: 500 })
    }

    // Create admin client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Create user with Supabase Auth API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (error) {
      console.error("Error creating user with auth.admin.createUser:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Check if user was created
    if (data?.user) {
      console.log("User created successfully:", data.user.id)

      try {
        // Create profile manually with direct SQL
        const { error: insertError } = await supabase.rpc("create_profile", {
          user_id: data.user.id,
          user_email: email,
          user_role: "user",
        })

        if (insertError) {
          console.error("Error creating profile with RPC:", insertError)

          // Try direct insert as fallback
          const { error: directInsertError } = await supabase.from("profiles").insert({
            id: data.user.id,
            email: email,
            role: "user",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (directInsertError) {
            console.error("Error creating profile with direct insert:", directInsertError)
            // Continue anyway, as the user was created
          }
        }
      } catch (profileError) {
        console.error("Error in profile creation:", profileError)
        // Continue anyway, as the user was created
      }

      return NextResponse.json({
        success: true,
        message: "User created successfully",
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      })
    } else {
      console.error("User creation failed with no error")
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Unexpected error in signup route:", error)
    return NextResponse.json(
      { error: "Error creating new user: " + (error.message || "Unknown error") },
      { status: 400 },
    )
  }
}

