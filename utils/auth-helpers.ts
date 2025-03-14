"use server"

import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

/**
 * Checks if user is authenticated, if not redirects to login page
 */
export async function checkAuth() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

/**
 * Gets the current authenticated user
 */
export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
