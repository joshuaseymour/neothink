import type { Metadata } from "next"
import { LoginView } from "@/components/auth/login-view"
import { Suspense } from "react"
import { LoginSkeleton } from "@/components/auth/login-skeleton"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Sign In | Neothink+",
  description: "Sign in to your Neothink+ account to access your personalized dashboard",
}

export default async function LoginPage() {
  // Check if user is already authenticated
  try {
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Auth check error:", error)
    // Continue to login page if there's an error
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col interactive-fix">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginView />
      </Suspense>
    </div>
  )
}
