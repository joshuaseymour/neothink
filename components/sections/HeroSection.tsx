"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="container relative z-10">
        <div className="animate-fade-in text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Transform Your Life with Neothink+
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Unlock your full potential in wealth, happiness, and health with our innovative programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="min-w-[200px]">
                Get Started
              </Button>
            </Link>
            <Link href="/#programs">
              <Button size="lg" variant="outline">
                View Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </section>
  )
}
