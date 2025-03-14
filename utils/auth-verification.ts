import { createClient as createServerClient } from "@/utils/supabase/server"

/**
 * Authentication Verification Utility
 *
 * This utility provides methods to verify the authentication flow
 * without changing the visual design of the application.
 */
export class AuthVerification {
  /**
   * Verify a user login attempt server-side
   */
  static async verifyLogin(email: string, password: string) {
    console.log(`[Auth Verification] Testing login for email: ${email}`)

    try {
      const supabase = createServerClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error(`[Auth Verification] Login failed: ${error.message}`)
        return { success: false, error: error.message, data: null }
      }

      console.log(`[Auth Verification] Login successful for user: ${data.user?.id}`)
      return { success: true, error: null, data }
    } catch (error: any) {
      console.error(`[Auth Verification] Login exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Verify session retrieval and validity
   */
  static async verifySession() {
    console.log(`[Auth Verification] Verifying current session`)

    try {
      const supabase = createServerClient()
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(`[Auth Verification] Session retrieval failed: ${error.message}`)
        return { success: false, error: error.message, data: null }
      }

      if (!data.session) {
        console.log(`[Auth Verification] No active session found`)
        return { success: false, error: "No active session", data: null }
      }

      console.log(`[Auth Verification] Active session found for user: ${data.session.user.id}`)

      // Verify session expiration
      const expiresAt = new Date((data.session.expires_at || 0) * 1000)
      const now = new Date()

      if (expiresAt < now) {
        console.error(`[Auth Verification] Session expired at ${expiresAt.toISOString()}`)
        return { success: false, error: "Session expired", data: data.session }
      }

      return { success: true, error: null, data: data.session }
    } catch (error: any) {
      console.error(`[Auth Verification] Session verification exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Verify user signup process
   */
  static async verifySignup(email: string, password: string) {
    console.log(`[Auth Verification] Testing signup for email: ${email}`)

    try {
      const supabase = createServerClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      })

      if (error) {
        console.error(`[Auth Verification] Signup failed: ${error.message}`)
        return { success: false, error: error.message, data: null }
      }

      console.log(`[Auth Verification] Signup successful for user: ${data.user?.id}`)
      return { success: true, error: null, data }
    } catch (error: any) {
      console.error(`[Auth Verification] Signup exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Verify incorrect login handling
   */
  static async verifyIncorrectLogin(email: string, password: string) {
    console.log(`[Auth Verification] Testing incorrect login for email: ${email}`)

    try {
      const supabase = createServerClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password + "_incorrect", // Intentionally wrong password
      })

      if (error) {
        console.log(`[Auth Verification] Incorrect login properly rejected: ${error.message}`)
        return { success: true, error: error.message, data: null }
      }

      console.error(`[Auth Verification] Security issue: Incorrect login was accepted!`)
      return { success: false, error: "Incorrect login was accepted", data }
    } catch (error: any) {
      console.error(`[Auth Verification] Incorrect login exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Verify session storage
   */
  static async verifySessionStorage(sessionId: string) {
    console.log(`[Auth Verification] Verifying session storage for ID: ${sessionId}`)

    try {
      const response = await fetch("/api/auth/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(`[Auth Verification] Session storage verification failed: ${result.error}`)
        return { success: false, error: result.error, data: null }
      }

      console.log(`[Auth Verification] Session storage verified successfully`)
      return { success: true, error: null, data: result.data }
    } catch (error: any) {
      console.error(`[Auth Verification] Session storage verification exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Verify CSRF protection
   */
  static async verifyCsrfProtection() {
    console.log(`[Auth Verification] Verifying CSRF protection`)

    try {
      // Get a valid CSRF token
      const tokenResponse = await fetch("/api/auth/csrf", {
        method: "GET",
      })

      if (!tokenResponse.ok) {
        console.error(`[Auth Verification] Failed to get CSRF token`)
        return { success: false, error: "Failed to get CSRF token", data: null }
      }

      const { csrfToken } = await tokenResponse.json()

      // Try a login request with the token (this verifies CSRF protection)
      const testEmail = `test-${Date.now()}@example.com`
      const testPassword = "Test123!"
      
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      })

      // We expect this to fail with 401 (unauthorized) but not 403 (forbidden)
      if (loginResponse.status === 403) {
        console.error(`[Auth Verification] Valid CSRF token was rejected`)
        return { success: false, error: "Valid CSRF token was rejected", data: null }
      }

      // Try without a token (should be rejected)
      const invalidResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      })

      if (invalidResponse.status !== 403) {
        console.error(`[Auth Verification] Request without CSRF token was not rejected`)
        return { success: false, error: "Missing CSRF protection", data: null }
      }

      console.log(`[Auth Verification] CSRF protection verified successfully`)
      return { success: true, error: null, data: null }
    } catch (error: any) {
      console.error(`[Auth Verification] CSRF verification exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Generate a comprehensive verification report
   */
  static async generateReport() {
    console.log(`[Auth Verification] Generating comprehensive authentication verification report`)

    const report = {
      timestamp: new Date().toISOString(),
      tests: [] as any[],
      overallSuccess: true,
    }

    // Test user signup with a random email
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = "Test@password123"

    // 1. Test signup
    const signupResult = await this.verifySignup(testEmail, testPassword)
    report.tests.push({
      name: "User Signup",
      success: signupResult.success,
      error: signupResult.error,
      details: signupResult.data ? "User created successfully" : "Failed to create user",
    })
    report.overallSuccess = report.overallSuccess && signupResult.success

    // 2. Test login with correct credentials
    const loginResult = await this.verifyLogin(testEmail, testPassword)
    report.tests.push({
      name: "User Login",
      success: loginResult.success,
      error: loginResult.error,
      details: loginResult.data ? "Login successful" : "Login failed",
    })
    report.overallSuccess = report.overallSuccess && loginResult.success

    // 3. Test incorrect login
    const incorrectLoginResult = await this.verifyIncorrectLogin(testEmail, testPassword)
    report.tests.push({
      name: "Incorrect Login Handling",
      success: incorrectLoginResult.success,
      error: incorrectLoginResult.error,
      details: incorrectLoginResult.success
        ? "Incorrect login properly rejected"
        : "Security issue with incorrect login",
    })
    report.overallSuccess = report.overallSuccess && incorrectLoginResult.success

    // 4. Test session verification
    const sessionResult = await this.verifySession()
    report.tests.push({
      name: "Session Verification",
      success: sessionResult.success,
      error: sessionResult.error,
      details: sessionResult.data ? "Session verified successfully" : "Session verification failed",
    })
    report.overallSuccess = report.overallSuccess && sessionResult.success

    // 5. Test CSRF protection
    const csrfResult = await this.verifyCsrfProtection()
    report.tests.push({
      name: "CSRF Protection",
      success: csrfResult.success,
      error: csrfResult.error,
      details: csrfResult.success ? "CSRF protection working correctly" : "CSRF protection issues detected",
    })
    report.overallSuccess = report.overallSuccess && csrfResult.success

    console.log(`[Auth Verification] Report generated with overall success: ${report.overallSuccess}`)
    return report
  }
}
