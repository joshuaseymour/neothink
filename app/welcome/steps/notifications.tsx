"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Zap, Calendar, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"

interface NotificationsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function NotificationsStep({ formData, updateFormData }: NotificationsStepProps) {
  const handleNotificationsChange = (checked: boolean) => {
    updateFormData({ notificationsEnabled: checked })
  }

  const notificationTypes = [
    {
      id: "updates",
      label: "Platform Updates",
      description: "Get notified about new features and improvements",
      icon: Zap,
      defaultChecked: true,
    },
    {
      id: "events",
      label: "Events & Webinars",
      description: "Notifications about upcoming events and webinars",
      icon: Calendar,
      defaultChecked: true,
    },
    {
      id: "content",
      label: "New Content",
      description: "Be the first to know when new content is published",
      icon: BookOpen,
      defaultChecked: true,
    },
    {
      id: "community",
      label: "Community Activity",
      description: "Stay updated on discussions and community highlights",
      icon: Users,
      defaultChecked: false,
    },
  ]

  return (
    <>
      <CardHeader className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-neothinker-500 to-immortal-500 p-2 rounded-lg">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Notification Preferences</CardTitle>
            <CardDescription className="text-neutral-400">
              Choose which notifications you'd like to receive
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-lg border border-neutral-700 p-4 bg-neutral-800/50">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-white">
                Email Notifications
              </Label>
              <div className="text-sm text-neutral-400">
                Receive email notifications about account activity and updates
              </div>
            </div>
            <Switch
              id="notifications"
              checked={formData.notificationsEnabled}
              onCheckedChange={handleNotificationsChange}
              className="data-[state=checked]:bg-neothinker-500"
            />
          </div>

          {formData.notificationsEnabled && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Notification Types</h3>

              <div className="space-y-3">
                {notificationTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-lg border border-neutral-700 p-3 bg-neutral-800/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-neutral-700 p-1.5 rounded-md">
                        <type.icon className="h-4 w-4 text-neutral-300" />
                      </div>
                      <div>
                        <Label htmlFor={`notification-${type.id}`} className="text-white">
                          {type.label}
                        </Label>
                        <p className="text-xs text-neutral-400">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      id={`notification-${type.id}`}
                      defaultChecked={type.defaultChecked}
                      className="data-[state=checked]:bg-neothinker-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-md bg-neutral-800/50 p-4 border border-neutral-700/50">
            <p className="text-sm text-neutral-400">
              You can always change your notification preferences later in your account settings.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

