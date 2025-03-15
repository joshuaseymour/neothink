"use client"

import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest } from "next/server"
import { z } from "zod"

export const dynamic = "force-dynamic"
export const runtime = "edge"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { action, ...data } = await request.json()

    switch (action) {
      case "login": {
        const { email, password } = loginSchema.parse(data)
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        return Response.json({ success: true, data: authData })
      }

      case "signup": {
        const { email, password, fullName } = signupSchema.parse(data)
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        })
        if (signUpError) throw signUpError

        // Create profile in the same transaction
        if (authData.user) {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: authData.user.id,
            full_name: fullName,
            email,
            onboarding_completed: false,
          })
          if (profileError) throw profileError
        }

        return Response.json({ success: true, data: authData })
      }

      case "logout": {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return Response.json({ success: true })
      }

      default:
        return Response.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error("Auth error:", error)
    return Response.json(
      { 
        success: false, 
        error: error.message || "Authentication failed",
        code: error.code
      },
      { status: error.status || 400 }
    )
  }
}
