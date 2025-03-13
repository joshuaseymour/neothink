"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Welcome to MyApp</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your secure authentication solution with Next.js, Tailwind CSS, and Supabase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

