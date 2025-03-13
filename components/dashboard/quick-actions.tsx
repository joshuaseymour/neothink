'use client'

import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, BookOpen, Users } from "lucide-react"

interface QuickActionsProps {
  userSubscriptions: string[]
}

export function QuickActions({ userSubscriptions }: QuickActionsProps) {
  // Determine which quick actions to show based on subscriptions
  const hasAnySubscription = userSubscriptions.length > 0

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" className="w-full justify-start">
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Call
      </Button>

      <Button variant="outline" size="sm" className="w-full justify-start">
        <MessageSquare className="mr-2 h-4 w-4" />
        Contact Support
      </Button>

      {hasAnySubscription && (
        <>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Access Resources
          </Button>

          <Button variant="outline" size="sm" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Join Community
          </Button>
        </>
      )}

      {!hasAnySubscription && (
        <Button variant="brand" size="sm" className="w-full mt-4">
          Unlock Programs
        </Button>
      )}
    </div>
  )
}

