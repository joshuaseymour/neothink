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
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        {children}
      </div>
    </div>
  )
}
