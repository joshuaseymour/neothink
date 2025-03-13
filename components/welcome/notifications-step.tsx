"use client"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

interface NotificationsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function NotificationsStep({ formData, updateFormData }: NotificationsStepProps) {
  const handleNotificationsChange = (checked: boolean) => {
    updateFormData({ notificationsEnabled: checked })
  }

  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Notification Preferences</CardTitle>
        </div>
        <CardDescription>Choose which notifications you'd like to receive.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Email Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive email notifications about account activity and updates.
              </div>
            </div>
            <Switch
              id="notifications"
              checked={formData.notificationsEnabled}
              onCheckedChange={handleNotificationsChange}
            />
          </div>

          <div className="rounded-md bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              You can always change your notification preferences later in your account settings.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

