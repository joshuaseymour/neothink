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
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  variant,
  badgeText,
  href = "/auth/signup",
}: FeatureCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
      variant === "ascender" && "hover:border-blue-500/50",
      variant === "neothinker" && "hover:border-purple-500/50",
      variant === "immortal" && "hover:border-green-500/50"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-8 w-8" />
          {badgeText && (
            <Badge variant="outline" className={cn(
              variant === "ascender" && "border-blue-500/50 text-blue-500",
              variant === "neothinker" && "border-purple-500/50 text-purple-500",
              variant === "immortal" && "border-green-500/50 text-green-500"
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
