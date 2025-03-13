"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function DashboardNavBar() {
  const pathname = usePathname()

  return (
    <div className="w-full border-b border-zinc-700/50 bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-inter font-bold text-zinc-100">Neothink+</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-zinc-100",
                pathname === "/dashboard" ? "text-zinc-100" : "text-zinc-300",
              )}
            >
              Dash
            </Link>
            <Link
              href="/profile"
              className={cn(
                "text-sm font-medium transition-colors hover:text-zinc-100",
                pathname === "/profile" ? "text-zinc-100" : "text-zinc-300",
              )}
            >
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Avatar className="h-8 w-8 rounded-full border border-zinc-500 bg-transparent">
            <AvatarFallback className="text-zinc-100">J</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

