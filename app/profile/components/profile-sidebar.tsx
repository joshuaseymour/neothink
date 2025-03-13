"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { User, Profile } from "@/types"
import { UserIcon, Edit3, Settings, Shield, LineChart, Rocket, Brain, HeartPulse } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProfileSidebarProps {
  user: User
  profile: Profile
  activeTab: string
  setActiveTab: (tab: string) => void
  userSubscriptions: string[]
}

export function ProfileSidebar({ user, profile, activeTab, setActiveTab, userSubscriptions }: ProfileSidebarProps) {
  // Get initials for avatar fallback
  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || "U"

  const menuItems = [
    { id: "overview", label: "Overview", icon: UserIcon },
    { id: "edit", label: "Edit Profile", icon: Edit3 },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "analytics", label: "Analytics", icon: LineChart },
  ]

  return (
    <Card className="border-neutral-800 bg-neutral-900/50 p-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-white mb-1">{profile?.full_name || user.email?.split("@")[0]}</h2>
        <p className="text-sm text-neutral-400 mb-3">{user.email}</p>

        {userSubscriptions.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {userSubscriptions.includes("ascender") && <Badge variant="ascender">Ascender</Badge>}
            {userSubscriptions.includes("neothinker") && <Badge variant="neothinker">Neothinker</Badge>}
            {userSubscriptions.includes("immortal") && <Badge variant="immortal">Immortal</Badge>}
          </div>
        )}
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn("w-full justify-start", activeTab === item.id ? "bg-neutral-800" : "")}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>

      {userSubscriptions.length === 0 && (
        <Card className="mt-6 border-neutral-800 bg-neutral-950 p-4">
          <p className="text-sm text-neutral-400 mb-3">Unlock premium features by joining one of our programs.</p>
          <div className="space-y-2">
            <Button variant="ascender" size="sm" className="w-full justify-start">
              <Rocket className="mr-2 h-4 w-4" />
              Ascender
            </Button>
            <Button variant="neothinker" size="sm" className="w-full justify-start">
              <Brain className="mr-2 h-4 w-4" />
              Neothinker
            </Button>
            <Button variant="immortal" size="sm" className="w-full justify-start">
              <HeartPulse className="mr-2 h-4 w-4" />
              Immortal
            </Button>
          </div>
        </Card>
      )}

      <div className="mt-6 pt-6 border-t border-neutral-800">
        <p className="text-xs text-neutral-500 text-center">
          Member since: {new Date(user.created_at || profile?.created_at).toLocaleDateString()}
        </p>
      </div>
    </Card>
  )
}

