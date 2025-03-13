"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"
import { Shield, Key, LogOut, History } from "lucide-react"
import type { User } from "@/types"
import { Badge } from "@/components/ui/badge"

interface ProfileSecurityProps {
  user: User
}

export function ProfileSecurity({ user }: ProfileSecurityProps) {
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [isLoadingLogout, setIsLoadingLogout] = useState(false)

  // Mock data for recent sessions
  const sessions = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "2 hours ago",
      current: true,
    },
    {
      id: "2",
      device: "Firefox on MacOS",
      location: "San Francisco, USA",
      ip: "192.168.1.2",
      time: "3 days ago",
      current: false,
    },
    {
      id: "3",
      device: "Safari on iPhone",
      location: "Toronto, Canada",
      ip: "192.168.1.3",
      time: "1 week ago",
      current: false,
    },
  ]

  const handleChangePassword = async () => {
    setIsLoadingPassword(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.resetPasswordForEmail(user.email || "")

      if (error) {
        throw error
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email to reset your password.",
      })
    } catch (error: any) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingPassword(false)
    }
  }

  const handleLogoutAllDevices = async () => {
    setIsLoadingLogout(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signOut({ scope: "global" })

      if (error) {
        throw error
      }

      toast({
        title: "Logged out from all devices",
        description: "You've been successfully logged out from all devices.",
      })

      // Redirect to login page after short delay
      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)
    } catch (error: any) {
      console.error("Error logging out from all devices:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to log out from all devices.",
        variant: "destructive",
      })
      setIsLoadingLogout(false)
    }
  }

  const handleRevokeSession = (sessionId: string) => {
    toast({
      title: "Session revoked",
      description: "The selected session has been revoked successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-neutral-800 bg-neutral-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-neutral-400" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-neutral-400" />
              Password
            </h3>
            <div className="grid md:grid-cols-[1fr_auto] items-center gap-4 p-4 rounded-lg border border-neutral-800">
              <div>
                <h4 className="font-medium text-white mb-1">Change Password</h4>
                <p className="text-sm text-neutral-400">We'll email you a secure link to change your password</p>
              </div>
              <Button variant="outline" onClick={handleChangePassword} disabled={isLoadingPassword}>
                {isLoadingPassword ? "Sending..." : "Reset Password"}
              </Button>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] items-center gap-4 p-4 rounded-lg border border-neutral-800">
              <div>
                <h4 className="font-medium text-white mb-1">Two-Factor Authentication</h4>
                <p className="text-sm text-neutral-400">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Set Up 2FA</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <History className="h-5 w-5 text-neutral-400" />
              Active Sessions
            </h3>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-lg border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{session.device}</h4>
                      {session.current && <Badge variant="neothinker">Current</Badge>}
                    </div>
                    <div className="text-sm text-neutral-400 mt-1">
                      <p>Location: {session.location}</p>
                      <p>IP: {session.ip}</p>
                      <p>Last active: {session.time}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-neutral-800">
            <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-2">
              <LogOut className="h-5 w-5 text-neutral-400" />
              Logout from all devices
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              This will sign you out from all devices, including this one. You'll need to sign in again.
            </p>
            <Button variant="destructive" onClick={handleLogoutAllDevices} disabled={isLoadingLogout}>
              {isLoadingLogout ? "Logging out..." : "Logout from all devices"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

