"use client"

import { User } from "@supabase/supabase-js"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { createServerActionClient } from "@/lib/supabase/server"
import { Rocket, Brain, HeartPulse } from "lucide-react"

export function WelcomeView({ user }: { user: User }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function completeOnboarding() {
    setLoading(true)
    try {
      const supabase = createServerActionClient()
      await supabase.from("profiles").update({ onboarding_completed: true }).eq("id", user.id)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to <GradientText>Neothink+</GradientText>
          </h1>
          <p className="text-xl text-neutral-400">Your journey to transformation begins here</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-ascender-500" />
                Financial Prosperity
              </CardTitle>
              <CardDescription>
                Learn powerful strategies to create sustainable wealth and achieve financial freedom
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-neothinker-500" />
                Emotional Wellbeing
              </CardTitle>
              <CardDescription>
                Master evidence-based techniques to enhance your emotional intelligence and find lasting fulfillment
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-immortal-500" />
                Health Optimization
              </CardTitle>
              <CardDescription>
                Access cutting-edge protocols to optimize your health and potentially extend your lifespan
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Complete these steps to get started with Neothink+</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium">Complete Your Profile</h3>
                <p className="text-sm text-neutral-400">Add your details and preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium">Choose Your Programs</h3>
                <p className="text-sm text-neutral-400">Select the programs that align with your goals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h3 className="font-medium">Join the Community</h3>
                <p className="text-sm text-neutral-400">Connect with like-minded individuals</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={completeOnboarding}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Getting Started..." : "Get Started"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
