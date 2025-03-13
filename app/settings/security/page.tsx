import { PageHeader } from "@/components/page-header"
import { Container } from "@/components/ui/container"
import { SectionCard } from "@/components/ui/section-card"
import { PasswordStrengthCheck } from "./password-strength-check"
import { LoginNotifications } from "./login-notifications"
import { ActiveSessions } from "./active-sessions"

export const metadata = {
  title: "Security Settings",
}

export default function SecuritySettingsPage() {
  return (
    <Container>
      <PageHeader heading="Security Settings" subheading="Manage your account security and protection" />

      <div className="grid gap-6">
        <SectionCard title="Password Security" description="Check and update your password strength">
          <PasswordStrengthCheck />
        </SectionCard>

        <SectionCard title="Active Sessions" description="Manage your active login sessions across devices">
          <ActiveSessions />
        </SectionCard>

        <SectionCard title="Login Notifications" description="Get notified when someone logs into your account">
          <LoginNotifications />
        </SectionCard>
      </div>
    </Container>
  )
}

