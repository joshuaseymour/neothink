"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function VerifyPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="flex justify-center">
        <Logo className="h-12 w-auto" />
      </div>
      
      <Card>
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Check Your Email
          </CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link. Please check your email to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Didn&apos;t receive an email?</p>
            <p>Check your spam folder or try signing up again with a different email address.</p>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">
              Return to login
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
