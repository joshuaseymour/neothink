"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface CompletionStepProps {
  formData: any
}

export function CompletionStep({ formData }: CompletionStepProps) {
  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <CardTitle>All Set!</CardTitle>
        </div>
        <CardDescription>You've completed the setup process and your account is ready to go.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Account Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="col-span-2 font-medium">{formData.fullName}</span>
              </div>
              {formData.location && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="col-span-2">{formData.location}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Notifications:</span>
                <span className="col-span-2">{formData.notificationsEnabled ? "Enabled" : "Disabled"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Security Alerts:</span>
                <span className="col-span-2">{formData.securityNotificationsEnabled ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Click "Complete Setup" to finish the onboarding process and go to your dashboard.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

