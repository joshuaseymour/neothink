"use client"

import type { User } from "@supabase/supabase-js"

// This is a simplified version that would work with Resend
// In a real implementation, you would import the Resend SDK

interface NotificationOptions {
  type: string
  user: User
  metadata: Record<string, any>
}

export async function sendSecurityNotification(options: NotificationOptions) {
  const { type, user, metadata } = options

  if (!user.email) {
    return { error: "User has no email" }
  }

  try {
    // Determine email content based on notification type
    let subject = "Security Alert"
    let htmlContent = ""

    switch (type) {
      case "new_login":
        subject = "New Login Detected"
        htmlContent = `
          <h1>New Login to Your Account</h1>
          <p>Hello,</p>
          <p>We detected a new login to your account with the following details:</p>
          <ul>
            <li><strong>Time:</strong> ${new Date(metadata.timestamp).toLocaleString()}</li>
            <li><strong>IP Address:</strong> ${metadata.ip}</li>
            <li><strong>Device:</strong> ${metadata.userAgent}</li>
          </ul>
          <p>If this was you, you can ignore this email. If you didn't log in recently, please change your password immediately.</p>
        `
        break
      // Add other notification types as needed
    }

    // In a real implementation, you would use the Resend SDK:
    // const { data, error } = await resend.emails.send({
    //   from: 'Security <security@yourdomain.com>',
    //   to: user.email,
    //   subject: subject,
    //   html: htmlContent,
    // })

    // For preview, we just log the email
    console.log("PREVIEW MODE: Email would be sent with the following details:")
    console.log("To:", user.email)
    console.log("Subject:", subject)
    console.log("Body:", htmlContent)

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true }
  } catch (error) {
    console.error("Failed to send security notification:", error)
    return { error: "Failed to send notification" }
  }
}

