export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"

export default async function ProfileEditPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to edit your profile")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {/* Profile edit form would go here */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile Information</h2>

        {/* Profile edit form content */}
        <p className="text-gray-600">Update your profile information here.</p>
      </div>
    </div>
  )
}

