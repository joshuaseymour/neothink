"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { PersonalInfoStep } from "./steps/personal-info"
import { NotificationsStep } from "./steps/notifications"
import { SecurityStep } from "./steps/security"
import { CompletionStep } from "./steps/completion"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { StepIndicator } from "./components/step-indicator"
import { WelcomeHeader } from "./components/welcome-header"
import { BenefitsSidebar } from "./components/benefits-sidebar"
import confetti from "canvas-confetti"

interface WelcomeFlowProps {
  user: any
  profile: any
}

export function WelcomeFlow({ user, profile }: WelcomeFlowProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || user?.user_metadata?.full_name || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    notificationsEnabled: true,
    securityNotificationsEnabled: true,
  })
  const router = useRouter()
  const { toast } = useToast()
  const totalSteps = 4

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()

      // Update profile with form data
      await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          location: formData.location,
          onboarding_completed: true,
        })
        .eq("id", user.id)

      // Update user account data with notification preferences
      await supabase
        .from("user_account_data")
        .update({
          login_notifications_enabled: formData.securityNotificationsEnabled,
        })
        .eq("id", user.id)

      // Trigger confetti effect
      triggerConfetti()

      toast({
        title: "Setup Complete!",
        description: "Your profile has been set up successfully. Welcome to Neothink!",
        variant: "default",
      })

      // Short delay to show the confetti effect
      setTimeout(() => {
        // Redirect to dashboard
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error completing onboarding:", error)
      toast({
        title: "Error",
        description: "There was a problem completing your setup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Render the current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <NotificationsStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <SecurityStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <CompletionStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <WelcomeHeader userName={formData.fullName || user.email?.split("@")[0]} />

      <div className="max-w-4xl mx-auto mt-12">
        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        <div className="mt-8 mb-4">
          <Progress value={(step / totalSteps) * 100} className="h-2 bg-neutral-800" />
          <div className="flex justify-between mt-2 text-sm text-neutral-400">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between p-6 border-t border-neutral-800">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="border-neutral-700 hover:bg-neutral-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90"
                  >
                    {isLoading ? (
                      "Completing..."
                    ) : (
                      <>
                        Complete Setup
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="hidden lg:block">
            <BenefitsSidebar currentStep={step} />
          </div>
        </div>
      </div>
    </div>
  )
}

