"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type VariantType = "ascender" | "neothinker" | "immortal" | "default"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  badgeText?: string
  variant?: VariantType
  href?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  badgeText,
  variant = "default",
  href = "/auth/signup",
}: FeatureCardProps) {
  const variantStyles: Record<VariantType, string> = {
    ascender: "border-blue-500 hover:border-blue-400",
    neothinker: "border-purple-500 hover:border-purple-400",
    immortal: "border-green-500 hover:border-green-400",
    default: "border-neutral-800 hover:border-neutral-700",
  }

  const badgeStyles: Record<VariantType, string> = {
    ascender: "bg-blue-500/10 text-blue-500",
    neothinker: "bg-purple-500/10 text-purple-500",
    immortal: "bg-green-500/10 text-green-500",
    default: "bg-neutral-500/10 text-neutral-500",
  }

  return (
    <Card className={`relative overflow-hidden transition-all ${variantStyles[variant]}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-6 w-6" />
          {badgeText && (
            <Badge variant="outline" className={badgeStyles[variant]}>
              {badgeText}
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={href}>
          <Button className="w-full" variant={variant === "default" ? "default" : "outline"}>
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
