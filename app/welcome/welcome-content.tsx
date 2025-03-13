"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import { PersonalInfoStep } from "@/components/welcome/personal-info-step"
import { NotificationsStep } from "@/components/welcome/notifications-step"
import { SecurityStep } from "@/components/welcome/security-step"
import { CompletionStep } from "@/components/welcome/completion-step"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import type { BasicUserInfo } from "@/types"

interface WelcomeContentProps {
  user: BasicUserInfo
  profile: any
}

export function WelcomeContent({ user, profile }: WelcomeContentProps) {
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

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to MyApp!</h1>
        <p className="text-muted-foreground">Let's get you set up in just a few steps.</p>
      </div>

      <div className="mb-8">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
      </div>

      <Card>
        {step === 1 && <PersonalInfoStep formData={formData} updateFormData={updateFormData} />}

        {step === 2 && <NotificationsStep formData={formData} updateFormData={updateFormData} />}

        {step === 3 && <SecurityStep formData={formData} updateFormData={updateFormData} />}

        {step === 4 && <CompletionStep formData={formData} />}

        <CardFooter className="flex justify-between pt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} disabled={isLoading}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={isLoading}>
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
        </CardFooter>
      </Card>
    </div>
  )
}

