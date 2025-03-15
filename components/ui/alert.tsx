"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LucideAlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

// Export AlertCircle from lucide-react
export { AlertCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        error: "border-red-500/50 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-200 [&>svg]:text-red-500",
        warning: "border-amber-500/50 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-900/10 dark:text-amber-200 [&>svg]:text-amber-500",
        info: "border-orange-500/50 bg-orange-50 text-orange-900 dark:border-orange-900/50 dark:bg-orange-900/10 dark:text-orange-200 [&>svg]:text-orange-500",
        success: "border-red-500/50 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-200 [&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { hideIcon?: boolean }
>(({ className, variant, hideIcon, children, ...props }, ref) => {
  // Determine which icon to show based on variant
  const Icon = React.useMemo(() => {
    if (hideIcon) return null

    switch (variant) {
      case "error":
        return LucideAlertCircle
      case "success":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
      default:
        return null
    }
  }, [variant, hideIcon])

  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

// Make sure to export all required components
export { Alert, AlertTitle, AlertDescription }
