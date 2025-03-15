"use client"

import Link from "next/link"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeatureCard } from "@/components/sections/FeatureCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Brain, HeartPulse, Zap, Target, Users, ArrowRight, CheckCircle2 } from "lucide-react"

const PROGRAMS = [
  {
    id: "ascender",
    title: "Ascender",
    description: "Financial abundance and wealth creation strategies",
    icon: Rocket,
    variant: "ascender" as const,
    badgeText: "Prosperity",
    benefits: [
      "Wealth building strategies",
      "Investment mastery",
      "Financial freedom",
    ],
  },
  {
    id: "neothinker",
    title: "Neothinker",
    description: "Emotional well-being and fulfillment practices",
    icon: Brain,
    variant: "neothinker" as const,
    badgeText: "Happiness",
    benefits: [
      "Emotional intelligence",
      "Stress management",
      "Life satisfaction",
    ],
  },
  {
    id: "immortal",
    title: "Immortal",
    description: "Health optimization and lifespan extension",
    icon: HeartPulse,
    variant: "immortal" as const,
    badgeText: "Longevity",
    benefits: [
      "Health optimization",
      "Longevity protocols",
      "Peak performance",
    ],
  },
] as const

const FEATURES = [
  {
    id: "rapid-results",
    title: "Rapid Results",
    description: "See meaningful progress in your first 30 days with our proven methods.",
    icon: Zap,
  },
  {
    id: "personalized-path",
    title: "Personalized Path",
    description: "Custom strategies tailored to your unique goals and circumstances.",
    icon: Target,
  },
  {
    id: "community-support",
    title: "Community Support",
    description: "Connect with like-minded individuals on the same journey to excellence.",
    icon: Users,
  },
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      {/* Programs Section */}
      <section className="py-24 bg-gradient-to-b from-background via-background to-muted/30" id="programs">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Transform Your Life
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the program that aligns with your goals and start your journey to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map((program) => (
              <Card key={program.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                      {program.badgeText}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <program.icon className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <ul className="space-y-3 mb-6">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/programs/${program.id}`}>
                    <Button className="w-full group-hover:bg-primary/90">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Why Choose Neothink+
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the powerful features that make Neothink+ the ultimate platform for personal transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of individuals who have already experienced the Neothink+ difference.
              Start your journey to excellence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="min-w-[200px] h-12 text-lg">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] h-12 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  )
}
