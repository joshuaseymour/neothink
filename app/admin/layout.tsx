import type React from "react"
import { adminMiddleware } from "@/middleware/admin"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Apply admin middleware at the layout level
  // This ensures all admin pages are protected
  await adminMiddleware({
    nextUrl: { pathname: "/admin" },
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  } as any)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {children}
    </div>
  )
}

