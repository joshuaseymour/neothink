"use client"

import { useEffect } from "react"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neothinker-50">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto rounded-full bg-neothinker-50 p-2">
            <XCircle className="h-6 w-6 text-neothinker-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Something went wrong!</h1>
          <p className="text-sm text-zinc-500">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Try again
          </button>

          <Link 
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-neothinker-200 bg-white px-4 py-2 text-sm font-medium text-neothinker-900 transition-colors hover:bg-neothinker-50 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Return Home
          </Link>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
