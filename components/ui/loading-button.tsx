"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
}

export function LoadingButton({ isLoading, loadingText, children, className, ...props }: LoadingButtonProps) {
  return (
    <Button className={cn("", className)} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

