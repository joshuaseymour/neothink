import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  try {
    // Check for required environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Authentication service configuration error")
    }

    // If no cookieStore is provided, try to get it
    if (!cookieStore) {
      try {
        cookieStore = cookies()
      } catch (error) {
        // This might happen during static generation
        console.warn("Could not access cookies, possibly during static generation")
      }
    }

    return createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name) {
          try {
            return cookieStore?.get(name)?.value
          } catch (error) {
            console.warn(`Could not get cookie ${name}, possibly during static generation`)
            return undefined
          }
        },
        set(name, value, options) {
          try {
            cookieStore?.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies.set in read-only context or during static generation
            console.warn(`Could not set cookie ${name}, possibly during static generation or in read-only context`)
          }
        },
        remove(name, options) {
          try {
            cookieStore?.set({ name, value: "", ...options })
          } catch (error) {
            // Handle cookies.delete in read-only context or during static generation
            console.warn(`Could not remove cookie ${name}, possibly during static generation or in read-only context`)
          }
        },
      },
    })
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    throw new Error("Authentication service initialization failed")
  }
}

