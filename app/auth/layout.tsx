"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { checkAuth } from "./actions"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Skip auth check for not-found page
  useEffect(() => {
    if (pathname === "/_not-found") return

    async function checkAuthStatus() {
      try {
        const redirectTo = await checkAuth()
        if (redirectTo) {
          router.replace(redirectTo)
        }
      } catch (error) {
        console.error("Auth layout error:", error)
      }
    }

    checkAuthStatus()
  }, [router, pathname])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neothinker-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
      {children}
    </div>
  )
}
