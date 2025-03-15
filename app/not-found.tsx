"use client"

import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex justify-center">
          <Logo className="h-12 w-auto" />
        </div>

        <Card>
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-zinc-100 dark:bg-zinc-900 p-3">
                <FileQuestion className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Link href="/">
                <Button variant="default" className="w-full">
                  Return Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-zinc-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
      </div>
    </div>
  )
}
