import { createServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/signup", "/auth/reset-password", "/auth/verify", "/auth/error"]

export async function middleware(request: NextRequest) {
  try {
    // Create a response with the URL
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Create a Supabase client
    const supabase = await createServerClient()

    // Refresh session if expired
    await supabase.auth.getSession()

    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Get the pathname
    const { pathname } = request.nextUrl

    // Check if it's a public route
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    // Handle authentication
    if (!session && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      const redirectUrl = new URL("/auth/login", request.url)
      redirectUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    if (session && isPublicRoute && pathname !== "/") {
      // Check if user has completed onboarding
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .single()

      // Redirect based on onboarding status
      if (profile?.onboarding_completed) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else {
        return NextResponse.redirect(new URL("/welcome", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)

    // On error, allow the request to continue
    // This prevents blocking access if Supabase is temporarily unavailable
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
