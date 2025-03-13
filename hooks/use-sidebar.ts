"use client"

import * as React from "react"
import { useIsMobile } from "./use-mobile"

// Constants
export const SIDEBAR_COOKIE_NAME = "sidebar:state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Types
export type SidebarState = "expanded" | "collapsed"

export interface SidebarContextValue {
  /** Current state of the sidebar */
  state: SidebarState
  /** Whether the sidebar is open */
  open: boolean
  /** Set the open state */
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  /** Whether the mobile sidebar is open */
  openMobile: boolean
  /** Set the mobile open state */
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  /** Whether the current device is mobile */
  isMobile: boolean
  /** Toggle the sidebar open/closed */
  toggleSidebar: () => void
}

// Context
const SidebarContext = React.createContext<SidebarContextValue | null>(null)

/**
 * Hook to access sidebar state and controls
 * @throws {Error} If used outside of SidebarProvider
 */
export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export { SidebarContext }
