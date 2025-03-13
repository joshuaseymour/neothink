"use client"

import * as React from "react"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"

// Main Sidebar component - designed to work with v0.dev
export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    // Simple non-collapsible sidebar
    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    // Mobile sidebar using Sheet component
    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            side={side}
          >
            {children}
          </SheetContent>
        </Sheet>
      )
    }

    // Desktop sidebar with collapsible states
    return (
      <div
        data-sidebar="sidebar"
        data-variant={variant}
        data-side={side}
        data-state={state}
        className={cn(
          "relative flex h-full flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300",
          variant === "floating" && "m-2 h-[calc(100%-1rem)] rounded-xl",
          state === "expanded"
            ? "w-[--sidebar-width]"
            : collapsible === "icon"
              ? "w-[--sidebar-width-icon]"
              : "w-0",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

// Sidebar trigger button with tooltip
export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          className={cn(
            "h-9 w-9 p-0 hover:bg-sidebar-muted",
            className
          )}
          onClick={toggleSidebar}
          {...props}
        >
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Toggle Sidebar</TooltipContent>
    </Tooltip>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"
