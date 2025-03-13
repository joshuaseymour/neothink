"use client"

import { useState } from "react"
import { Alert, AlertCircle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/utils/supabase/client"

interface DataExportFormProps {
  user: any
}

export function DataExportForm({ user }: DataExportFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { toast } = useToast()

  async function handleRequestExport() {
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      const supabase = createClient()

      // Get user data - use the passed user prop instead of fetching again
      // const { data: userData, error: userError } = await supabase.auth.getUser()
      // if (userError) throw userError

      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
      if (profileError) throw profileError

      // Create a simple JSON export
      const exportData = {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
        profile: profile,
      }

      // Create a downloadable blob
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      // Create a link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `user-data-export-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()

      // Clean up
      URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setIsSuccess(true)
      toast({
        title: "Data Export Complete",
        description: "Your data has been exported successfully.",
        variant: "success",
      })
    } catch (error: any) {
      console.error("Error exporting data:", error)
      setError(error.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Export Your Data</h3>
        <p className="text-sm text-muted-foreground">
          Download a copy of your personal data. This includes your profile information and account details.
        </p>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Your data has been exported successfully. If the download didn't start automatically, please click the
              button again.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <p className="text-sm">
            When you request a data export, we'll generate a JSON file containing your account information. This file
            will be downloaded directly to your device.
          </p>

          <Button onClick={handleRequestExport} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export My Data
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

