"use client"
import Link from "next/link"
import { UpdatePasswordForm } from "./update-password-form"
import { GradientText } from "@/components/ui/gradient-text"
import { motion } from "framer-motion"
import { AuthIllustration } from "./auth-illustration"

export function UpdatePasswordView() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Form */}
        <motion.div
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center md:text-left">
            <Link href="/" className="inline-block mb-6">
              <GradientText className="text-3xl font-bold">Neothink+</GradientText>
            </Link>

            <h1 className="text-2xl font-bold text-white mb-2">Update Your Password</h1>
            <p className="text-neutral-400">
              Create a new password for your account. Make sure it's secure and easy to remember.
            </p>
          </div>

          <UpdatePasswordForm />
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AuthIllustration />
        </motion.div>
      </div>
    </div>
  )
}

