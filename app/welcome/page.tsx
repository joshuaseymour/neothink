"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push("/auth/login")
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .single()

        if (profileError) {
          throw profileError
        }

        if (profile.onboarding_completed) {
          router.push("/dashboard")
          return
        }

        setIsLoading(false)
      } catch (error: any) {
        console.error("Welcome page error:", error)
        setToast({
          title: "Error",
          description: error.message || "Failed to load profile. Please try again.",
          type: "error"
        })
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-neothinker-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-neothinker-200 bg-white p-6">
          <h1 className="text-2xl font-semibold mb-4">Welcome to Neothink</h1>
          <p className="text-zinc-500 mb-6">Let's get you started with your learning journey.</p>

          <form onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)

            try {
              const { data: { user }, error: userError } = await supabase.auth.getUser()
              
              if (userError || !user) {
                throw new Error(userError?.message || "User not found")
              }

              const { error: updateError } = await supabase
                .from("profiles")
                .update({ onboarding_completed: true })
                .eq("id", user.id)

              if (updateError) {
                throw updateError
              }

              router.push("/dashboard")
            } catch (error: any) {
              console.error("Welcome form error:", error)
              setToast({
                title: "Error",
                description: error.message || "Failed to complete onboarding. Please try again.",
                type: "error"
              })
              setIsLoading(false)
            }
          }}>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-neothinker-600 px-4 py-2 text-white transition-colors
                ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-neothinker-700"}`}
            >
              {isLoading ? "Getting Started..." : "Get Started"}
            </button>
          </form>

          {toast && (
            <div className={`mt-4 rounded-lg border p-4 ${
              toast.type === "error" 
                ? "border-red-200 bg-red-50 text-red-900"
                : "border-green-200 bg-green-50 text-green-900"
            }`}>
              <p className="text-sm font-medium">{toast.title}</p>
              <p className="text-sm mt-1">{toast.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
