"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "An error occurred during authentication"

  return (
    <Card>
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Authentication Error
        </CardTitle>
        <CardDescription className="text-base">
          {error}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button variant="default" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="flex justify-center">
        <Logo className="h-12 w-auto" />
      </div>

      <Suspense fallback={
        <Card>
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-50 p-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Loading...
            </CardTitle>
          </CardHeader>
        </Card>
      }>
        <ErrorContent />
      </Suspense>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-zinc-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
