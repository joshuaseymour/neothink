"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoutButton } from "./logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState, useMemo } from "react"
import type { User } from "@supabase/supabase-js"
import { Menu, UserIcon, Settings, Shield, Smartphone, History, UserCog, LayoutDashboard, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import React from "react"

// Define the Profile type
interface Profile {
  id: string
  updated_at?: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
}

// Memoize the navigation items to prevent unnecessary re-renders
const MainNavItems = React.memo(({ pathname, items, onItemClick }) => {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
          onClick={onItemClick}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  )
})
MainNavItems.displayName = "MainNavItems"

export function NavBar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Memoize navigation items to prevent recreating on each render
  const mainNavItems = useMemo(
    () => [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/profile", label: "Profile", icon: UserIcon },
    ],
    [],
  )

  const settingsNavItems = useMemo(
    () => [
      { href: "/settings/security", label: "Security", icon: Shield },
      { href: "/settings/account", label: "Account", icon: UserCog },
      { href: "/settings/sessions", label: "Sessions", icon: Smartphone },
      { href: "/settings/activity", label: "Activity", icon: History },
      { href: "/settings/protection", label: "Protection", icon: Bell },
    ],
    [],
  )

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Get profile data
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        setProfile(profileData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  // Don't show navbar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }

  // Get initials for avatar fallback
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || "U"

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            MyApp
          </Link>

          <nav className="hidden md:flex gap-6">
            <MainNavItems pathname={pathname} items={mainNavItems} onItemClick={() => {}} />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isLoading && user ? (
            <>
              {isMobile ? (
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-center gap-2 px-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{profile?.full_name || user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="border-t" />
                      <div className="flex flex-col gap-1">
                        {mainNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                              pathname === item.href
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                            )}
                            onClick={() => setIsSheetOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t pt-2">
                        <p className="px-2 text-sm font-medium mb-1">Settings</p>
                        <div className="flex flex-col gap-1">
                          {settingsNavItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                                pathname === item.href
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                              )}
                              onClick={() => setIsSheetOpen(false)}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <LogoutButton className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50" />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile?.full_name || user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {mainNavItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {settingsNavItems.map((item) => (
                              <DropdownMenuItem key={item.href} asChild>
                                <Link href={item.href}>
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <span>{item.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <LogoutButton className="w-full cursor-pointer" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          ) : (
            <div className="flex gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

