"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    router.replace("/auth/login")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <Logo className="h-12 w-auto" />
        </div>

        <Card>
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-amber-50 dark:bg-amber-950 p-3">
                <Brain className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to Neothink+</CardTitle>
            <CardDescription className="text-base">
              Redirecting you to login...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant="default"
                className="w-full"
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
      </div>
    </div>
  )
}
