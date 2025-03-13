/**
 * Client-side authentication verification utility
 * This allows testing the authentication flow from the browser
 */
export class ClientAuthVerification {
  /**
   * Test the login flow with the provided credentials
   */
  static async testLogin(email: string, password: string) {
    console.log(`[Client Auth Verification] Testing login for: ${email}`)

    try {
      // Fetch CSRF token first
      const tokenResponse = await fetch("/api/auth/csrf")
      if (!tokenResponse.ok) {
        throw new Error("Failed to get CSRF token")
      }

      const { csrfToken } = await tokenResponse.json()

      // Make login request to the API
      const loginResponse = await fetch("/api/auth/login-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await loginResponse.json()

      if (!loginResponse.ok) {
        console.error(`[Client Auth Verification] Login failed: ${result.error}`)
        return { success: false, error: result.error, data: null }
      }

      console.log(`[Client Auth Verification] Login successful`)
      return { success: true, error: null, data: result.data }
    } catch (error: any) {
      console.error(`[Client Auth Verification] Login test exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Test the signup flow with the provided credentials
   */
  static async testSignup(email: string, password: string) {
    console.log(`[Client Auth Verification] Testing signup for: ${email}`)

    try {
      // Fetch CSRF token first
      const tokenResponse = await fetch("/api/auth/csrf")
      if (!tokenResponse.ok) {
        throw new Error("Failed to get CSRF token")
      }

      const { csrfToken } = await tokenResponse.json()

      // Make signup request to the API
      const signupResponse = await fetch("/api/auth/signup-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await signupResponse.json()

      if (!signupResponse.ok) {
        console.error(`[Client Auth Verification] Signup failed: ${result.error}`)
        return { success: false, error: result.error, data: null }
      }

      console.log(`[Client Auth Verification] Signup successful`)
      return { success: true, error: null, data: result.data }
    } catch (error: any) {
      console.error(`[Client Auth Verification] Signup test exception: ${error.message}`)
      return { success: false, error: error.message, data: null }
    }
  }

  /**
   * Run a comprehensive client-side verification
   */
  static async runVerification() {
    console.log(`[Client Auth Verification] Running comprehensive verification`)

    const report = {
      timestamp: new Date().toISOString(),
      tests: [] as any[],
      overallSuccess: true,
    }

    // Generate a random test email
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = "Test@password123"

    // 1. Test signup
    const signupResult = await this.testSignup(testEmail, testPassword)
    report.tests.push({
      name: "User Signup",
      success: signupResult.success,
      error: signupResult.error,
      details: signupResult.success ? "Signup successful" : "Signup failed",
    })
    report.overallSuccess = report.overallSuccess && signupResult.success

    // 2. Test login
    const loginResult = await this.testLogin(testEmail, testPassword)
    report.tests.push({
      name: "User Login",
      success: loginResult.success,
      error: loginResult.error,
      details: loginResult.success ? "Login successful" : "Login failed",
    })
    report.overallSuccess = report.overallSuccess && loginResult.success

    // 3. Test session verification
    const sessionResponse = await fetch("/api/auth/session-test")
    const sessionResult = await sessionResponse.json()

    report.tests.push({
      name: "Session Verification",
      success: sessionResponse.ok,
      error: sessionResponse.ok ? null : sessionResult.error,
      details: sessionResponse.ok ? "Session verified successfully" : "Session verification failed",
    })
    report.overallSuccess = report.overallSuccess && sessionResponse.ok

    console.log(`[Client Auth Verification] Verification completed with overall success: ${report.overallSuccess}`)
    return report
  }
}

