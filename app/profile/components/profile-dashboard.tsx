"use client"

import { useState } from "react"
import { ProfileSidebar } from "./profile-sidebar"
import { ProfileOverview } from "./profile-overview"
import { ProfileEdit } from "./profile-edit"
import { ProfilePreferences } from "./profile-preferences"
import { ProfileSecurity } from "./profile-security"
import { ProfileAnalytics } from "./profile-analytics"
import type { User } from "@supabase/supabase-js"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import type { Profile } from "@/types"

interface ProfileDashboardProps {
  user: User
  profile: Profile
  userSubscriptions: string[]
}

export function ProfileDashboard({ user, profile, userSubscriptions }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProfileSidebar
            user={user}
            profile={profile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userSubscriptions={userSubscriptions}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="m-0">
              <ProfileOverview user={user} profile={profile} userSubscriptions={userSubscriptions} />
            </TabsContent>
            <TabsContent value="edit" className="m-0">
              <ProfileEdit user={user} profile={profile} />
            </TabsContent>
            <TabsContent value="preferences" className="m-0">
              <ProfilePreferences user={user} profile={profile} />
            </TabsContent>
            <TabsContent value="security" className="m-0">
              <ProfileSecurity user={user} />
            </TabsContent>
            <TabsContent value="analytics" className="m-0">
              <ProfileAnalytics user={user} userSubscriptions={userSubscriptions} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

