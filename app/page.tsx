"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    router.replace("/auth/login")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto rounded-full bg-neothinker-50 p-2">
            <Brain className="h-6 w-6 text-neothinker-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to Neothink+</h1>
          <p className="text-sm text-zinc-500">
            Redirecting you to login...
          </p>
        </div>

        <div className="rounded-lg border border-neothinker-200 bg-white p-6">
          <button
            onClick={() => router.push("/auth/login")}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>

        {/* Background gradient effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-neothinker-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-neothinker-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
      </div>
    </div>
  )
}
