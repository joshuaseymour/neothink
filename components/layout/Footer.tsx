"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")
  const isDashboard = pathname.startsWith("/dashboard")

  // Don't show footer on auth or dashboard pages
  if (isAuthPage || isDashboard) return null

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo className="h-8 w-auto" />
          <div className="flex gap-8">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Neothink+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
