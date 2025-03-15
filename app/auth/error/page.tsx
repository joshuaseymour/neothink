"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto rounded-full bg-neothinker-50 p-2">
          <XCircle className="h-6 w-6 text-neothinker-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Authentication error</h1>
        <p className="text-sm text-neothinker-500">
          {error || "An error occurred during authentication"}
        </p>
      </div>

      <Button 
        asChild
        className="bg-neothinker-600 hover:bg-neothinker-700 text-white"
      >
        <Link href="/auth/login">
          Try again
        </Link>
      </Button>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neothinker-100">
      <Suspense fallback={
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mx-auto rounded-full bg-neothinker-50 p-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-neothinker-200" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Loading...</h1>
          </div>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  )
}
