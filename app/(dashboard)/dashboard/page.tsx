"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { Brain, Rocket, HeartPulse } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  const programs = [
    {
      id: "ascender",
      title: "Ascender Program",
      description: "Master wealth creation and financial abundance",
      icon: Rocket,
      href: "/programs/ascender",
      progress: 35,
    },
    {
      id: "neothinker",
      title: "Neothinker Program",
      description: "Develop emotional intelligence and fulfillment",
      icon: Brain,
      href: "/programs/neothinker",
      progress: 20,
    },
    {
      id: "immortal",
      title: "Immortal Program",
      description: "Optimize health and extend lifespan",
      icon: HeartPulse,
      href: "/programs/immortal",
      progress: 15,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.email?.split("@")[0]}
        </h1>
        <p className="text-muted-foreground">
          Continue your journey to personal excellence
        </p>
      </section>

      {/* Programs Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {programs.map((program) => {
          const Icon = program.icon
          return (
            <Card key={program.id} className="relative overflow-hidden">
              <CardHeader>
                <Icon className="h-8 w-8 mb-4" />
                <CardTitle>{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>
                <div className="mb-4">
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: \`\${program.progress}%\` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {program.progress}% Complete
                  </p>
                </div>
                <Link href={program.href}>
                  <Button className="w-full">Continue Program</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-24 flex-col">
            <span className="text-lg mb-1">📚</span>
            <span>Latest Lessons</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <span className="text-lg mb-1">📊</span>
            <span>Track Progress</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <span className="text-lg mb-1">👥</span>
            <span>Community</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <span className="text-lg mb-1">❓</span>
            <span>Get Help</span>
          </Button>
        </div>
      </section>
    </div>
  )
}
