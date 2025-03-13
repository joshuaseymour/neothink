"use client"

import { User } from "@supabase/supabase-js"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { Rocket, Brain, HeartPulse, TrendingUp, Calendar } from "lucide-react"
import { Database } from "@/types/supabase"
import { DashboardHeader } from "./dashboard-header"
import { DashboardNav } from "./dashboard-nav"
import { ProgramCard } from "./program-card"
import { ProgressStats } from "./progress-stats"
import { RecentActivity } from "./recent-activity"
import { UpcomingEvents } from "./upcoming-events"
import { QuickActions } from "./quick-actions"
import { DashboardSkeleton } from "./dashboard-skeleton"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Subscription = Database["public"]["Tables"]["user_subscriptions"]["Row"]
type Activity = Database["public"]["Tables"]["user_activity"]["Row"]
type Event = Database["public"]["Tables"]["events"]["Row"]
type ProgramTier = "ascender" | "neothinker" | "immortal"

interface DashboardViewProps {
  user: User
  profile: Profile | null
  subscriptions: Subscription[] | null
  recentActivity: Activity[] | null
  upcomingEvents: Event[] | null
}

const PROGRAMS = [
  {
    id: "ascender",
    title: "Ascender",
    shortDesc: "Financial Prosperity",
    description: "Financial abundance and wealth creation strategies",
    content: "Discover powerful techniques to attract financial abundance and create sustainable wealth in your life.",
    requiredTier: "ascender" as ProgramTier,
    externalUrl: "https://www.joinascenders.org",
    icon: Rocket,
    iconColor: "text-ascender-500",
    variant: "ascender" as const,
  },
  {
    id: "neothinker",
    title: "Neothinker",
    shortDesc: "Emotional Wellbeing",
    description: "Emotional well-being and fulfillment practices",
    content: "Learn evidence-based methods to increase your happiness baseline and experience more joy daily.",
    requiredTier: "neothinker" as ProgramTier,
    externalUrl: "https://www.joinneothinkers.org",
    icon: Brain,
    iconColor: "text-neothinker-500",
    variant: "neothinker" as const,
  },
  {
    id: "immortal",
    title: "Immortal",
    shortDesc: "Health Optimization",
    description: "Health optimization and lifespan extension",
    content: "Access cutting-edge protocols to optimize your health, increase energy, and potentially extend your lifespan.",
    requiredTier: "immortal" as ProgramTier,
    externalUrl: "https://www.joinimmortals.org",
    icon: HeartPulse,
    iconColor: "text-immortal-500",
    variant: "immortal" as const,
  },
] as const

export function DashboardView() {
  const supabase = createClient()

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession()
      return data.session
    },
  })

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session!.user.id)
        .single()
      return data
    },
  })

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ["subscriptions", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", session!.user.id)
        .eq("active", true)
      return data
    },
  })

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["recent_activity", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_activity")
        .select("*")
        .eq("user_id", session!.user.id)
        .order("created_at", { ascending: false })
        .limit(5)
      return data
    },
  })

  const { data: upcomingEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["upcoming_events"],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(3)
      return data
    },
  })

  if (
    isLoadingProfile ||
    isLoadingSubscriptions ||
    isLoadingActivity ||
    isLoadingEvents
  ) {
    return <DashboardSkeleton />
  }

  // Calculate active subscriptions and progress
  const activeSubscriptionIds = subscriptions?.map((sub) => sub.tier) || []
  const completionPercentage = (activeSubscriptionIds.length / PROGRAMS.length) * 100

  // Enhance programs with subscription status
  const enhancedPrograms = PROGRAMS.map((program) => ({
    ...program,
    progress: activeSubscriptionIds.includes(program.requiredTier) ? 100 : 0,
    unlocked: activeSubscriptionIds.includes(program.requiredTier),
  }))

  // Format activity data
  const formattedActivity = recentActivity?.map((activity) => ({
    id: activity.id,
    title: activity.title,
    timestamp: activity.created_at,
    program: activity.program,
  })) || []

  // Format event data
  const formattedEvents = upcomingEvents?.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    program: event.program,
  })) || []

  return (
    <div className="min-h-screen bg-neutral-950">
      <DashboardHeader user={session!.user} profile={profile} />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <DashboardNav userSubscriptions={activeSubscriptionIds} />

            {/* Quick Actions Card */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <QuickActions userSubscriptions={activeSubscriptionIds} />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-50 mb-2">
                Welcome back, <GradientText>{profile?.full_name || session!.user.email?.split("@")[0]}</GradientText>
              </h1>
              <p className="text-neutral-400">
                Your journey to prosperity, happiness, and longevity continues. Here's your progress so far.
              </p>
            </div>

            {/* Progress Stats */}
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                  <Badge variant="brand">{activeSubscriptionIds.length}/3 Programs</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ProgressStats
                  completionPercentage={completionPercentage}
                  userSubscriptions={activeSubscriptionIds}
                />
              </CardContent>
            </Card>

            {/* Programs Grid */}
            <h2 className="text-xl font-bold text-neutral-50 mb-4">Your Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {enhancedPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {/* Activity and Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-neutral-400" />
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentActivity activities={formattedActivity} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-neutral-400" />
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <UpcomingEvents events={formattedEvents} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
