import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Rocket, Brain, HeartPulse } from "lucide-react"

interface ProgressStatsProps {
  completionPercentage: number
  userSubscriptions: string[]
}

export function ProgressStats({ completionPercentage, userSubscriptions }: ProgressStatsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-400">Overall Completion</span>
          <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${userSubscriptions.includes("ascender") ? "bg-ascender-900/20" : "bg-neutral-800"}`}
          >
            <Rocket
              className={`h-5 w-5 ${userSubscriptions.includes("ascender") ? "text-ascender-500" : "text-neutral-400"}`}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-50">Ascender</div>
            <div className="text-xs text-neutral-400">Prosperity</div>
          </div>
          <div className="ml-auto">
            {userSubscriptions.includes("ascender") ? (
              <Badge variant="ascender">Active</Badge>
            ) : (
              <Badge variant="outline">Inactive</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${userSubscriptions.includes("neothinker") ? "bg-neothinker-900/20" : "bg-neutral-800"}`}
          >
            <Brain
              className={`h-5 w-5 ${userSubscriptions.includes("neothinker") ? "text-neothinker-500" : "text-neutral-400"}`}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-50">Neothinker</div>
            <div className="text-xs text-neutral-400">Happiness</div>
          </div>
          <div className="ml-auto">
            {userSubscriptions.includes("neothinker") ? (
              <Badge variant="neothinker">Active</Badge>
            ) : (
              <Badge variant="outline">Inactive</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${userSubscriptions.includes("immortal") ? "bg-immortal-900/20" : "bg-neutral-800"}`}
          >
            <HeartPulse
              className={`h-5 w-5 ${userSubscriptions.includes("immortal") ? "text-immortal-500" : "text-neutral-400"}`}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-50">Immortal</div>
            <div className="text-xs text-neutral-400">Longevity</div>
          </div>
          <div className="ml-auto">
            {userSubscriptions.includes("immortal") ? (
              <Badge variant="immortal">Active</Badge>
            ) : (
              <Badge variant="outline">Inactive</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

