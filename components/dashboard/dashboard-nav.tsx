"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Rocket, Brain, HeartPulse, Users, BookOpen, MessageSquare, Lock } from "lucide-react"

interface DashboardNavProps {
  userSubscriptions: string[]
}

export function DashboardNav({ userSubscriptions }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Ascender",
      href: "/dashboard/ascender",
      icon: Rocket,
      variant: "ascender",
      program: "ascender",
    },
    {
      title: "Neothinker",
      href: "/dashboard/neothinker",
      icon: Brain,
      variant: "neothinker",
      program: "neothinker",
    },
    {
      title: "Immortal",
      href: "/dashboard/immortal",
      icon: HeartPulse,
      variant: "immortal",
      program: "immortal",
    },
    {
      title: "Community",
      href: "/dashboard/community",
      icon: Users,
      variant: "default",
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: BookOpen,
      variant: "default",
    },
    {
      title: "Support",
      href: "/dashboard/support",
      icon: MessageSquare,
      variant: "default",
    },
  ]

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const isLocked = item.program && !userSubscriptions.includes(item.program)

        return (
          <Link
            key={item.href}
            href={isLocked ? `/subscribe?tier=${item.program}` : item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? item.variant === "default"
                  ? "bg-neutral-800 text-neutral-50"
                  : item.variant === "ascender"
                    ? "bg-ascender-900/20 text-ascender-500"
                    : item.variant === "neothinker"
                      ? "bg-neothinker-900/20 text-neothinker-500"
                      : "bg-immortal-900/20 text-immortal-500"
                : "text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800",
              isLocked && "opacity-50",
            )}
          >
            {item.variant === "default" ? (
              <item.icon className="h-5 w-5" />
            ) : item.variant === "ascender" ? (
              <item.icon className="h-5 w-5 text-ascender-500" />
            ) : item.variant === "neothinker" ? (
              <item.icon className="h-5 w-5 text-neothinker-500" />
            ) : (
              <item.icon className="h-5 w-5 text-immortal-500" />
            )}
            <span>{item.title}</span>
            {isLocked && <Lock className="h-4 w-4 ml-auto" />}
          </Link>
        )
      })}
    </nav>
  )
}

