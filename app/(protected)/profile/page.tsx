import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { ProfileDashboard } from "./components/profile-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export const metadata = {
  title: "My Profile | Neothink+",
  description: "Manage your profile, preferences, and account settings",
}

export default async function ProfilePage() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // If there's an error or no user is logged in, redirect to login page
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user's profile data
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
  }

  // Get user subscriptions
  const { data: subscriptions } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("active", true)

  const userSubscriptions = subscriptions?.map((sub) => sub.tier) || []

  return (
    <div className="min-h-screen bg-neutral-950">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDashboard user={user} profile={profile} userSubscriptions={userSubscriptions} />
      </Suspense>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="hidden md:block md:col-span-1">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Skeleton className="h-20 w-full mb-6 rounded-lg" />
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

