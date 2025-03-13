import { createClient } from "@/utils/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { userLoginRateLimiter } from "@/middleware/rate-limit"
import { validateCsrfToken } from "@/lib/csrf"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // Validate CSRF token
    const csrfToken = request.headers.get("X-CSRF-Token")
    if (!csrfToken || !validateCsrfToken(csrfToken)) {
      return NextResponse.json({ error: "Invalid security token" }, { status: 403 })
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check rate limiting by email
    const rateLimitResult = await userLoginRateLimiter(email)
    if (rateLimitResult.limited) {
      return NextResponse.json(
        {
          error: "Too many login attempts",
          message: "Please try again later",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    console.log(`Attempting to log in user with email: ${email}`)

    // Initialize Supabase client
    const supabase = createClient()

    // Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if login was successful
    if (data?.session) {
      console.log("Login successful for user:", data.user.id)

      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.log("Profile not found, creating one...")

        // Create profile manually if it doesn't exist
        const { error: insertError } = await supabase.from("profiles").insert({
          id: data.user.id,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error("Error creating profile:", insertError)
        }
      }

      // Return success with session info
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: data.user.id,
          email: data.user.email,
          role: profile?.role || "user",
        },
        session: {
          expires_at: data.session.expires_at,
        },
      })
    } else {
      console.error("Login failed with no error")
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Unexpected error in login route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

