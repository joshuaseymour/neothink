'use client'

import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Database } from "@/types/supabase"

type Event = Database["public"]["Tables"]["events"]["Row"]

interface UpcomingEventsProps {
  events: {
    id: string
    title: string
    date: string
    program: Event["program"]
  }[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-neutral-400 text-sm">No upcoming events</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-3">
          <div
            className={cn(
              "p-1.5 rounded-md",
              event.program === "ascender"
                ? "bg-ascender-900/20"
                : event.program === "neothinker"
                  ? "bg-neothinker-900/20"
                  : "bg-immortal-900/20",
            )}
          >
            <Calendar
              className={cn(
                "h-4 w-4",
                event.program === "ascender"
                  ? "text-ascender-500"
                  : event.program === "neothinker"
                    ? "text-neothinker-500"
                    : "text-immortal-500",
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-50">{event.title}</p>
            <p className="text-xs text-neutral-400">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
