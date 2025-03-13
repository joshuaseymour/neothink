import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"

/**
 * Middleware to protect admin routes
 * Ensures only users with admin role can access admin pages
 */
export async function adminMiddleware(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = createClient()

    // Get current session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session in admin middleware:", error)
      return redirectToLogin(request)
    }

    if (!session) {
      console.log("No session found in admin middleware")
      return redirectToLogin(request)
    }

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error("Error getting user profile in admin middleware:", profileError)
      return redirectToDashboard(request)
    }

    if (profile?.role !== "admin") {
      console.log("User does not have admin role")
      return redirectToDashboard(request)
    }

    // User is an admin, allow access
    return NextResponse.next()
  } catch (error) {
    console.error("Unexpected error in admin middleware:", error)
    return redirectToLogin(request)
  }
}

/**
 * Redirect to login page
 */
function redirectToLogin(request: NextRequest) {
  const redirectUrl = new URL("/auth/login", request.url)
  redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

/**
 * Redirect to dashboard
 */
function redirectToDashboard(request: NextRequest) {
  return NextResponse.redirect(new URL("/dashboard", request.url))
}

