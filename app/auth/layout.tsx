"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useSupabase } from "@/components/providers"
import { checkAuth } from "./actions"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoading } = useSupabase()

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

  const backgroundGradient = (
    <div className="absolute inset-0 -z-10">
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neothinker-50">
        {backgroundGradient}
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto rounded-full bg-neothinker-50 p-2">
              <Brain className="h-6 w-6 text-neothinker-600 animate-pulse" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Loading...</h1>
            <p className="text-sm text-zinc-500">
              Setting up your session
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neothinker-50">
      {backgroundGradient}
      {children}
    </div>
  )
}
