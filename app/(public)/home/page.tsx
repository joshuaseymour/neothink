import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Rocket, Brain, HeartPulse, Zap, Target, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Neothink+ | Transform Your Life",
  description: "Join Neothink+ and unlock your full potential with our transformative programs for prosperity, happiness, and longevity.",
}

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
    color: "text-ascender-500",
  },
  {
    id: "personalized-path",
    title: "Personalized Path",
    description: "Custom strategies tailored to your unique goals and circumstances.",
    icon: Target,
    color: "text-neothinker-500",
  },
  {
    id: "community-support",
    title: "Community Support",
    description: "Connect with like-minded individuals on the same journey to excellence.",
    icon: Users,
    color: "text-immortal-500",
  },
] as const

const TESTIMONIALS = [
  {
    id: "john-doe",
    quote: "The Ascender program completely transformed my financial situation. I've doubled my income in just 6 months!",
    author: "John Doe",
    role: "Ascender Member",
    initials: "JD",
    variant: "ascender" as const,
  },
  {
    id: "jane-smith",
    quote: "I've never felt more fulfilled and at peace. The Neothinker program gave me the tools to find true happiness.",
    author: "Jane Smith",
    role: "Neothinker Member",
    initials: "JS",
    variant: "neothinker" as const,
  },
  {
    id: "robert-johnson",
    quote: "At 65, I have the energy and vitality of someone half my age. The Immortal program is truly life-changing.",
    author: "Robert Johnson",
    role: "Immortal Member",
    initials: "RJ",
    variant: "immortal" as const,
  },
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 font-inter">
      <Header />

      <HeroSection />

      {/* Programs Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-50">Our Programs</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
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
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-50">Key Features</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Discover the powerful features that make Neothink+ the ultimate platform for personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2 text-neutral-50">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-900 to-neutral-950">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-neutral-50">Ready to Transform Your Life?</h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            Join thousands of individuals who have already experienced the Neothink+ difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="brand" size="lg" className="min-w-[200px]">
              Join Neothink+
            </Button>
            <div className="flex flex-col sm:flex-row gap-4">
              {PROGRAMS.map((program) => (
                <Button key={program.id} variant={program.variant} size="lg">
                  {program.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-50">Success Stories</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Hear from our members who have experienced remarkable transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className={`bg-neutral-900 p-6 rounded-lg border border-${testimonial.variant}-500`}>
                <p className="text-neutral-300 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-${testimonial.variant}-500 flex items-center justify-center text-white font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-50 font-medium">{testimonial.author}</p>
                    <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
