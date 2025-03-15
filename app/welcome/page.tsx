export const dynamic = "force-dynamic"

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSupabase } from "@/components/providers"

const welcomeSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
})

type WelcomeForm = z.infer<typeof welcomeSchema>

export default function WelcomePage() {
  const router = useRouter()
  const { supabase, user } = useSupabase()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeForm>({
    resolver: zodResolver(welcomeSchema),
  })

  async function onSubmit(data: WelcomeForm) {
    try {
      setIsLoading(true)
      setError(undefined)

      if (!user) {
        throw new Error("No user found")
      }

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      router.push("/dashboard")
    } catch (error) {
      console.error("Welcome page error:", error)
      setError(error instanceof Error ? error.message : "Failed to update profile")
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
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Neothink</h1>
        <p className="text-sm text-zinc-500">
          Let's get to know you better
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label 
                htmlFor="fullName" 
                className="text-sm font-medium leading-none"
              >
                Full Name
              </label>
              <input
                id="fullName"
                placeholder="Enter your full name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <button 
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue to Dashboard"}
            </button>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
