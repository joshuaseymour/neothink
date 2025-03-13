"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PasswordFormStatusProps {
  type: "success" | "error"
  message?: string
}

export function PasswordFormStatus({ type, message }: PasswordFormStatusProps) {
  const router = useRouter()

  if (type === "success") {
    return (
      <motion.div
        className="text-center p-6 rounded-lg border border-neutral-800 bg-neutral-900/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Password Updated</h3>
        <p className="text-neutral-400 mb-4">
          Your password has been updated successfully. You will be redirected to the login page shortly.
        </p>
        <Button
          onClick={() => router.push("/auth/login")}
          className="bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90"
        >
          Go to Login
        </Button>
      </motion.div>
    )
  }

  if (type === "error") {
    return (
      <motion.div
        className="text-center p-6 rounded-lg border border-neutral-800 bg-neutral-900/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Error</h3>
        <p className="text-neutral-400 mb-4">{message}</p>
        <Button onClick={() => router.push("/auth/login")} variant="outline">
          Back to Login
        </Button>
      </motion.div>
    )
  }

  return null
}
