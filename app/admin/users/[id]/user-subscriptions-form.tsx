"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  tiers: z.array(z.string()).min(0),
})

interface UserSubscriptionsFormProps {
  userId: string
  subscriptions: any[]
}

export function UserSubscriptionsForm({ userId, subscriptions }: UserSubscriptionsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Get active subscription tiers
  const activeTiers = subscriptions.filter((sub) => sub.active).map((sub) => sub.tier)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tiers: activeTiers,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Get current active tiers
      const currentTiers = new Set(activeTiers)
      const newTiers = new Set(values.tiers)

      // Tiers to deactivate (in current but not in new)
      const tiersToDeactivate = [...currentTiers].filter((tier) => !newTiers.has(tier))

      // Tiers to activate (in new but not in current)
      const tiersToActivate = [...newTiers].filter((tier) => !currentTiers.has(tier))

      // Deactivate tiers
      if (tiersToDeactivate.length > 0) {
        const { error: deactivateError } = await supabase
          .from("user_subscriptions")
          .update({
            active: false,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId)
          .in("tier", tiersToDeactivate)

        if (deactivateError) throw deactivateError
      }

      // Activate new tiers
      for (const tier of tiersToActivate) {
        // Check if the tier exists but is inactive
        const { data: existingTier } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", userId)
          .eq("tier", tier)
          .single()

        if (existingTier) {
          // Reactivate existing tier
          const { error: updateError } = await supabase
            .from("user_subscriptions")
            .update({
              active: true,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingTier.id)

          if (updateError) throw updateError
        } else {
          // Create new tier
          const { error: insertError } = await supabase.from("user_subscriptions").insert({
            user_id: userId,
            tier: tier,
            active: true,
          })

          if (insertError) throw insertError
        }
      }

      toast({
        title: "Subscriptions updated",
        description: "The user's subscription tiers have been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update subscriptions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tiers = [
    { id: "ascender", label: "Ascender" },
    { id: "neothinker", label: "Neothinker" },
    { id: "immortal", label: "Immortal" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Current Active Subscriptions</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {activeTiers.length > 0 ? (
              activeTiers.map((tier) => (
                <Badge key={tier} variant="secondary">
                  {tier}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No active subscriptions</span>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="tiers"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Subscription Tiers</FormLabel>
                <FormDescription>Select the subscription tiers to assign to this user</FormDescription>
              </div>
              <div className="space-y-4">
                {tiers.map((tier) => (
                  <FormField
                    key={tier.id}
                    control={form.control}
                    name="tiers"
                    render={({ field }) => {
                      return (
                        <FormItem key={tier.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tier.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tier.id])
                                  : field.onChange(field.value?.filter((value) => value !== tier.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{tier.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
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
            "Update Subscriptions"
          )}
        </Button>
      </form>
    </Form>
  )
}

