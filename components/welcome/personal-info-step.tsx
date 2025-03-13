"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"
import type { OnboardingFormData } from "@/types"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().optional(),
  location: z.string().optional(),
})

interface PersonalInfoStepProps {
  formData: OnboardingFormData
  updateFormData: (data: Partial<OnboardingFormData>) => void
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      bio: formData.bio || "",
      location: formData.location || "",
    },
  })

  // Update parent form data when this form changes
  const { watch, getValues } = form

  useEffect(() => {
    const subscription = watch(() => {
      updateFormData({
        fullName: getValues("fullName"),
        bio: getValues("bio"),
        location: getValues("location"),
      })
    })

    return () => subscription.unsubscribe()
  }, [watch, getValues, updateFormData])

  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>
          Tell us a bit about yourself. This information will be displayed on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a bit about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description about yourself. This will be visible on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormDescription>Where are you based? This helps connect you with local users.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </>
  )
}

