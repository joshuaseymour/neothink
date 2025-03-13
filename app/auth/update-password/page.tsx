import type { Metadata } from "next"
import { UpdatePasswordView } from "@/components/auth/update-password-view"
import { Suspense } from "react"
import { UpdatePasswordSkeleton } from "@/components/auth/update-password-skeleton"

export const metadata: Metadata = {
  title: "Update Password | Neothink+",
  description: "Update your password to secure your Neothink+ account",
}

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col">
      <Suspense fallback={<UpdatePasswordSkeleton />}>
        <UpdatePasswordView />
      </Suspense>
    </div>
  )
}

