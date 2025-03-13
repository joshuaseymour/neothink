import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}
