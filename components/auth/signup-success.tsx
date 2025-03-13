"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface SignupSuccessProps {
  userId: string | null
  formData: {
    fullName: string
    email: string
    password: string
  }
}

export function SignupSuccess({ userId, formData }: SignupSuccessProps) {
  const router = useRouter()

  // Trigger confetti effect on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  // Update the handleContinue function to ensure proper redirection

  const handleContinue = () => {
    // First try to sign in the user if they're not already signed in
    const checkAndRedirect = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
          // If not signed in, we need to redirect to login first
          toast({
            title: "Please sign in",
            description: "You need to sign in with your new account to continue.",
          })
          router.push("/auth/login")
        } else {
          // If already signed in, proceed to welcome
          router.push("/welcome")
        }
      } catch (error) {
        console.error("Error checking session:", error)
        // Default to login if we can't determine session state
        router.push("/auth/login")
      }
    }

    checkAndRedirect()
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="border-neutral-800 bg-neutral-900/50 p-6 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />

        <h2 className="text-xl font-bold text-white mb-2">Welcome, {formData.fullName.split(" ")[0]}!</h2>

        <p className="text-neutral-400 mb-6">
          Your account has been successfully created. We've sent a confirmation email to{" "}
          <span className="text-white font-medium">{formData.email}</span>.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-neutral-800 text-left">
            <h3 className="text-white font-medium mb-2">What's Next?</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                </div>
                <span>Complete your profile setup</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-neutral-700 p-1 mt-0.5">
                  <span className="block h-3 w-3 text-xs text-center font-bold text-neutral-300">2</span>
                </div>
                <span>Explore our programs and resources</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-neutral-700 p-1 mt-0.5">
                  <span className="block h-3 w-3 text-xs text-center font-bold text-neutral-300">3</span>
                </div>
                <span>Begin your journey to prosperity, happiness, and longevity</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90"
          >
            Continue to Profile Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

