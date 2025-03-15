import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export default async function WelcomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {children}
    </main>
  )
}
