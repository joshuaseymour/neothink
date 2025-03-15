"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, CheckCircle2, Brain, Rocket, HeartPulse, Target } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
              <Star className="h-4 w-4 mr-2" />
              <span>Trusted by 10,000+ users worldwide</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-[1.1]">
                Transform Your Life with Neothink+
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Unlock your full potential in wealth, happiness, and health with our scientifically-proven programs.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto h-12 text-lg px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#programs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-lg px-8">
                  View Programs
                </Button>
              </Link>
            </div>
            <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-ascender-500" />
                <span className="text-sm">Proven Methods</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-ascender-500" />
                <span className="text-sm">Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-ascender-500" />
                <span className="text-sm">Guaranteed Results</span>
              </div>
            </div>
          </div>

          {/* Right side - Features Grid */}
          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl">
              <div className="absolute inset-0 bg-grid-black/5" />
            </div>
            <div className="relative h-full p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-white p-4 shadow-lg">
                    <div className="h-full rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Rocket className="w-12 h-12 text-ascender-600" />
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-white p-4 shadow-lg">
                    <div className="h-full rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                      <HeartPulse className="w-12 h-12 text-immortal-600" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="aspect-square rounded-2xl bg-white p-4 shadow-lg">
                    <div className="h-full rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-neothinker-600" />
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-white p-4 shadow-lg">
                    <div className="h-full rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Target className="w-12 h-12 text-ascender-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </section>
  )
}
