import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <Badge variant="brand" className="mb-4">
          New Program Available
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-50">
          Unlock Your <span className="brand-text-gradient">Potential</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
          Join Neothink+ and discover how to achieve prosperity, happiness, and longevity through our innovative
          programs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="brand" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

