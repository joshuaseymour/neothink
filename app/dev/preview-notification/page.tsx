"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { previewSecurityNotification } from "@/lib/email"

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

export default function PreviewNotificationPage() {
  // Prevent access in production
  if (!isDevelopment) {
    return (
      <div className="container py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Development Only</CardTitle>
            <CardDescription>This page is only available in development mode.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Rest of the component remains the same
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSendTestNotification() {
    setIsSending(true)
    setResult(null)

    try {
      // Create a mock user
      const mockUser = {
        id: "mock-user-id",
        email: "user@example.com",
      } as any

      // Send a test notification
      const result = await previewSecurityNotification({
        type: "new_login",
        user: mockUser,
        metadata: {
          timestamp: new Date().toISOString(),
          ip: "192.168.1.1",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })

      setResult(result)
    } catch (error) {
      console.error("Error sending test notification:", error)
      setResult({ error: "Failed to send test notification" })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Email Notification Preview</CardTitle>
          <CardDescription>Test the security notification system in preview mode</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will simulate sending a security notification email. In preview mode, the email won't actually be sent,
            but you can see the content in the console.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSendTestNotification} disabled={isSending}>
            {isSending ? "Sending..." : "Send Test Notification"}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card className="max-w-md mx-auto mt-4">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

