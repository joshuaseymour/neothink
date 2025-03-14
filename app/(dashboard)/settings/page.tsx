"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ButtonWrapper } from "@/components/ui/button-wrapper"
import { useToast } from "@/components/ui/use-toast"
import { AuthProvider } from "@/context/auth-context"
import { createClient } from "@/lib/supabase/client"

export default function SettingsPage() {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleUpdateSettings = async (setting: string, value: boolean) => {
    try {
      setIsLoading(true)

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user?.id,
          [setting]: value,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      })
    } catch (error: any) {
      console.error("Error updating settings:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive program updates and announcements
              </p>
            </div>
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateSettings("email_notifications", checked)
              }
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Progress Reminders</h3>
              <p className="text-sm text-muted-foreground">
                Get reminded about your program progress
              </p>
            </div>
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateSettings("progress_reminders", checked)
              }
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Profile Visibility</h3>
              <p className="text-sm text-muted-foreground">
                Show your profile to other community members
              </p>
            </div>
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateSettings("profile_visible", checked)
              }
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Progress Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Share your program progress with the community
              </p>
            </div>
            <Switch
              onCheckedChange={(checked) =>
                handleUpdateSettings("share_progress", checked)
              }
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ButtonWrapper
            variant="outline"
            className="w-full"
            onClick={() => {
              toast({
                title: "Coming soon",
                description: "Account export functionality will be available soon.",
              })
            }}
          >
            Export Account Data
          </ButtonWrapper>
          <ButtonWrapper
            variant="destructive"
            className="w-full"
            onClick={() => {
              toast({
                title: "Coming soon",
                description: "Account deletion functionality will be available soon.",
              })
            }}
          >
            Delete Account
          </ButtonWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
