"use client"

import { cn } from "@/lib/utils"
import { Check, User, Bell, Shield, CheckCircle } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { name: "Personal Info", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Complete", icon: CheckCircle },
  ]

  return (
    <div className="hidden md:flex justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = currentStep === stepNumber
        const isCompleted = currentStep > stepNumber
        const Icon = step.icon

        return (
          <div key={step.name} className="flex flex-col items-center relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-5 left-1/2 w-full h-[2px]",
                  isCompleted
                    ? "bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500"
                    : "bg-neutral-700",
                )}
              />
            )}

            {/* Step circle */}
            <div
              className={cn(
                "z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2",
                isActive
                  ? "border-neothinker-500 bg-neothinker-500/20 text-neothinker-500"
                  : isCompleted
                    ? "border-ascender-500 bg-ascender-500 text-white"
                    : "border-neutral-700 bg-neutral-800 text-neutral-400",
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
            </div>

            {/* Step name */}
            <span
              className={cn(
                "text-sm font-medium",
                isActive ? "text-white" : isCompleted ? "text-ascender-500" : "text-neutral-500",
              )}
            >
              {step.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

