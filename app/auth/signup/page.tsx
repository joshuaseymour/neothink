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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Join Neothink+
            </CardTitle>
            <CardDescription className="text-lg">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    disabled={isLoading}
                    className="h-12 text-base"
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
                <div className="space-y-3">
                  <Label htmlFor="confirm-password" className="text-base">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium text-lg"
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

              <div className="text-center pt-4">
                <p className="text-base text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
