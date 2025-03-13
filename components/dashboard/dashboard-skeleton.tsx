import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Calendar } from "lucide-react"

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header Skeleton */}
      <header className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-xl">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation Skeleton */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>

            {/* Quick Actions Card Skeleton */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1">
            {/* Welcome Section Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-9 w-64 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>

            {/* Progress Stats Skeleton */}
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    <Skeleton className="h-6 w-32" />
                  </CardTitle>
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Programs Grid Skeleton */}
            <Skeleton className="h-7 w-36 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activity and Events Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-neutral-400" />
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-8 w-8" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-48 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-neutral-400" />
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-8 w-8" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-48 mb-1" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
