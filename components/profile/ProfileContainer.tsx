"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import type { Profile } from "@/types"
import { ProfileForm } from "./ProfileForm"
import { ProfileSecurity } from "./ProfileSecurity"
import { ProfileOverview } from "./ProfileOverview"

interface ProfileContainerProps {
  user: User
  profile: Profile
  userSubscriptions: string[]
}

export function ProfileContainer({ user, profile, userSubscriptions }: ProfileContainerProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container rounded-lg border border-neothinker-200 bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="flex flex-col w-full space-y-1">
            <button
              type="button"
              className={`flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-neothinker-100 text-neothinker-900"
                  : "hover:bg-neothinker-50 text-zinc-500"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "edit"
                  ? "bg-neothinker-100 text-neothinker-900"
                  : "hover:bg-neothinker-50 text-zinc-500"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              Edit Profile
            </button>
            <button
              type="button"
              className={`flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "security"
                  ? "bg-neothinker-100 text-neothinker-900"
                  : "hover:bg-neothinker-50 text-zinc-500"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="space-y-6">
            {activeTab === "overview" && (
              <ProfileOverview user={user} profile={profile} userSubscriptions={userSubscriptions} />
            )}
            {activeTab === "edit" && (
              <ProfileForm user={user} profile={profile} />
            )}
            {activeTab === "security" && (
              <ProfileSecurity user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
