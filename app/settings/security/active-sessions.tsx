"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LogOut, Laptop, Smartphone, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Session {
  id: string
  userId: string
  userAgent: string
  ip: string
  createdAt: number
  lastActive: number
  location?: string
  deviceName?: string
  current: boolean
}

export function ActiveSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  // Fetch active sessions
  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch("/api/auth/sessions")
        if (!response.ok) throw new Error("Failed to fetch sessions")

        const data = await response.json()
        setSessions(data.sessions || [])
      } catch (error) {
        console.error("Error fetching sessions:", error)
        toast({
          title: "Error",
          description: "Failed to load active sessions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [])

  // Sign out from all other devices
  async function signOutOtherDevices() {
    try {
      setIsSigningOut(true)
      const response = await fetch("/api/auth/sessions?others=true", {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to sign out other devices")

      const data = await response.json()
      toast({
        title: "Success",
        description: data.message || "Signed out from all other devices",
      })

      // Update the sessions list
      setSessions(sessions.filter((session) => session.current))
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out from other devices",
        variant: "destructive",
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  // Sign out from a specific device
  async function signOutDevice(sessionId: string) {
    try {
      const isCurrent = sessions.find((s) => s.id === sessionId)?.current

      const response = await fetch(`/api/auth/sessions?id=${sessionId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to sign out device")

      if (isCurrent) {
        // If signing out current device, redirect to login
        toast({
          title: "Signed out",
          description: "You have been signed out successfully",
        })
        router.push("/auth/login")
      } else {
        // Otherwise just update the sessions list
        toast({
          title: "Success",
          description: "Device signed out successfully",
        })
        setSessions(sessions.filter((session) => session.id !== sessionId))
      }
    } catch (error) {
      console.error("Error signing out device:", error)
      toast({
        title: "Error",
        description: "Failed to sign out device",
        variant: "destructive",
      })
    }
  }

  // Helper to determine device icon
  function getDeviceIcon(userAgent: string) {
    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent.toLowerCase())) {
      return <Smartphone className="h-5 w-5 text-gray-500" />
    } else {
      return <Laptop className="h-5 w-5 text-gray-500" />
    }
  }

  // Format date
  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString()
  }

  // Calculate time since last active
  function getLastActiveSince(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>Manage your active login sessions across devices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No active sessions found</div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="flex items-start justify-between border-b pb-4 last:border-0">
              <div className="flex items-start space-x-4">
                <div className="mt-1">{getDeviceIcon(session.userAgent)}</div>
                <div>
                  <div className="font-medium flex items-center">
                    {session.current ? (
                      <>
                        Current Device
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        {session.deviceName || "Unknown Device"}
                        {Date.now() - session.lastActive > 24 * 60 * 60 * 1000 && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Inactive
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.ip} • {session.location || "Unknown location"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>Signed in: {formatDate(session.createdAt)}</div>
                    <div>Last active: {getLastActiveSince(session.lastActive)}</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOutDevice(session.id)}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {session.current ? "Sign Out" : "Revoke"}
              </Button>
            </div>
          ))
        )}
      </CardContent>
      {sessions.length > 1 && (
        <CardFooter>
          <Button variant="destructive" onClick={signOutOtherDevices} disabled={isSigningOut} className="w-full">
            {isSigningOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Sign Out From All Other Devices
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

