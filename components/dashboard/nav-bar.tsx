"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function DashboardNavBar() {
  const pathname = usePathname()

  return (
    <div className="w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gradient-blend">Neothink+</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-zinc-900",
                pathname === "/dashboard" ? "text-zinc-900" : "text-zinc-500",
              )}
            >
              Dash
            </Link>
            <Link
              href="/profile"
              className={cn(
                "text-sm font-medium transition-colors hover:text-zinc-900",
                pathname === "/profile" ? "text-zinc-900" : "text-zinc-500",
              )}
            >
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Avatar className="h-8 w-8 bg-gradient-blend text-white">
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

