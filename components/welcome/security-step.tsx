"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

interface SecurityStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function SecurityStep({ formData, updateFormData }: SecurityStepProps) {
  const handleSecurityNotificationsChange = (checked: boolean) => {
    updateFormData({ securityNotificationsEnabled: checked })
  }

  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Security Settings</CardTitle>
        </div>
        <CardDescription>Configure security settings to protect your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="security-notifications">Login Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive email notifications when your account is accessed from a new device or location.
              </div>
            </div>
            <Switch
              id="security-notifications"
              checked={formData.securityNotificationsEnabled}
              onCheckedChange={handleSecurityNotificationsChange}
            />
          </div>

          <div className="rounded-md bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              We recommend keeping security notifications enabled for the best protection of your account.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

