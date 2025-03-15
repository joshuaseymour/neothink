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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-black/5" />
        <div className="relative p-12 flex items-center justify-center">
          <div className="max-w-lg space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center">
              Why Choose Neothink+?
            </h2>
            <div className="grid gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Proven Methods</h3>
                  <p className="text-gray-600 mt-2">
                    Our scientifically-backed approaches have helped thousands achieve their goals.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Expert Support</h3>
                  <p className="text-gray-600 mt-2">
                    Get guidance from our team of experienced professionals whenever you need it.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                  <p className="text-gray-600 mt-2">
                    Join a thriving community of like-minded individuals on their journey to excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
