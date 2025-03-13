"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, MapPin, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
      <CardHeader className="pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-ascender-500 to-neothinker-500 p-2 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">Tell us about yourself</CardTitle>
            <CardDescription className="text-neutral-400">
              This information helps us personalize your experience
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-white">Full Name</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <User className="h-4 w-4 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80 text-sm">
                            Your name will be displayed on your profile and in community interactions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500"
                    />
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
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-white">Bio</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <FileText className="h-4 w-4 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80 text-sm">
                            Share a bit about yourself, your interests, and what you hope to achieve.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about yourself"
                      className="resize-none min-h-[100px] bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-neutral-500">
                    A brief description about yourself that will be visible on your profile
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
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-white">Location</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <MapPin className="h-4 w-4 text-neutral-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80 text-sm">
                            Your location helps us connect you with local events and community members.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      {...field}
                      className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500"
                    />
                  </FormControl>
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

