"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Brain } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setIsLoading(false)
      return toast.error(error.message)
    }

    router.refresh()
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto rounded-full bg-neothinker-50 p-2">
          <Brain className="h-6 w-6 text-neothinker-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-sm text-zinc-500">
          Sign in to your account to continue
        </p>
      </div>

      <div className="rounded-lg border border-neothinker-200 bg-white p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-neothinker-600 hover:text-neothinker-700">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-zinc-500">
          <Link href="/auth/reset-password" className="font-medium text-neothinker-600 hover:text-neothinker-700">
            Forgot your password?
          </Link>
        </p>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
