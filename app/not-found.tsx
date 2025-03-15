"use client"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-8">
        <h1 className="font-bold bg-gradient-primary bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <a href="/">Go Home</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/programs">View Programs</a>
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-immortal-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>
    </div>
  )
}
