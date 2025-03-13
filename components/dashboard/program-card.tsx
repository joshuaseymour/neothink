import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import Link from "next/link"

interface ProgramCardProps {
  program: {
    id: string
    title: string
    shortDesc: string
    description: string
    content: string
    progress: number
    requiredTier: string
    externalUrl: string
    icon: any
    iconColor: string
    variant: string
    unlocked: boolean
  }
}

export function ProgramCard({ program }: ProgramCardProps) {
  const Icon = program.icon

  return (
    <Card variant={program.variant as any} className="relative overflow-hidden">
      {!program.unlocked && (
        <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6">
          <Lock className="h-10 w-10 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-200 text-center mb-2">Unlock {program.title}</h3>
          <p className="text-sm text-neutral-400 text-center mb-4">
            Subscribe to access {program.shortDesc} content and features
          </p>
          <Button asChild variant="brand">
            <Link href={`/subscribe?tier=${program.requiredTier}`}>Unlock Now</Link>
          </Button>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Icon className={`h-6 w-6 ${program.iconColor}`} />
          <Badge variant={`${program.variant}Outline` as any}>{program.shortDesc}</Badge>
        </div>
        <CardTitle variant={program.variant as any} className="mt-4">
          {program.title}
        </CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Progress</span>
              <span className="text-neutral-50 font-medium">{program.progress}%</span>
            </div>
            <Progress value={program.progress} className="h-2" />
          </div>
          <p className="text-sm text-neutral-400">{program.content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={program.variant as any} className="w-full" asChild>
          <Link href={`/dashboard/${program.id}`}>{program.progress > 0 ? "Continue" : "Start Now"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

