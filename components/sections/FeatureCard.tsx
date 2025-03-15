"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type VariantType = "ascender" | "neothinker" | "immortal"

interface FeatureCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  variant?: VariantType
  badgeText?: string
  href?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  variant,
  badgeText,
  href = "/auth/signup",
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-lg border p-8 transition-all hover:shadow-lg",
        "hover:border-neutral-200 dark:hover:border-neutral-800",
        variant === "ascender" && "hover:border-orange-500/50",
        variant === "neothinker" && "hover:border-amber-500/50",
        variant === "immortal" && "hover:border-red-500/50",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div
            className={cn(
              "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border transition-colors",
              "bg-neutral-50 dark:bg-neutral-900",
              variant === "ascender" && "border-orange-500/50 text-orange-500",
              variant === "neothinker" && "border-amber-500/50 text-amber-500",
              variant === "immortal" && "border-red-500/50 text-red-500",
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          {badgeText && (
            <Badge variant="outline" className={cn(
              variant === "ascender" && "border-orange-500/50 text-orange-500",
              variant === "neothinker" && "border-amber-500/50 text-amber-500",
              variant === "immortal" && "border-red-500/50 text-red-500"
            )}>
              {badgeText}
            </Badge>
          )}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button className="w-full" variant={variant === undefined ? "default" : "outline"}>
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
