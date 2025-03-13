"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"

// Styles for nav items - easy to customize with v0.dev
const navItemVariants = cva(
  "group/nav-item relative flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "min-h-9 text-xs",
        md: "min-h-10",
        lg: "min-h-11 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

export const SidebarNavHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-3 py-2 text-xs font-medium text-muted-foreground", className)}
    {...props}
  />
))
SidebarNavHeader.displayName = "SidebarNavHeader"

interface SidebarNavItemProps
  extends React.ComponentPropsWithoutRef<"a">,
    VariantProps<typeof navItemVariants> {
  asChild?: boolean
  isActive?: boolean
}

export const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarNavItemProps
>(
  (
    { asChild = false, size, isActive = false, className, children, ...props },
    ref
  ) => {
    const { state } = useSidebar()
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cn(
          navItemVariants({ size }),
          isActive && "bg-accent text-accent-foreground",
          state === "collapsed" && "justify-center",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarNavItem.displayName = "SidebarNavItem"
