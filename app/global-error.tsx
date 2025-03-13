"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Oops! Something went wrong</h2>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              We&apos;re sorry for the inconvenience. Our team has been notified.
            </p>
            <Button onClick={reset} className="mt-6" variant="outline">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
