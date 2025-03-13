"use client"

import { useReducer } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { PersonalInfoStep } from "./steps/personal-info"
import { NotificationsStep } from "./steps/notifications"
import { SecurityStep } from "./steps/security"
import { CompletionStep } from "./steps/completion"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@supabase/supabase-js"
import type { Profile, OnboardingFormData } from "@/types"

interface WelcomeClientProps {
  user: User
  profile: Profile
}

// Define action types
type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_FORM_DATA"; payload: Partial<OnboardingFormData> }
  | { type: "SET_LOADING"; payload: boolean }

// Define reducer function
function reducer(state, action: Action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload }
    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export default function WelcomeClient({ user, profile }: WelcomeClientProps) {
  // Initial state
  const initialState = {
    step: 1,
    isLoading: false,
    formData: {
      fullName: profile?.full_name || user?.user_metadata?.full_name || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      notificationsEnabled: true,
      securityNotificationsEnabled: true,
    },
  }

  // Use reducer instead of multiple useState calls
  const [state, dispatch] = useReducer(reducer, initialState)
  const { step, isLoading, formData } = state

  const router = useRouter()
  const { toast } = useToast()
  const totalSteps = 4

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: data })
  }

  const handleNext = () => {
    if (step < totalSteps) {
      dispatch({ type: "SET_STEP", payload: step + 1 })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      dispatch({ type: "SET_STEP", payload: step - 1 })
    }
  }

  const handleComplete = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const supabase = createClient()

      // Update profile with form data
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          location: formData.location,
          onboarding_completed: true,
        })
        .eq("id", user.id)

      if (profileError) {
        throw new Error(`Failed to update profile: ${profileError.message}`)
      }

      // Update user account data with notification preferences
      const { error: accountError } = await supabase
        .from("user_account_data")
        .update({
          login_notifications_enabled: formData.securityNotificationsEnabled,
        })
        .eq("id", user.id)

      if (accountError) {
        console.error("Error updating account data:", accountError)
        // Continue despite this error, but log it
      }

      toast({
        title: "Setup Complete",
        description: "Your account has been set up successfully.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error completing onboarding:", error)
      toast({
        title: "Error",
        description:
          typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : "There was a problem completing your setup. Please try again.",
        variant: "destructive",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
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

