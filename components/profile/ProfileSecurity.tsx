"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

interface ProfileSecurityProps {
  user: User
}

export function ProfileSecurity({ user }: ProfileSecurityProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ title: string; description: string; type?: 'success' | 'error' } | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setIsLoading(true)
      setToast(null)

      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: data.currentPassword,
      })

      if (signInError) {
        setToast({
          title: "Error",
          description: "Current password is incorrect",
          type: "error"
        })
        return
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (updateError) throw updateError

      setToast({
        title: "Success",
        description: "Your password has been updated successfully.",
        type: "success"
      })
      reset()
    } catch (error) {
      console.error("Error updating password:", error)
      setToast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-neothinker-200 bg-white">
      <div className="border-b border-neothinker-200 p-6">
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium leading-none">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("currentPassword")}
              disabled={isLoading}
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium leading-none">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("newPassword")}
              disabled={isLoading}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="flex h-10 w-full rounded-md border border-neothinker-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
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
