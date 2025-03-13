import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { WelcomeView } from "@/components/onboarding/welcome-view"
import { WelcomeSkeleton } from "@/components/onboarding/welcome-skeleton"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Welcome to Neothink+ | Get Started",
  description: "Welcome to Neothink+! Let's get you started on your journey to transformation.",
}

export default async function WelcomePage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to access the welcome page")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", session.user.id)
    .single()

  // If onboarding is completed, redirect to dashboard
  if (profile?.onboarding_completed) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col">
      <Suspense fallback={<WelcomeSkeleton />}>
        <WelcomeView user={session.user} />
      </Suspense>
    </div>
  )
}
