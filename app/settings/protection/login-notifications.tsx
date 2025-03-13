"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"

interface LoginNotificationsProps {
  user: User
}

export function LoginNotifications({ user }: LoginNotificationsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from("user_account_data")
          .select("login_notifications_enabled")
          .eq("id", user.id)
          .single()

        if (data) {
          setNotificationsEnabled(data.login_notifications_enabled !== false) // Default to true if null
        }
      } catch (error) {
        console.error("Error loading notification settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [user.id])

  async function handleToggleNotifications(enabled: boolean) {
    setNotificationsEnabled(enabled)

    try {
      const supabase = createClient()
      await supabase.from("user_account_data").update({ login_notifications_enabled: enabled }).eq("id", user.id)
    } catch (error) {
      console.error("Error updating notification settings:", error)
      // Revert UI state on error
      setNotificationsEnabled(!enabled)
    }
  }

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading settings...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="login-notifications" checked={notificationsEnabled} onCheckedChange={handleToggleNotifications} />
        <Label htmlFor="login-notifications">Email me about new logins</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        When enabled, we'll send you an email notification whenever your account is accessed from a new device or
        location.
      </p>
    </div>
  )
}

