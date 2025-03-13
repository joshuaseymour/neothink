"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { LoadingState } from "@/components/loading-state"
import { motion } from "framer-motion"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type PasswordResetFormValues = z.infer<typeof formSchema>

export function PasswordResetForm() {
  const { resetPassword, isResettingPassword, resetPasswordError } = useAuth()
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast: showToast } = toast()

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: PasswordResetFormValues) {
    try {
      await resetPassword({
        email: values.email,
        redirectUrl: `${window.location.origin}/auth/update-password`,
      })

      setIsSuccess(true)
      showToast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error) {
      console.error("Password reset error:", error)
      showToast({
        title: "Password reset failed",
        description: resetPasswordError?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-green-500/10 p-4 text-sm text-green-500"
          >
            Password reset email sent. Please check your inbox.
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="name@example.com"
                      className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500"
                      disabled={isResettingPassword || isSuccess}
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            type="submit"
            className="w-full bg-neothinker-500 hover:bg-neothinker-600"
            disabled={isResettingPassword || isSuccess}
          >
            {isResettingPassword ? (
              <LoadingState size="sm" className="mx-auto" text="Sending reset link..." />
            ) : isSuccess ? (
              "Email Sent"
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
