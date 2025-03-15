"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Check Your Email
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;ve sent you a verification link. Please check your email to verify your account.
          </p>
          <p className="mt-2 text-muted-foreground">
            Once verified, you can sign in to your account.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/auth/login">
            <Button variant="outline">
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
