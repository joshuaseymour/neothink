"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brain } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSupabase } from "@/components/providers"

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
})

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupForm) {
    try {
      setIsLoading(true)
      setError(undefined)

      const { error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=signup`,
        },
      })

      if (signupError) throw signupError

      router.push("/auth/verify")
    } catch (error) {
      console.error("Signup error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto rounded-full bg-neothinker-50 p-2">
          <Brain className="h-6 w-6 text-neothinker-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-zinc-500">
          Enter your email below to create your account
        </p>
      </div>

      <div className="rounded-lg border border-neothinker-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neothinker-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-neothinker-50 px-2 text-zinc-500">Or</span>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link 
          href="/auth/login" 
          className="font-medium text-neothinker-600 hover:text-neothinker-700"
        >
          Sign in
        </Link>
      </p>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
