"use client"

import * as React from "react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SidebarContext,
  SidebarState,
  type SidebarContextValue,
} from "@/hooks/use-sidebar"

/**
 * Props for the SidebarProvider component.
 */
interface SidebarProviderProps extends React.ComponentProps<"div"> {
  /**
   * Whether the sidebar should be open by default.
   */
  defaultOpen?: boolean
  /**
   * Control the open state.
   */
  open?: boolean
  /**
   * Callback when the open state changes.
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * Provides a context for the sidebar, handling its open state and keyboard shortcut.
 */
export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Track mobile state
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // Handle controlled and uncontrolled open state
    const [_open, _setOpen] = React.useState(() => {
      // Try to get initial state from cookie
      if (typeof document !== "undefined") {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(SIDEBAR_COOKIE_NAME))
        if (cookie) {
          return cookie.split("=")[1] === "true"
        }
      }
      return defaultOpen
    })
    
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        
        // Update state
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }
        
        // Save to cookie
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Toggle sidebar based on device type
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Handle keyboard shortcut
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // Compute current state
    const state: SidebarState = open ? "expanded" : "collapsed"

    // Memoize context value
    const contextValue: SidebarContextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              "has-[[data-variant=inset]]:bg-sidebar",
              "transition-[width] duration-300 ease-in-out",
              className
            )}
            ref={ref}
            data-state={state}
            data-mobile={isMobile}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)

SidebarProvider.displayName = "SidebarProvider"
