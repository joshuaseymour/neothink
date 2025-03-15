import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Authentication | Neothink+",
  description: "Secure authentication for Neothink+ platform",
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()

  // Check if user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </div>
  )
}
