/**
 * API Configuration for Auth System
 * Controls which endpoints are enabled in different environments
 */

// Environment detection
const isDevelopment = process.env.NODE_ENV === "development"
const isTest = process.env.NODE_ENV === "test"
const isProduction = process.env.NODE_ENV === "production"

// Admin token for accessing protected endpoints
const ADMIN_SETUP_TOKEN = process.env.ADMIN_SETUP_TOKEN

// Configuration for auth-related API endpoints
export const AUTH_API_CONFIG = {
  // Core authentication endpoints - always enabled
  core: {
    login: true,
    signup: true,
    logout: true,
    resetPassword: true,
    updatePassword: true,
    callback: true,
    csrf: true,
  },

  // Session management endpoints
  sessions: {
    get: true,
    revoke: true,
    revokeAll: true,
  },

  // Admin endpoints - restricted by environment and token
  admin: {
    grantAdmin: isDevelopment || (isProduction && !!ADMIN_SETUP_TOKEN),
    diagnose: isDevelopment || (isProduction && !!ADMIN_SETUP_TOKEN),
    diagnoseDb: isDevelopment || (isProduction && !!ADMIN_SETUP_TOKEN),
    fixPermissions: isDevelopment || (isProduction && !!ADMIN_SETUP_TOKEN),
  },

  // Testing and verification endpoints - disabled in production
  testing: {
    verifySession: isDevelopment || isTest,
    testCsrf: isDevelopment || isTest,
    loginTest: isDevelopment || isTest,
    signupTest: isDevelopment || isTest,
    sessionTest: isDevelopment || isTest,
  },
}

/**
 * Check if an API endpoint is enabled
 */
export function isApiEndpointEnabled(category: keyof typeof AUTH_API_CONFIG, endpoint: string): boolean {
  return !!AUTH_API_CONFIG[category]?.[endpoint as keyof (typeof AUTH_API_CONFIG)[typeof category]]
}

/**
 * Validate admin token for protected endpoints
 */
export function validateAdminToken(token: string | null): boolean {
  if (!ADMIN_SETUP_TOKEN || !token) {
    return false
  }

  return token === ADMIN_SETUP_TOKEN
}

