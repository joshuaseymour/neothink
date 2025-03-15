import { createServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/update-password",
  "/auth/verify",
  "/auth/error",
  "/auth/callback",
  "/_not-found",
  "/not-found",
  "/error",
]

export async function middleware(request: NextRequest) {
  try {
    // Get the pathname
    const { pathname } = request.nextUrl

    // Skip auth check for static files and public routes
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/public") ||
      pathname === "/favicon.ico" ||
      pathname === "/_not-found" ||
      pathname === "/not-found" ||
      pathname === "/error"
    ) {
      return NextResponse.next()
    }

    // Create a response with the URL
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Create a Supabase client
    const supabase = await createServerClient()

    // Refresh session if expired and get user session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if it's a public route
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    // Handle authentication
    if (!session && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      const redirectUrl = new URL("/auth/login", request.url)
      redirectUrl.searchParams.set("next", encodeURIComponent(pathname))
      return NextResponse.redirect(redirectUrl)
    }

    if (session && isPublicRoute && pathname !== "/") {
      try {
        // Check if user has completed onboarding
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", session.user.id)
          .single()

        if (error) throw error

        // Redirect based on onboarding status
        if (profile?.onboarding_completed) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          return NextResponse.redirect(new URL("/welcome", request.url))
        }
      } catch (error) {
        console.error("Profile check error:", error)
        // On profile error, allow access to public routes
        return response
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)

    // On critical error, redirect to error page
    if (error instanceof Error && error.message.includes("not authenticated")) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // For other errors, allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)", "/"]
}
