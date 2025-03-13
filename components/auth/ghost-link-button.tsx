"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GhostLinkButtonProps {
  href: string
  className?: string
  children: ReactNode
}

export function GhostLinkButton({ href, className, children }: GhostLinkButtonProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "ghost" }), className)}>
      {children}
    </Link>
  )
}

