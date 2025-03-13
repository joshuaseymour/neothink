"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Rocket, Brain, HeartPulse } from "lucide-react"
import { motion } from "framer-motion"

interface CompletionStepProps {
  formData: any
}

export function CompletionStep({ formData }: CompletionStepProps) {
  const programs = [
    {
      id: "ascender",
      title: "Ascender",
      description: "Financial abundance and wealth creation",
      icon: Rocket,
      color: "from-ascender-600 to-ascender-800",
    },
    {
      id: "neothinker",
      title: "Neothinker",
      description: "Emotional well-being and fulfillment",
      icon: Brain,
      color: "from-neothinker-600 to-neothinker-800",
    },
    {
      id: "immortal",
      title: "Immortal",
      description: "Health optimization and longevity",
      icon: HeartPulse,
      color: "from-immortal-600 to-immortal-800",
    },
  ]

  return (
    <>
      <CardHeader className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 p-2 rounded-lg">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">You're All Set!</CardTitle>
            <CardDescription className="text-neutral-400">
              Your profile is complete and you're ready to begin your journey
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="rounded-lg border border-neutral-700 p-4 bg-neutral-800/50">
            <h3 className="font-medium text-white mb-3">Account Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-neutral-400">Name:</span>
                <span className="col-span-2 font-medium text-white">{formData.fullName}</span>
              </div>
              {formData.location && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-neutral-400">Location:</span>
                  <span className="col-span-2 text-neutral-300">{formData.location}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="text-neutral-400">Notifications:</span>
                <span className="col-span-2 text-neutral-300">
                  {formData.notificationsEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-neutral-400">Security Alerts:</span>
                <span className="col-span-2 text-neutral-300">
                  {formData.securityNotificationsEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">Explore Our Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="rounded-lg overflow-hidden border border-neutral-700"
                >
                  <div className={`bg-gradient-to-r ${program.color} p-3`}>
                    <program.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="p-3 bg-neutral-800/50">
                    <h4 className="font-medium text-white mb-1">{program.title}</h4>
                    <p className="text-xs text-neutral-400">{program.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-gradient-to-r from-ascender-500/10 via-neothinker-500/10 to-immortal-500/10 p-4 border border-neutral-700/50">
            <p className="text-sm text-neutral-300 text-center">
              Click "Complete Setup" to finish the onboarding process and go to your dashboard.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

