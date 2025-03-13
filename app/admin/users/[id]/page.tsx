import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserProfileForm } from "./user-profile-form"
import { UserSubscriptionsForm } from "./user-subscriptions-form"
import { UserRoleForm } from "./user-role-form"

export default async function AdminUserEditPage({ params }: { params: { id: string } }) {
  const userId = params.id
  const supabase = createClient()

  // Get the current admin user
  const {
    data: { user: adminUser },
  } = await supabase.auth.getUser()

  if (!adminUser) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", adminUser.id).single()

  if (!roleData || roleData.role !== "admin") {
    redirect("/dashboard")
  }

  // Fetch the user to edit
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId)

  if (userError || !userData.user) {
    redirect("/admin/users")
  }

  // Fetch profile data
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
  }

  // Fetch user role
  const { data: userRole, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", userId)
    .single()

  if (roleError) {
    console.error("Error fetching user role:", roleError)
  }

  // Fetch user subscriptions
  const { data: subscriptions, error: subscriptionsError } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (subscriptionsError) {
    console.error("Error fetching subscriptions:", subscriptionsError)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <Button asChild>
          <Link href="/admin/users">Back to Users</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Edit the user's profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileForm user={userData.user} profile={profile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Role</CardTitle>
            <CardDescription>Manage the user's role</CardDescription>
          </CardHeader>
          <CardContent>
            <UserRoleForm userId={userId} currentRole={userRole?.role || "user"} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Tiers</CardTitle>
            <CardDescription>Manage the user's subscription tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <UserSubscriptionsForm userId={userId} subscriptions={subscriptions || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

