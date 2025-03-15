// Mark dynamic routes that require authentication
export const dynamic = "force-dynamic"

// Export runtime config for edge compatibility
export const runtime = "edge"

// Define dynamic routes that require authentication
export const dynamicRoutes = new Set([
  "/welcome",
  "/dashboard",
  "/profile",
  "/settings",
])

// Define static routes that don't require authentication
export const staticRoutes = new Set([
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
