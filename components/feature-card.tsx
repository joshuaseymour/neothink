import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  variant: "ascender" | "neothinker" | "immortal"
  badgeText?: string
}

export function FeatureCard({ title, description, icon: Icon, variant, badgeText }: FeatureCardProps) {
  const variantMap = {
    ascender: {
      iconColor: "text-ascender-500",
      badgeVariant: "ascenderOutline" as const,
    },
    neothinker: {
      iconColor: "text-neothinker-500",
      badgeVariant: "neothinkerOutline" as const,
    },
    immortal: {
      iconColor: "text-immortal-500",
      badgeVariant: "immortalOutline" as const,
    },
  }

  const { iconColor, badgeVariant } = variantMap[variant]

  return (
    <Card variant={variant} className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Icon className={`h-6 w-6 ${iconColor}`} />
          {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
        </div>
        <CardTitle variant={variant} className="mt-4">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-400">
          Learn more about how this feature can transform your life and help you achieve your goals.
        </p>
      </CardContent>
    </Card>
  )
}

