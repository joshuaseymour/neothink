"use client"

import { User } from "@supabase/supabase-js"
import type { Profile } from "@/types"

interface ProfileOverviewProps {
  user: User
  profile: Profile
  userSubscriptions: string[]
}

export function ProfileOverview({ user, profile, userSubscriptions }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="rounded-lg border border-neothinker-200 bg-white">
        <div className="border-b border-neothinker-200 p-6">
          <h2 className="text-xl font-semibold">Profile Overview</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Personal Information</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Name</span>
                <span>{profile.full_name || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Bio</span>
                <span>{profile.bio || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Progress */}
      <div className="rounded-lg border border-neothinker-200 bg-white">
        <div className="border-b border-neothinker-200 p-6">
          <h2 className="text-xl font-semibold">Program Progress</h2>
        </div>
        <div className="p-6 space-y-4">
          {userSubscriptions.length > 0 ? (
            userSubscriptions.map((program) => (
              <div key={program} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{program}</span>
                  <span>25%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neothinker-500 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: "25%" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">
              No active programs. Explore our programs to get started on your journey.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
