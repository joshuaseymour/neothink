"use client"

import { HeroSection } from "@/components/sections/HeroSection"
import { FeatureCard } from "@/components/sections/FeatureCard"
import { Button } from "@/components/ui/button"
import { Rocket, Brain, HeartPulse, Zap, Target, Users } from "lucide-react"

const PROGRAMS = [
  {
    id: "ascender",
    title: "Ascender",
    description: "Financial abundance and wealth creation strategies",
    icon: Rocket,
    variant: "ascender" as const,
    badgeText: "Prosperity",
  },
  {
    id: "neothinker",
    title: "Neothinker",
    description: "Emotional well-being and fulfillment practices",
    icon: Brain,
    variant: "neothinker" as const,
    badgeText: "Happiness",
  },
  {
    id: "immortal",
    title: "Immortal",
    description: "Health optimization and lifespan extension",
    icon: HeartPulse,
    variant: "immortal" as const,
    badgeText: "Longevity",
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
      <section className="py-16" id="programs">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the program that aligns with your goals and start your journey to a better life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map((program) => (
              <FeatureCard key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make Neothink+ the ultimate platform for personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of individuals who have already experienced the Neothink+ difference.
          </p>
          <Button size="lg" className="min-w-[200px]">
            Get Started Now
          </Button>
        </div>
      </section>
    </main>
  )
}
