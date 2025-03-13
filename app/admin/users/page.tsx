import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserSearch } from "./user-search"

export default async function AdminUsersPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = createClient()
  const search = searchParams.q || ""

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", user.id).single()

  if (!roleData || roleData.role !== "admin") {
    redirect("/dashboard")
  }

  // Fetch users with search
  let query = supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email_confirmed_at,
      created_at,
      user_roles!inner (
        role
      ),
      user_subscriptions (
        tier,
        active,
        expires_at
      )
    `)
    .order("created_at", { ascending: false })
    .limit(50)

  if (search) {
    query = query.ilike("full_name", `%${search}%`)
  }

  const { data: users, error } = await query

  if (error) {
    console.error("Error fetching users:", error)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button asChild>
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="mb-6">
        <UserSearch />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => {
                // Get active subscriptions
                const activeSubscriptions = user.user_subscriptions
                  ? user.user_subscriptions.filter((sub) => sub.active).map((sub) => sub.tier)
                  : []

                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name}</TableCell>
                    <TableCell>
                      <Badge variant={user.user_roles.role === "admin" ? "default" : "outline"}>
                        {user.user_roles.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {activeSubscriptions.length > 0 ? (
                          activeSubscriptions.map((tier) => (
                            <Badge key={tier} variant="secondary">
                              {tier}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/users/${user.id}`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  {search ? "No users found matching your search." : "No users found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

