'use client'

import { cn } from "@/lib/utils"
import { Database } from "@/types/supabase"

type Activity = Database["public"]["Tables"]["user_activity"]["Row"]

interface RecentActivityProps {
  activities: {
    id: string
    title: string
    timestamp: string
    program: Activity["program"]
  }[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-neutral-400 text-sm">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div
            className={cn(
              "w-2 h-2 rounded-full mt-2",
              activity.program === "ascender"
                ? "bg-ascender-500"
                : activity.program === "neothinker"
                  ? "bg-neothinker-500"
                  : "bg-immortal-500",
            )}
          />
          <div>
            <p className="text-sm font-medium text-neutral-50">{activity.title}</p>
            <p className="text-xs text-neutral-400">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
