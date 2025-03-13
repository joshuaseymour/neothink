import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { type Database } from "@/types/supabase"

export function createMiddlewareClient(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Convert the cookie options to match Next.js format
          request.cookies.set(name, value)
          response.cookies.set({
            name,
            value,
            domain: options.domain,
            path: options.path ?? "/",
            maxAge: options.maxAge,
            httpOnly: options.httpOnly,
            sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
            secure: process.env.NODE_ENV === "production"
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.delete(name)
          response.cookies.delete(name)
        },
      },
    }
  )

  return { supabase, response }
}
