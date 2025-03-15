"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function verifyEmail() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) throw error

        if (!user) {
          throw new Error("No user found")
        }

        if (!user.email_confirmed_at) {
          setToast({
            title: "Verification pending",
            description: "Please check your email to verify your account.",
            type: "error"
          })
          return
        }

        setToast({
          title: "Email verified",
          description: "Your email has been verified successfully.",
          type: "success"
        })

        // Redirect to welcome page after a short delay
        setTimeout(() => {
          router.push("/welcome")
        }, 1000)
      } catch (error: any) {
        console.error("Verification error:", error)
        setToast({
          title: "Error",
          description: error.message || "Verification failed. Please try again.",
          type: "error"
        })
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [router, supabase.auth])

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-neothinker-200 bg-white">
          <div className="border-b border-neothinker-200 p-6">
            <h2 className="text-xl font-semibold">Email Verification</h2>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
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
            ) : (
              toast && (
                <div className={`rounded-lg border p-4 ${
                  toast.type === "error" 
                    ? "border-red-200 bg-red-50 text-red-900"
                    : "border-green-200 bg-green-50 text-green-900"
                }`}>
                  <p className="text-sm font-medium">{toast.title}</p>
                  <p className="text-sm mt-1">{toast.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
