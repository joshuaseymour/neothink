import type { Metadata } from "next"

export const authMetadata: Metadata = {
  title: "Authentication | Neothink+",
  description: "Secure authentication for Neothink+ platform",
}

export const dashboardMetadata: Metadata = {
  title: "Dashboard | Neothink+",
  description: "Your personal dashboard on Neothink+",
}

export const defaultMetadata: Metadata = {
  title: {
    template: "%s | Neothink+",
    default: "Neothink+",
  },
  description: "Unlock your potential with Neothink+",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
}
