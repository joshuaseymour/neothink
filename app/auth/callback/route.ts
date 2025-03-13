import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const error = requestUrl.searchParams.get("error")
    const error_description = requestUrl.searchParams.get("error_description")
    const next = requestUrl.searchParams.get("next") || "/dashboard"

    // Handle authentication errors
    if (error || !code) {
      console.error("Auth callback error:", { error, error_description })
      return NextResponse.redirect(
        new URL(
          `/auth/login?error=${encodeURIComponent(error_description || "Authentication failed")}`,
          request.url
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
          `/auth/login?error=${encodeURIComponent("Failed to complete authentication")}`,
          request.url
        )
      )
    }

    // Get the user's session
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      console.error("No session after code exchange")
      return NextResponse.redirect(
        new URL(
          `/auth/login?error=${encodeURIComponent("Failed to create session")}`,
          request.url
        )
      )
    }

    // Check if user has completed onboarding
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", session.user.id)
      .single()

    // Redirect to appropriate page
    const redirectTo = profile?.onboarding_completed ? next : "/welcome"
    return NextResponse.redirect(new URL(redirectTo, request.url))
  } catch (error) {
    console.error("Unhandled auth callback error:", error)
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent("An unexpected error occurred")}`,
        request.url
      )
    )
  }
}
