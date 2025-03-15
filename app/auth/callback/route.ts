import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const origin = new URL(request.url).origin
    const code = request.nextUrl.searchParams.get("code")
    const error = request.nextUrl.searchParams.get("error")
    const error_description = request.nextUrl.searchParams.get("error_description")
    const next = request.nextUrl.searchParams.get("next") || "/dashboard"
    const type = request.nextUrl.searchParams.get("type") || "signin"

    console.log("Auth callback called with:", { code, error, error_description, next, type })

    // Handle authentication errors
    if (error || !code) {
      console.error("Auth callback error:", { error, error_description })
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent(error_description || "Authentication failed")}`,
          origin
        )
      )
    }

    // Create Supabase client
    const supabase = await createServerClient()

    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error("Session exchange error:", exchangeError)
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent("Failed to complete authentication")}`,
          origin
        )
      )
    }

    // Get the user's session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Get session error:", sessionError)
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent("Failed to get session")}`,
          origin
        )
      )
    }

    if (!session?.user) {
      console.error("No session after code exchange")
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent("Failed to create session")}`,
          origin
        )
      )
    }

    // For email confirmation, create profile if it doesn't exist
    if (type === "signup") {
      const { error: profileCreateError } = await supabase
        .from("profiles")
        .insert([
          {
            id: session.user.id,
            email: session.user.email,
            onboarding_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (profileCreateError) {
        console.error("Profile creation error:", profileCreateError)
        // Don't fail the auth flow for profile errors
      }

      // Always redirect to welcome page for new signups
      return NextResponse.redirect(new URL("/welcome", origin))
    }

    // For sign-in, check if user has completed onboarding
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
      // Don't fail the auth flow for profile errors, redirect to welcome page
      return NextResponse.redirect(new URL("/welcome", origin))
    }

    // Redirect to appropriate page
    const redirectTo = profile?.onboarding_completed === true ? next : "/welcome"
    console.log("Redirecting to:", redirectTo)
    return NextResponse.redirect(new URL(redirectTo, origin))
  } catch (error) {
    console.error("Unhandled auth callback error:", error)
    return NextResponse.redirect(
      new URL(
        `/auth/error?error=${encodeURIComponent("An unexpected error occurred")}`,
        new URL(request.url).origin
      )
    )
  }
}
