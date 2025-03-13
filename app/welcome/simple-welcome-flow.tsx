"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

interface SimpleWelcomeFlowProps {
  user: any
}

export function SimpleWelcomeFlow({ user }: SimpleWelcomeFlowProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [isCompleting, setIsCompleting] = useState(false)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleComplete = async () => {
    setIsCompleting(true)

    try {
      const supabase = createClient()

      await supabase
        .from("profiles")
        .update({
          full_name: name,
          onboarding_completed: true,
        })
        .eq("id", user.id)

      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to MyApp!</h1>

      {step === 1 && (
        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-medium mb-2">Step 1: Your Name</h2>
          <p className="mb-4">Please tell us your name:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md mb-4"
            placeholder="Your name"
          />
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-medium mb-2">Step 2: Confirmation</h2>
          <p className="mb-4">Please confirm your information:</p>
          <div className="mb-4">
            <strong>Name:</strong> {name}
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack} className="border px-4 py-2 rounded-md">
              Back
            </button>
            <button
              onClick={handleComplete}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isCompleting}
            >
              {isCompleting ? "Completing..." : "Complete Setup"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

