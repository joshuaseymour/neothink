"use client"

import { ProfileView } from "./profile-view"
// Add the debug component import
import { DebugAuth } from "./debug-auth"

interface ProfileContentProps {
  user: {
    id: string
    email: string | undefined
    full_name: string
    avatar_url: string | null
    bio: string
    website: string
    location: string
    created_at: string
    updated_at: string | null
    email_confirmed_at: string | null
  }
}

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <>
      <ProfileView user={user} />
      {/* Add the debug component - remove this in production */}
      <DebugAuth />
    </>
  )
}

