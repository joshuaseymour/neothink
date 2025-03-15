"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Check } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      toast({
        title: "Welcome to Neothink+!",
        description: "Please check your email to verify your account.",
      })

      router.push("/auth/verify")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-6 text-center p-8">
          <div className="flex justify-center">
            <Logo className="h-12 w-auto" />
          </div>
          <div className="space-y-2">
            <CardTitle className="bg-gradient-primary bg-clip-text text-transparent">
              Join Neothink+
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Create your account to get started
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSignUp} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  className="h-11"
                />
                <div className="space-y-3 text-sm text-muted-foreground pt-1">
                  <div className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                    <span>One uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                    <span>One number</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-medium"
              disabled={isLoading || !passwordStrength || password !== confirmPassword}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
