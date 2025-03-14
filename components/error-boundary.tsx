"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            We apologize for the inconvenience. Please try refreshing the page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-neutral-900 p-4">
              <p className="text-sm font-mono text-neutral-200 break-all">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button onClick={reset} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
