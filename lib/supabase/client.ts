"use client"

import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/types/supabase"

let supabase: ReturnType<typeof createBrowserClient<Database>>

// Create a singleton instance to reduce bundle size
export function createClient() {
  if (supabase) return supabase

  supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1]
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number }) {
          document.cookie =
            `${name}=${value}` +
            (options.path ? `; path=${options.path}` : "") +
            (options.maxAge ? `; max-age=${options.maxAge}` : "")
        },
        remove(name: string, options: { path?: string }) {
          document.cookie =
            `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT` +
            (options.path ? `; path=${options.path}` : "")
        },
      },
      db: {
        schema: "public",
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "sb-auth-token",
        flowType: "pkce",
      },
    }
  )

  return supabase
}