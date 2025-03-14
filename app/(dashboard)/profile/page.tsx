"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputWrapper } from "@/components/ui/input-wrapper"
import { ButtonWrapper } from "@/components/ui/button-wrapper"
import { FormWrapper } from "@/components/ui/form-wrapper"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()
  const supabase = createClient()

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("fullName") as string
    const bio = formData.get("bio") as string

    try {
      setIsLoading(true)
      setError("")

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio: bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Update your personal information and preferences
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FormWrapper
            onSubmit={handleUpdateProfile}
            error={error}
            isLoading={isLoading}
          >
            <InputWrapper
              label="Email"
              type="email"
              value={user?.email || ""}
              disabled
              id="email"
            />
            <InputWrapper
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              id="fullName"
            />
            <InputWrapper
              label="Bio"
              name="bio"
              placeholder="Tell us about yourself"
              id="bio"
              component="textarea"
            />
            <ButtonWrapper
              type="submit"
              isLoading={isLoading}
              loadingText="Updating..."
              className="w-full"
            >
              Update Profile
            </ButtonWrapper>
          </FormWrapper>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Program Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates about your enrolled programs
                </p>
              </div>
              <ButtonWrapper variant="outline">
                Manage
              </ButtonWrapper>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Community Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about community events and discussions
                </p>
              </div>
              <ButtonWrapper variant="outline">
                Manage
              </ButtonWrapper>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent>
          <ButtonWrapper
            variant="outline"
            className="w-full"
            onClick={() => {
              toast({
                title: "Coming soon",
                description: "Password change functionality will be available soon.",
              })
            }}
          >
            Change Password
          </ButtonWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
