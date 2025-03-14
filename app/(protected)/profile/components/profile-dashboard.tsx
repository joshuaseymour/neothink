import { User } from "@supabase/supabase-js"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

interface ProfileDashboardProps {
  user: User
  profile: any
  userSubscriptions: string[]
}

export function ProfileDashboard({ user, profile, userSubscriptions }: ProfileDashboardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [isSaving, setIsSaving] = useState(false)
  
  const supabase = createClient()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio: bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback>{fullName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{fullName || "Anonymous"}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {userSubscriptions.length > 0 && (
                <div className="w-full pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Active Subscriptions</h3>
                  {userSubscriptions.map((tier) => (
                    <div
                      key={tier}
                      className="text-sm py-1 px-2 bg-primary/10 rounded-md text-center mb-2"
                    >
                      {tier}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled type="email" />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself"
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
