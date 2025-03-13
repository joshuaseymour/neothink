"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email templates
export const EMAIL_TEMPLATES = {
  // Security notifications
  new_login: {
    subject: "New Login Detected",
    body: (data: any) => `
      <h1>New Login to Your Account</h1>
      <p>Hello,</p>
      <p>We detected a new login to your account with the following details:</p>
      <ul>
        <li><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</li>
        <li><strong>IP Address:</strong> ${data.ip || "Unknown"}</li>
        <li><strong>Device:</strong> ${data.userAgent || "Unknown"}</li>
      </ul>
      <p>If this was you, you can ignore this email. If you didn't log in recently, please change your password immediately.</p>
    `,
  },
  password_changed: {
    subject: "Password Changed",
    body: (data: any) => `
      <h1>Your Password Was Changed</h1>
      <p>Hello,</p>
      <p>Your account password was changed on ${new Date(data.timestamp).toLocaleString()}.</p>
      <p>If you made this change, you can ignore this email. If you didn't change your password, please contact support immediately.</p>
    `,
  },
  // Account management
  account_deactivated: {
    subject: "Account Deactivated",
    body: (data: any) => `
      <h1>Your Account Has Been Deactivated</h1>
      <p>Hello,</p>
      <p>Your account has been deactivated on ${new Date(data.timestamp).toLocaleString()}.</p>
      <p>If you wish to reactivate your account, you can do so by logging in again.</p>
    `,
  },
  // Add other templates as needed
}

// Generic email sending function
export async function sendEmail({
  to,
  subject,
  html,
  from = `Security <${process.env.SMTP_FROM || "noreply@yourdomain.com"}>`,
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { error: error.message }
    }

    return { success: true, messageId: data?.id }
  } catch (error: any) {
    console.error("Email sending exception:", error)
    return { error: error.message || "Failed to send email" }
  }
}

// Function to send security notifications
export async function sendSecurityNotification({
  type,
  user,
  metadata,
}: {
  type: keyof typeof EMAIL_TEMPLATES
  user: { email: string | null; id: string }
  metadata: Record<string, any>
}) {
  if (!user.email) {
    return { error: "User has no email" }
  }

  try {
    const template = EMAIL_TEMPLATES[type]
    if (!template) {
      return { error: `Unknown notification type: ${type}` }
    }

    // Send the email
    const result = await sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.body(metadata),
    })

    if (result.error) {
      return result
    }

    // Log the notification in the database
    const { createClient } = await import("@/utils/supabase/server")
    const supabase = createClient()

    await supabase.from("security_notifications").insert({
      user_id: user.id,
      notification_type: type,
      metadata,
    })

    return { success: true }
  } catch (error: any) {
    console.error("Failed to send security notification:", error)
    return { error: error.message || "Failed to send notification" }
  }
}

/**
 * Preview version of sendSecurityNotification for development environments
 * This simulates sending emails without actually sending them
 */
export async function previewSecurityNotification({
  type,
  user,
  metadata,
}: {
  type: keyof typeof EMAIL_TEMPLATES
  user: { email: string | null; id: string }
  metadata: Record<string, any>
}) {
  if (!user.email) {
    return { error: "User has no email" }
  }

  try {
    const template = EMAIL_TEMPLATES[type]
    if (!template) {
      return { error: `Unknown notification type: ${type}` }
    }

    // In preview mode, we just log the email instead of sending it
    console.log("PREVIEW MODE: Email would be sent with the following details:")
    console.log("To:", user.email)
    console.log("Subject:", template.subject)
    console.log("Body:", template.body(metadata))

    // Simulate a delay like a real email send would have
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true }
  } catch (error: any) {
    console.error("Failed to send security notification:", error)
    return { error: error.message || "Failed to send notification" }
  }
}

