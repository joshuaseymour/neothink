"use client"

import { User } from "@supabase/supabase-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Profile } from "@/types"

interface ProfileOverviewProps {
  user: User
  profile: Profile
  userSubscriptions: string[]
}

export function ProfileOverview({ user, profile, userSubscriptions }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Personal Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>{profile.full_name || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bio</span>
                <span>{profile.bio || "Not set"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Program Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userSubscriptions.length > 0 ? (
            userSubscriptions.map((program) => (
              <div key={program} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{program}</span>
                  <span>25%</span>
                </div>
                <Progress value={25} />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No active programs. Explore our programs to get started on your journey.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
