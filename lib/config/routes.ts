// Define protected routes that require authentication and dynamic rendering
export const protectedRoutes = new Set([
  "/welcome",
  "/dashboard",
  "/profile",
  "/settings",
])

// Define public routes that don't require authentication
export const publicRoutes = new Set([
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
])

// Define static asset paths that should bypass auth checks
export const staticPaths = new Set([
  "/_next",
  "/public",
  "/favicon.ico",
])

// Helper function to check if a route requires authentication
export function isProtectedRoute(pathname: string): boolean {
  // Check if the path matches any protected route
  return protectedRoutes.has(pathname) || 
    // Or if it's a sub-path of a protected route
    Array.from(protectedRoutes).some(route => 
      pathname.startsWith(route + "/")
    )
}

// Helper function to check if a route is public
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.has(pathname)
}

// Helper function to check if a path is for static assets
export function isStaticPath(pathname: string): boolean {
  return Array.from(staticPaths).some(path => 
    pathname.startsWith(path)
  )
}
