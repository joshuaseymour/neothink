import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Check auth
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error
    if (!session) redirect("/auth/login")

    // Check if profile exists and onboarding is completed
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", session.user.id)
      .single()

    if (profileError) throw profileError
    if (!profile?.onboarding_completed) redirect("/welcome")

    return (
      <div className="min-h-screen flex flex-col bg-neothinker-50">
        <Header />
        <main className="flex-1 container mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout error:", error)
    redirect("/auth/error")
  }
}
