"use server"

import { createServerClient as createServerClientBase, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

const cookieConfig = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  httpOnly: true, // Enhance security by making cookies httpOnly
}

async function getCookieStore() {
  try {
    // Get a fresh cookie store instance for each operation
    const cookieStore = await cookies()
    return cookieStore
  } catch (error) {
    console.error("Error getting cookie store:", error)
    throw new Error("Failed to initialize cookie store")
  }
}

export async function createServerClient() {
  try {
    const cookieStore = await getCookieStore()

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Missing required Supabase environment variables")
    }

    return createServerClientBase<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            try {
              return cookieStore.get(name)?.value
            } catch (error) {
              console.error("Error getting cookie:", error)
              return undefined
            }
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set(name, value, { ...cookieConfig, ...options })
            } catch (error) {
              // Handle cookie errors silently in static generation
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set(name, "", { ...cookieConfig, ...options, maxAge: 0 })
            } catch (error) {
              // Handle cookie errors silently in static generation
            }
          },
        },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          flowType: "pkce",
          detectSessionInUrl: true,
        },
      }
    )
  } catch (error) {
    console.error("Error creating server client:", error)
    throw error
  }
}

export async function createServerActionClient() {
  try {
    const cookieStore = await getCookieStore()

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Missing required Supabase environment variables")
    }

    return createServerClientBase<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            try {
              return cookieStore.get(name)?.value
            } catch (error) {
              console.error("Error getting cookie:", error)
              return undefined
            }
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set(name, value, { ...cookieConfig, ...options })
            } catch (error) {
              console.error("Error setting cookie:", error)
              throw new Error("Failed to set authentication cookie")
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set(name, "", { ...cookieConfig, ...options, maxAge: 0 })
            } catch (error) {
              console.error("Error removing cookie:", error)
              throw new Error("Failed to remove authentication cookie")
            }
          },
        },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          flowType: "pkce",
          detectSessionInUrl: true,
        },
      }
    )
  } catch (error) {
    console.error("Error creating server action client:", error)
    throw error
  }
}
