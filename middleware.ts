import { createServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"
import { isProtectedRoute, isPublicRoute, isStaticPath } from "@/lib/config/routes"

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

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Skip auth check for static paths
    if (isStaticPath(pathname)) {
      return NextResponse.next()
    }

    // Create a response with the URL
    const response = NextResponse.next()

    try {
      // Create a Supabase client
      const supabase = await createServerClient()

      // Get user session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // If no session and trying to access protected route, redirect to login
      if (!session && isProtectedRoute(pathname)) {
        const redirectUrl = new URL("/auth/login", request.url)
        redirectUrl.searchParams.set("next", pathname)
        return NextResponse.redirect(redirectUrl)
      }

      // If authenticated and trying to access public route
      if (session && isPublicRoute(pathname) && pathname !== "/") {
        // Check onboarding status
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", session.user.id)
          .single()

        // Redirect based on onboarding status
        if (profile?.onboarding_completed) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else if (pathname !== "/welcome") {
          return NextResponse.redirect(new URL("/welcome", request.url))
        }
      }

      return response
    } catch (error) {
      // On auth error, redirect to login for protected routes
      console.error("Auth error:", error)
      if (isProtectedRoute(pathname)) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
      return response
    }
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}
