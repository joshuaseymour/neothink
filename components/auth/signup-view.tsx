"use client"

import { useState } from "react"
import Link from "next/link"
import { SignupForm } from "./signup-form"
import { SignupSuccess } from "./signup-success"
import { motion } from "framer-motion"

export function SignupView() {
  const [step, setStep] = useState(1)
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSuccess = (userId: string) => {
    setUserId(userId)
    setStep(2)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {step === 1 ? "Create your account" : "Account created!"}
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              {step === 1 ? "Join Neothink+ and begin your journey" : "Welcome to the Neothink+ community"}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            {step === 1 ? (
              <>
                <SignupForm formData={formData} updateFormData={updateFormData} onSuccess={handleSuccess} />
                <div className="mt-6 text-center text-sm text-neutral-500">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-neothinker-500 hover:underline">
                    Sign in
                  </Link>
                </div>
              </>
            ) : (
              <SignupSuccess userId={userId} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

