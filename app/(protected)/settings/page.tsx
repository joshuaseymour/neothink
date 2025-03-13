export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"

export default async function SettingsPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to access settings")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

        {/* Settings content goes here */}
        <p className="text-gray-600">Manage your account settings and preferences.</p>

        {/* You can add your settings form or options here */}
      </div>
    </div>
  )
}

