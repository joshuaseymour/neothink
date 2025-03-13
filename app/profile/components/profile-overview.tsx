"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { User, Profile } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientText } from "@/components/ui/gradient-text"
import { MapPin, Link2, Rocket, Brain, HeartPulse, Calendar, BarChart, UserIcon } from "lucide-react"
import { ActivityFeed } from "./activity-feed"
import { ProgressChart } from "./progress-chart"

interface ProfileOverviewProps {
  user: User
  profile: Profile
  userSubscriptions: string[]
}

export function ProfileOverview({ user, profile, userSubscriptions }: ProfileOverviewProps) {
  // Create stats with mock data
  const stats = [
    { label: "Programs", value: userSubscriptions.length, icon: Rocket },
    { label: "Sessions", value: 24, icon: Calendar },
    { label: "Progress", value: "62%", icon: BarChart },
  ]

  // Calculate completeness of profile
  const requiredFields = ["full_name", "bio", "location", "website", "avatar_url"]
  const completedFields = requiredFields.filter((field) => !!profile?.[field as keyof Profile])
  const profileCompleteness = Math.round((completedFields.length / requiredFields.length) * 100)

  return (
    <div className="space-y-6">
      <Card className="border-neutral-800 bg-neutral-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-neutral-400" />
            Profile Overview
          </CardTitle>
          <CardDescription>Your personal profile information and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className="border-neutral-800 bg-neutral-950">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <stat.icon className="h-8 w-8 mb-2 text-neutral-400" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-neutral-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">About</h3>
                {profile?.bio ? (
                  <p className="text-neutral-300">{profile.bio}</p>
                ) : (
                  <p className="text-neutral-500 italic">
                    No bio provided. Add information about yourself by editing your profile.
                  </p>
                )}

                <div className="pt-2">
                  <h4 className="text-sm font-medium text-white mb-3">Details</h4>
                  <div className="space-y-2">
                    {profile?.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" />
                        <span className="text-neutral-300">{profile.location}</span>
                      </div>
                    )}
                    {profile?.website && (
                      <div className="flex items-start gap-2">
                        <Link2 className="h-4 w-4 text-neutral-400 mt-0.5" />
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-300 hover:text-neothinker-500 transition-colors"
                        >
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Card className="border-neutral-800 bg-neutral-950">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-white">Profile Completeness</h4>
                        <Badge variant={profileCompleteness === 100 ? "neothinker" : "outline"}>
                          {profileCompleteness}%
                        </Badge>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 h-2.5 rounded-full"
                          style={{ width: `${profileCompleteness}%` }}
                        ></div>
                      </div>
                      {profileCompleteness < 100 && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => (window.location.href = "/profile?tab=edit")}
                          >
                            Complete Your Profile
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Tabs defaultValue="activity">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity">
                    <ActivityFeed userId={user.id} />
                  </TabsContent>
                  <TabsContent value="progress">
                    <ProgressChart userSubscriptions={userSubscriptions} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-800 bg-neutral-900/50">
        <CardHeader className="pb-3">
          <CardTitle>Recommended Programs</CardTitle>
          <CardDescription>Based on your profile and activity, we recommend these programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {!userSubscriptions.includes("ascender") && (
              <Card className="border-ascender-500/50 hover:border-ascender-500 transition-colors">
                <CardContent className="p-4">
                  <Rocket className="h-8 w-8 text-ascender-500 mb-2" />
                  <h3 className="font-bold text-white mb-1">Ascender</h3>
                  <p className="text-neutral-400 text-sm mb-3">Financial abundance and wealth creation strategies</p>
                  <Button variant="ascender" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )}

            {!userSubscriptions.includes("neothinker") && (
              <Card className="border-neothinker-500/50 hover:border-neothinker-500 transition-colors">
                <CardContent className="p-4">
                  <Brain className="h-8 w-8 text-neothinker-500 mb-2" />
                  <h3 className="font-bold text-white mb-1">Neothinker</h3>
                  <p className="text-neutral-400 text-sm mb-3">Emotional well-being and fulfillment practices</p>
                  <Button variant="neothinker" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )}

            {!userSubscriptions.includes("immortal") && (
              <Card className="border-immortal-500/50 hover:border-immortal-500 transition-colors">
                <CardContent className="p-4">
                  <HeartPulse className="h-8 w-8 text-immortal-500 mb-2" />
                  <h3 className="font-bold text-white mb-1">Immortal</h3>
                  <p className="text-neutral-400 text-sm mb-3">Health optimization and lifespan extension</p>
                  <Button variant="immortal" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* If all programs are subscribed, show a special message */}
            {userSubscriptions.length === 3 && (
              <Card className="col-span-3 border-neutral-800 bg-neutral-950">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2">
                    <GradientText>Congratulations!</GradientText>
                  </h3>
                  <p className="text-neutral-300">
                    You've unlocked all our core programs. Explore your dashboard for exclusive content.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

