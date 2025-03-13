"use server"

import { createServerClient as createServerClientBase, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

const cookieConfig = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

async function getCookieStore() {
  // Get a fresh cookie store instance for each operation
  const cookieStore = await cookies()
  return cookieStore
}

export async function createServerClient() {
  const cookieStore = await getCookieStore()

  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, { ...cookieConfig, ...options })
          } catch (error) {
            console.error("Error setting cookie:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, "", { ...cookieConfig, ...options, maxAge: 0 })
          } catch (error) {
            console.error("Error removing cookie:", error)
          }
        },
      },
    }
  )
}

export async function createServerActionClient() {
  const cookieStore = await getCookieStore()

  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, { ...cookieConfig, ...options })
          } catch (error) {
            console.error("Error setting cookie:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, "", { ...cookieConfig, ...options, maxAge: 0 })
          } catch (error) {
            console.error("Error removing cookie:", error)
          }
        },
      },
    }
  )
}
