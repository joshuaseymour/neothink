import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check auth
  const supabase = await createServerClient()
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
