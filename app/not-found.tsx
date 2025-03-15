"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/programs">
            <Button variant="outline" size="lg">
              View Programs
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
