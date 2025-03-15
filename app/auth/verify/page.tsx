"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="flex justify-center">
          <Logo className="h-12 w-auto" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="bg-gradient-primary bg-clip-text text-transparent">
            Check Your Email
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              We&apos;ve sent you a verification link. Please check your email to verify your account.
            </p>
            <p className="text-muted-foreground">
              Once verified, you can sign in to your account.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button variant="outline" size="lg">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
