"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"
import { Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  role: z.enum(["user", "admin"]),
})

interface UserRoleFormProps {
  userId: string
  currentRole: string
}

export function UserRoleForm({ userId, currentRole }: UserRoleFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: (currentRole as "user" | "admin") || "user",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Check if role record exists
      const { data: existingRole } = await supabase.from("user_roles").select("*").eq("id", userId).single()

      if (existingRole) {
        // Update role
        const { error } = await supabase
          .from("user_roles")
          .update({
            role: values.role,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)

        if (error) throw error
      } else {
        // Insert role
        const { error } = await supabase.from("user_roles").insert({
          id: userId,
          role: values.role,
        })

        if (error) throw error
      }

      toast({
        title: "Role updated",
        description: `User role has been updated to ${values.role}.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update role",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {form.watch("role") === "admin" && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: Assigning admin role will give this user full access to all administrative functions.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Controls the user's access level in the system</FormDescription>
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
            "Update Role"
          )}
        </Button>
      </form>
    </Form>
  )
}

