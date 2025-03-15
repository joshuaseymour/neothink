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

    console.log("Auth callback called with:", { code, error, error_description, next })

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

    // Exchange the code for a session
    const supabase = await createServerClient()
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

    // Check if user has completed onboarding
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
