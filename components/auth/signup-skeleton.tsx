import { Skeleton } from "@/components/ui/skeleton"

export function SignupSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Form skeleton */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center md:text-left">
            <Skeleton className="h-10 w-40 mb-6" />
            <Skeleton className="h-8 w-full max-w-xs mb-2" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />

              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />

              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-10 w-full" />
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <Skeleton className="w-full h-[1px]" />
              </div>
              <div className="relative flex justify-center">
                <Skeleton className="h-4 w-8" />
              </div>
            </div>

            <div className="text-center">
              <Skeleton className="h-4 w-40 mx-auto mb-2" />
              <Skeleton className="h-10 w-40 mx-auto" />
            </div>
          </div>
        </div>

        {/* Right side - Illustration skeleton */}
        <div className="hidden md:block">
          <Skeleton className="h-[500px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

