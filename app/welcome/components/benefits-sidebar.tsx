"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Brain, HeartPulse, Sparkles, Shield } from "lucide-react"
import { motion } from "framer-motion"

interface BenefitsSidebarProps {
  currentStep: number
}

export function BenefitsSidebar({ currentStep }: BenefitsSidebarProps) {
  // Different benefits to show based on the current step
  const stepBenefits = {
    1: [
      {
        icon: Rocket,
        title: "Personalized Experience",
        description: "Your profile information helps us tailor content to your specific needs and goals.",
      },
      {
        icon: Brain,
        title: "Connect with Others",
        description: "Find like-minded individuals on similar journeys to prosperity and growth.",
      },
    ],
    2: [
      {
        icon: Sparkles,
        title: "Stay Informed",
        description: "Receive timely updates about new content, features, and opportunities.",
      },
      {
        icon: HeartPulse,
        title: "Never Miss Out",
        description: "Get notified about exclusive events and limited-time offers.",
      },
    ],
    3: [
      {
        icon: Shield,
        title: "Account Protection",
        description: "Security settings help keep your account and personal information safe.",
      },
      {
        icon: Rocket,
        title: "Peace of Mind",
        description: "Know immediately if there's any unusual activity on your account.",
      },
    ],
    4: [
      {
        icon: Sparkles,
        title: "Ready to Transform",
        description: "You're about to begin your journey to prosperity, happiness, and longevity.",
      },
      {
        icon: Brain,
        title: "Exclusive Access",
        description: "Unlock premium content and features available only to members.",
      },
    ],
  }

  const benefits = stepBenefits[currentStep as keyof typeof stepBenefits] || stepBenefits[1]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Benefits</h3>

      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-ascender-500 to-neothinker-500 p-2 rounded-lg">
                  <benefit.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{benefit.title}</h4>
                  <p className="text-sm text-neutral-400">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ascender-500/20 via-neothinker-500/20 to-immortal-500/20" />
            <div className="p-4 relative z-10">
              <h4 className="font-medium text-white mb-2">Need Help?</h4>
              <p className="text-sm text-neutral-400 mb-3">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <a href="#" className="text-sm font-medium text-neothinker-500 hover:text-neothinker-400">
                Contact Support →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

