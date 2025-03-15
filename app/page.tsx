import { HeroSection } from "@/components/sections/HeroSection"
import { FeatureCard } from "@/components/sections/FeatureCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Programs Section */}
      <section className="py-24 bg-gradient-to-b from-background via-background to-muted/30" id="programs">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Transform Your Life
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your path to personal growth and unlock your full potential
              with our specialized programs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="Rocket"
              title="Ascender Program"
              description="Master wealth creation and financial independence through proven strategies and expert guidance."
              badgeText="Most Popular"
              variant="ascender"
            />
            <FeatureCard
              icon="Brain"
              title="Neothinker Program"
              description="Enhance your cognitive abilities and unlock your mind's true potential."
              variant="neothinker"
            />
            <FeatureCard
              icon="Zap"
              title="Immortal Program"
              description="Optimize your health and vitality for peak physical and mental performance."
              variant="immortal"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Why Choose Neothink+
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience a revolutionary approach to personal development that
              combines cutting-edge research with practical application.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Add feature cards here */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of successful individuals who have already taken the
              first step towards their extraordinary future.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/auth/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
