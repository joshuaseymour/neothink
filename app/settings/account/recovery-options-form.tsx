"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { handleError } from "@/lib/utils"
import type { BasicUserInfo } from "@/types"

const formSchema = z.object({
  recoveryEmail: z.string().email({ message: "Please enter a valid email address" }),
})

interface RecoveryOptionsFormProps {
  user: BasicUserInfo
  recoveryEmail: string | null
}

export function RecoveryOptionsForm({ user, recoveryEmail }: RecoveryOptionsFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recoveryEmail: recoveryEmail || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Update user metadata with recovery email
      const { error: updateError } = await supabase.auth.updateUser({
        data: { recovery_email: values.recoveryEmail },
      })

      if (updateError) {
        throw updateError
      }

      toast({
        title: "Recovery Email Updated",
        description: "Your account recovery email has been updated successfully.",
        variant: "success",
      })
    } catch (error) {
      setError(handleError(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Backup Email</h3>
        <p className="text-sm text-muted-foreground">
          Add a backup email address that can be used to recover your account.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="recoveryEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recovery Email</FormLabel>
                  <FormControl>
                    <Input placeholder="recovery-email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Recovery Email"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

