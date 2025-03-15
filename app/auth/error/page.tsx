"use client"

export const dynamic = "force-dynamic"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-red-200 bg-white">
          <div className="border-b border-red-200 bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-900">Authentication Error</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-900">
                  {error || "An unexpected authentication error occurred"}
                </p>
              </div>

              <Link
                href="/auth/login"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2"
              >
                Return to Login
              </Link>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-zinc-500 hover:text-zinc-700"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
