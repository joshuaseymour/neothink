"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface NotificationPreferences {
  all_logins: boolean
  new_devices: boolean
  suspicious_activity: boolean
}

export function LoginNotifications() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    all_logins: false,
    new_devices: true,
    suspicious_activity: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadPreferences() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("notification_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Error loading notification preferences:", error)
          toast({
            title: "Error loading preferences",
            description: "Could not load your notification preferences.",
            variant: "destructive",
          })
        } else if (data) {
          setPreferences({
            all_logins: data.all_logins || false,
            new_devices: data.new_devices || true,
            suspicious_activity: data.suspicious_activity || true,
          })
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [supabase])

  const savePreferences = async () => {
    try {
      setSaving(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Authentication error",
          description: "You must be logged in to save preferences.",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("notification_preferences").upsert({
        user_id: user.id,
        all_logins: preferences.all_logins,
        new_devices: preferences.new_devices,
        suspicious_activity: preferences.suspicious_activity,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error saving notification preferences:", error)
        toast({
          title: "Error saving preferences",
          description: "Could not save your notification preferences.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Preferences saved",
          description: "Your notification preferences have been updated.",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error saving preferences",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login Notifications</CardTitle>
        <CardDescription>Configure when you receive email notifications about login activity</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="all-logins">All login attempts</Label>
                <p className="text-sm text-muted-foreground">Receive an email notification every time you log in</p>
              </div>
              <Switch
                id="all-logins"
                checked={preferences.all_logins}
                onCheckedChange={() => handleToggle("all_logins")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-devices">New devices</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you log in from a new device or browser
                </p>
              </div>
              <Switch
                id="new-devices"
                checked={preferences.new_devices}
                onCheckedChange={() => handleToggle("new_devices")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="suspicious">Suspicious activity</Label>
                <p className="text-sm text-muted-foreground">
                  Get alerted about unusual login attempts or potential security threats
                </p>
              </div>
              <Switch
                id="suspicious"
                checked={preferences.suspicious_activity}
                onCheckedChange={() => handleToggle("suspicious_activity")}
              />
            </div>

            <Button onClick={savePreferences} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save preferences"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

