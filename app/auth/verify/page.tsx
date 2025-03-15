"use client"

import { Brain } from "lucide-react"

export default function VerifyPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto rounded-full bg-neothinker-50 p-2">
          <Brain className="h-6 w-6 text-neothinker-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-sm text-zinc-500">
          We sent you a verification link. Click the link to verify your account.
        </p>
      </div>

      <div className="rounded-lg border border-neothinker-200 bg-neothinker-50 p-4 text-sm text-zinc-500">
        If you don't see the email in your inbox, check your spam folder.
      </div>
    </div>
  )
}
