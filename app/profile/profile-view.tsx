"use client"

import { ProfileHeader } from "./profile-header"
import { ProfileForm } from "./profile-form"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileViewProps {
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

export function ProfileView({ user }: ProfileViewProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  // If edit mode is active, show the profile form
  if (tab === "edit") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Otherwise show the profile overview
  return (
    <div>
      <ProfileHeader user={user} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About</h2>
          <p>{user.bio || "No bio provided yet."}</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Details</h2>
          <dl className="space-y-2">
            {user.website && (
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Website</dt>
                <dd>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website}
                  </a>
                </dd>
              </div>
            )}
            {user.location && (
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Location</dt>
                <dd>{user.location}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Joined</dt>
              <dd>{new Date(user.created_at).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

