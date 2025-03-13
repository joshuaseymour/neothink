"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

interface ProfileHeaderProps {
  user: {
    full_name: string
    email: string | undefined
    avatar_url: string | null
    bio: string
    location: string
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  // Get initials for avatar fallback
  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || "U"

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || "User"} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{user.full_name || "User"}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        {user.bio && <p className="mt-2">{user.bio}</p>}
        {user.location && <p className="text-sm text-muted-foreground mt-1">{user.location}</p>}
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href="/profile?tab=edit">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Link>
      </Button>
    </div>
  )
}

