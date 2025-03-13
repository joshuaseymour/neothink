import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export function createClient(request: NextRequest) {
  // Create a cookies container
  const cookies = {
    get(name: string) {
      return request.cookies.get(name)?.value
    },
    set(name: string, value: string, options: any) {
      // This is used for the middleware response
      request.cookies.set({
        name,
        value,
        ...options,
      })
    },
    remove(name: string, options: any) {
      // This is used for the middleware response
      request.cookies.set({
        name,
        value: "",
        ...options,
      })
    },
  }

  // Create a new supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name)
        },
        set(name: string, value: string, options: any) {
          cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          cookies.remove(name, options)
        },
      },
    },
  )

  // Create a new response
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Update the response cookies
  const cookiesList = request.cookies.getAll()
  for (const cookie of cookiesList) {
    response.cookies.set(cookie.name, cookie.value)
  }

  return { supabase, response }
}

