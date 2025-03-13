import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Lock } from "lucide-react"
import { PasswordStrengthCheck } from "./password-strength-check"
import { LoginNotifications } from "./login-notifications"
import { PageHeader } from "@/components/page-header"
import { SectionCard } from "@/components/ui/section-card"

export const metadata: Metadata = {
  title: "Account Protection",
  description: "Configure additional security measures for your account",
}

export default async function ProtectionPage() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="container py-8">
      <PageHeader
        title="Account Protection"
        description="Configure additional security measures to protect your account."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard
          title="Login Notifications"
          description="Get notified about new logins to your account"
          icon={Shield}
        >
          <LoginNotifications user={user} />
        </SectionCard>

        <SectionCard
          title="Password Strength"
          description="Check the strength of your password against security best practices"
          icon={AlertTriangle}
        >
          <PasswordStrengthCheck />
        </SectionCard>

        <SectionCard
          title="Advanced Protection"
          description="Additional security measures for your account"
          icon={Lock}
          className="md:col-span-2"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable advanced protection features to further secure your account. These features will be coming soon.
            </p>
            <Button disabled>Coming Soon</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

