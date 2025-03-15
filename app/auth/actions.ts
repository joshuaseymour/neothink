"use server"

import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export async function checkAuth() {
  try {
    const supabase = await createServerClient()

    // Check if user is already authenticated
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Auth layout session error:", sessionError)
      return null
    }

    // Check if user has completed onboarding
    if (session?.user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .single()

      if (profileError) {
        console.error("Profile fetch error:", profileError)
        return null
      }

      if (profile) {
        // Return the redirect path
        return profile.onboarding_completed === true ? "/dashboard" : "/welcome"
      }
    }

    return null
  } catch (error) {
    console.error("Auth check error:", error)
    return null
  }
}
