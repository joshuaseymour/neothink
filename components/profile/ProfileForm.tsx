"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/types"

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: User
  profile: Profile
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      bio: profile.bio || "",
      avatar_url: profile.avatar_url || "",
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true)
      setToast(null)

      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setToast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        type: "success"
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      setToast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-neothinker-200 bg-white">
      <div className="border-b border-neothinker-200 p-6">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium leading-none">
              Full Name
            </label>
            <input
              id="full_name"
              className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("full_name")}
              disabled={isLoading}
            />
            {errors.full_name && (
              <p className="text-sm text-red-500">{errors.full_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium leading-none">
              Bio
            </label>
            <textarea
              id="bio"
              className="flex min-h-[80px] w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("bio")}
              disabled={isLoading}
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="avatar_url" className="text-sm font-medium leading-none">
              Avatar URL
            </label>
            <input
              id="avatar_url"
              type="url"
              className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("avatar_url")}
              disabled={isLoading}
            />
            {errors.avatar_url && (
              <p className="text-sm text-red-500">{errors.avatar_url.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>

          {toast && (
            <div className={`rounded-lg border p-4 ${
              toast.type === "error" 
                ? "border-red-200 bg-red-50 text-red-900"
                : "border-green-200 bg-green-50 text-green-900"
            }`}>
              <p className="text-sm font-medium">{toast.title}</p>
              <p className="text-sm mt-1">{toast.description}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
