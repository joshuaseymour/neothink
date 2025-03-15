import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Authentication | Neothink+",
  description: "Secure authentication for Neothink+ platform",
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createServerClient()

    // Check if user is already authenticated
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Auth layout session error:", sessionError)
      // Don't redirect, let the user try to authenticate
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
        // Don't fail the auth flow for profile errors
      }

      // Redirect to appropriate page
      const redirectTo = profile?.onboarding_completed ? "/dashboard" : "/welcome"
      redirect(redirectTo)
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
        {children}
      </div>
    )
  } catch (error) {
    console.error("Auth layout error:", error)
    // Don't redirect, let the user try to authenticate
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
        {children}
      </div>
    )
  }
}
