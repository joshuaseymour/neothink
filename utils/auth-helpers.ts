import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

/**
 * Redirects unauthenticated users to the login page
 * Can be used in client components
 */
export async function redirectIfUnauthenticated(redirectTo = "/auth/login") {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      redirect(redirectTo)
    }

    return data.session
  } catch (error) {
    console.error("Auth check error:", error)
    redirect(redirectTo)
  }
}

/**
 * Redirects authenticated users to the dashboard
 * Can be used in client components
 */
export async function redirectIfAuthenticated(redirectTo = "/dashboard") {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (!error && data.session) {
      redirect(redirectTo)
    }
  } catch (error) {
    console.error("Auth check error:", error)
    // Continue to the current page if there's an error
  }
}
