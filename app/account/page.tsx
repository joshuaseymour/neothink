import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { createServerClient } from "@/lib/supabase/server"
import { AccountView } from "@/components/account/account-view"
import { AccountSkeleton } from "@/components/account/account-skeleton"

export const metadata: Metadata = {
  title: "Account Settings | Neothink+",
  description: "Manage your Neothink+ account settings and preferences",
}

export default async function AccountPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to access your account settings")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()

  // Get user subscriptions
  const { data: subscriptions } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("active", true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col">
      <Suspense fallback={<AccountSkeleton />}>
        <AccountView user={session.user} profile={profile} subscriptions={subscriptions} />
      </Suspense>
    </div>
  )
}
