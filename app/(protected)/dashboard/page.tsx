import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardView } from "@/components/dashboard/dashboard-view"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

export const metadata: Metadata = {
  title: "Dashboard | Neothink+",
  description: "Your personalized Neothink+ dashboard for tracking progress and accessing programs",
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardView />
    </Suspense>
  )
}
