"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, AlertTriangle, Lock, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

interface SecurityStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function SecurityStep({ formData, updateFormData }: SecurityStepProps) {
  const handleSecurityNotificationsChange = (checked: boolean) => {
    updateFormData({ securityNotificationsEnabled: checked })
  }

  const securityFeatures = [
    {
      id: "login-alerts",
      label: "Login Alerts",
      description: "Get notified when your account is accessed from a new device or location",
      icon: Smartphone,
      isEnabled: formData.securityNotificationsEnabled,
    },
    {
      id: "suspicious-activity",
      label: "Suspicious Activity Detection",
      description: "We'll monitor your account for unusual behavior",
      icon: AlertTriangle,
      isEnabled: true,
    },
    {
      id: "data-encryption",
      label: "Data Encryption",
      description: "Your personal information is encrypted and securely stored",
      icon: Lock,
      isEnabled: true,
    },
  ]

  return (
    <>
      <CardHeader className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-immortal-500 to-ascender-500 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Security Settings</CardTitle>
            <CardDescription className="text-neutral-400">
              Configure security settings to protect your account
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-lg border border-neutral-700 p-4 bg-neutral-800/50">
            <div className="space-y-0.5">
              <Label htmlFor="security-notifications" className="text-white">
                Login Notifications
              </Label>
              <div className="text-sm text-neutral-400">
                Receive email notifications when your account is accessed from a new device or location
              </div>
            </div>
            <Switch
              id="security-notifications"
              checked={formData.securityNotificationsEnabled}
              onCheckedChange={handleSecurityNotificationsChange}
              className="data-[state=checked]:bg-immortal-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Security Features</h3>

            <div className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-neutral-700 p-3 bg-neutral-800/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-neutral-700 p-1.5 rounded-md">
                      <feature.icon className="h-4 w-4 text-neutral-300" />
                    </div>
                    <div>
                      <Label htmlFor={`feature-${feature.id}`} className="text-white">
                        {feature.label}
                      </Label>
                      <p className="text-xs text-neutral-400">{feature.description}</p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full ${feature.isEnabled ? "bg-green-900/30 text-green-400" : "bg-neutral-700 text-neutral-400"}`}
                  >
                    {feature.isEnabled ? "Enabled" : "Disabled"}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-neutral-800/50 p-4 border border-neutral-700/50">
            <p className="text-sm text-neutral-400">
              We recommend keeping security notifications enabled for the best protection of your account.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

