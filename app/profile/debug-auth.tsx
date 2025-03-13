"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function DebugAuth() {
  const [loading, setLoading] = useState(true)
  const [authInfo, setAuthInfo] = useState<any>(null)
  const [profileInfo, setProfileInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true)
        const supabase = createClient()

        // Get auth user
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          throw authError
        }

        setAuthInfo({
          id: user?.id,
          email: user?.email,
          created_at: user?.created_at,
          last_sign_in_at: user?.last_sign_in_at,
        })

        // Try to get profile
        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          if (profileError) {
            setProfileInfo({ error: profileError.message })
          } else {
            setProfileInfo(profile)
          }
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const testProfileUpdate = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("No authenticated user found")
      }

      // Try a minimal update
      const { error } = await supabase
        .from("profiles")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      alert("Profile update successful!")

      // Refresh profile info
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfileInfo(profile)
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Authentication Debug Info</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Auth User:</h3>
              <pre className="bg-muted p-2 rounded-md overflow-auto text-xs">{JSON.stringify(authInfo, null, 2)}</pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">Profile:</h3>
              <pre className="bg-muted p-2 rounded-md overflow-auto text-xs">
                {JSON.stringify(profileInfo, null, 2)}
              </pre>
            </div>

            <Button onClick={testProfileUpdate} disabled={loading}>
              Test Profile Update
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

