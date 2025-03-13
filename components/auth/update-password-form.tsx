"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { PasswordStrength, PasswordInput, PasswordFormStatus } from "./password"
import { useMutation } from "@tanstack/react-query"

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

export function UpdatePasswordForm() {
  const [passwordStrength, setPasswordStrength] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Watch password to calculate strength
  const password = form.watch("password")

  // Calculate password strength
  const calculatePasswordStrength = React.useCallback((value: string) => {
    if (!value) return 0

    let strength = 0
    if (value.length >= 8) strength += 20
    if (/[A-Z]/.test(value)) strength += 20
    if (/[a-z]/.test(value)) strength += 20
    if (/[0-9]/.test(value)) strength += 20
    if (/[^A-Za-z0-9]/.test(value)) strength += 20

    return strength
  }, [])

  // Update password strength when password changes
  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password))
  }, [password, calculatePasswordStrength])

  // Check if we have a hash in the URL (password reset flow)
  React.useEffect(() => {
    const checkHash = async () => {
      try {
        const supabase = createClient()
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !data.session) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          if (!hashParams.has("access_token") && !hashParams.has("type")) {
            setError("Invalid or expired password reset link. Please request a new one.")
          }
        }
      } catch (err) {
        console.error("Error checking session:", err)
        setError("An error occurred. Please try again or request a new reset link.")
      }
    }

    void checkHash()
  }, [])

  // Update password mutation
  const updatePassword = useMutation({
    mutationFn: async (data: FormData) => {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })
      if (error) throw error
    },
    onSuccess: () => {
      setSuccess(true)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to update password. Please try again.")
    },
  })

  // Handle form submission
  const onSubmit = React.useCallback((data: FormData) => {
    setError(null)
    updatePassword.mutate(data)
  }, [updatePassword])

  if (success || error) {
    return (
      <PasswordFormStatus 
        type={success ? "success" : "error"} 
        message={error || undefined} 
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <PasswordInput
            form={form}
            name="password"
            label="New Password"
            disabled={updatePassword.isPending}
          />
          <PasswordStrength 
            strength={passwordStrength} 
            password={password}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PasswordInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            disabled={updatePassword.isPending}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            type="submit"
            className="w-full"
            variant="default"
            disabled={updatePassword.isPending}
          >
            {updatePassword.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {updatePassword.isPending ? "Updating Password..." : "Update Password"}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
