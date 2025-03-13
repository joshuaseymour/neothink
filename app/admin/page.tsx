export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"

export default async function AdminPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login?message=Please login to access admin")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

  if (!profile?.is_admin) {
    // Redirect to dashboard if not an admin
    redirect("/dashboard?message=You do not have admin privileges")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>

        {/* Admin content */}
        <p className="text-gray-600">This is the admin dashboard. You can manage users and system settings here.</p>
      </div>
    </div>
  )
}

