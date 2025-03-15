"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSupabase } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <Button 
              type="submit"
              className="bg-neothinker-600 hover:bg-neothinker-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue to Dashboard"}
            </Button>

            {error && (
              <Alert variant="error">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
