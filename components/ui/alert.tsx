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
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-600 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
        info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
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
      case "destructive":
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

