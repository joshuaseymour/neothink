"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
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
    <Card className="container p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <TabsList className="flex flex-col w-full space-y-1 h-auto">
            <TabsTrigger
              value="overview"
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="w-full justify-start"
              onClick={() => setActiveTab("edit")}
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="w-full justify-start"
              onClick={() => setActiveTab("security")}
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="m-0">
              <ProfileOverview user={user} profile={profile} userSubscriptions={userSubscriptions} />
            </TabsContent>
            <TabsContent value="edit" className="m-0">
              <ProfileForm user={user} profile={profile} />
            </TabsContent>
            <TabsContent value="security" className="m-0">
              <ProfileSecurity user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  )
}
