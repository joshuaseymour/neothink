"use client"

import { useEffect, useState } from "react"
import { Rocket, Brain, HeartPulse, CheckCircle2, User, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: string
  program?: string
  description: string
  created_at: string
}

interface ActivityFeedProps {
  userId: string
}

export function ActivityFeed({ userId }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this from your database
    // For now, let's create some mock data
    const mockActivities: Activity[] = [
      {
        id: "1",
        type: "completion",
        program: "ascender",
        description: "Completed Prosperity Module 1",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: "2",
        type: "enrollment",
        program: "neothinker",
        description: "Started Emotional Intelligence Course",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: "3",
        type: "profile",
        description: "Updated profile information",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      },
      {
        id: "4",
        type: "event",
        program: "immortal",
        description: "Registered for Health Optimization Webinar",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      },
      {
        id: "5",
        type: "achievement",
        description: 'Earned "Fast Starter" badge',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      },
    ]

    setActivities(mockActivities)
    setLoading(false)
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse w-8 h-8 rounded-full bg-neutral-800"></div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-neutral-800 rounded-lg">
        <p className="text-neutral-500">No activity recorded yet</p>
      </div>
    )
  }

  const getActivityIcon = (activity: Activity) => {
    if (activity.program === "ascender") return Rocket
    if (activity.program === "neothinker") return Brain
    if (activity.program === "immortal") return HeartPulse
    if (activity.type === "achievement") return CheckCircle2
    if (activity.type === "profile") return User
    if (activity.type === "event") return Calendar
    return CheckCircle2
  }

  const getIconColor = (activity: Activity) => {
    if (activity.program === "ascender") return "text-ascender-500"
    if (activity.program === "neothinker") return "text-neothinker-500"
    if (activity.program === "immortal") return "text-immortal-500"
    return "text-neutral-400"
  }

  const getBackgroundColor = (activity: Activity) => {
    if (activity.program === "ascender") return "bg-ascender-500/10"
    if (activity.program === "neothinker") return "bg-neothinker-500/10"
    if (activity.program === "immortal") return "bg-immortal-500/10"
    return "bg-neutral-800"
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)

    // Get time difference in milliseconds
    const diff = Date.now() - date.getTime()

    // Convert to days/hours/minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 -mr-2">
      {activities.map((activity) => {
        const Icon = getActivityIcon(activity)

        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={cn("p-2 rounded-md", getBackgroundColor(activity))}>
              <Icon className={cn("h-4 w-4", getIconColor(activity))} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-300 mb-1">{activity.description}</p>
              <p className="text-xs text-neutral-500">{formatTimestamp(activity.created_at)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

