import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  className?: string
  children: React.ReactNode
}

export function GradientText({ className, children }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  )
}

