"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Rocket, Zap, LucideIcon } from "lucide-react"

const ICONS = {
  Brain,
  Rocket,
  Zap,
} as const

type IconName = keyof typeof ICONS

type VariantType = "ascender" | "neothinker" | "immortal"

interface FeatureCardProps {
  title: string
  description: string
  icon: IconName
  variant?: VariantType
  badgeText?: string
  href?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  variant,
  badgeText,
  href = "/auth/signup",
  className,
}: FeatureCardProps) {
  const Icon = ICONS[icon]
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-lg border p-8 transition-all hover:shadow-lg",
        "hover:border-neutral-200 dark:hover:border-neutral-800",
        variant === "ascender" && "hover:border-ascender-500/50",
        variant === "neothinker" && "hover:border-neothinker-500/50",
        variant === "immortal" && "hover:border-immortal-500/50",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div
            className={cn(
              "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border transition-colors",
              "bg-neutral-50 dark:bg-neutral-900",
              variant === "ascender" && "border-ascender-500/50 text-ascender-500",
              variant === "neothinker" && "border-neothinker-500/50 text-neothinker-500",
              variant === "immortal" && "border-immortal-500/50 text-immortal-500",
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          {badgeText && (
            <Badge variant="outline" className={cn(
              variant === "ascender" && "border-ascender-500/50 text-ascender-500",
              variant === "neothinker" && "border-neothinker-500/50 text-neothinker-500",
              variant === "immortal" && "border-immortal-500/50 text-immortal-500"
            )}>
              {badgeText}
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-base text-muted-foreground mb-4">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button 
            className={cn(
              "w-full",
              variant === "ascender" && "bg-ascender-600 hover:bg-ascender-700",
              variant === "neothinker" && "bg-neothinker-600 hover:bg-neothinker-700",
              variant === "immortal" && "bg-immortal-600 hover:bg-immortal-700"
            )} 
            variant={variant === undefined ? "default" : "outline"}
          >
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
