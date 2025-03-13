"use client"

import { motion } from "framer-motion"
import { GradientText } from "@/components/ui/gradient-text"

interface WelcomeHeaderProps {
  userName: string
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <div className="text-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Welcome to <GradientText>Neothink</GradientText>
        </h1>
        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
          Hello{userName ? `, ${userName}` : ""}! Let's set up your account in just a few steps to personalize your
          experience.
        </p>
      </motion.div>
    </div>
  )
}

