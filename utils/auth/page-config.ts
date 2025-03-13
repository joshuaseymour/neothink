import type React from "react"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"

// Configuration for authenticated pages
export const authPageConfig = {
  // Force dynamic rendering for authenticated pages
  dynamic: "force-dynamic" as const,
}

// Helper function to create an authenticated page
export async function withAuthRequiredServer(callback: () => Promise<React.ReactNode> | React.ReactNode) {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to access this page")
  }

  // User is authenticated, proceed with the page
  return callback()
}

