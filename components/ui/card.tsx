import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "ascender" | "neothinker" | "immortal" | "brand"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-neutral-900 border-neutral-800",
    ascender: "bg-neutral-900 border-ascender-500",
    neothinker: "bg-neutral-900 border-neothinker-500",
    immortal: "bg-neutral-900 border-immortal-500",
    brand: "bg-neutral-900 brand-border-gradient",
  }

  return (
    <div ref={ref} className={cn("rounded-lg border p-4 shadow-sm", variantClasses[variant], className)} {...props} />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: "default" | "ascender" | "neothinker" | "immortal" | "brand"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "text-neutral-50",
    ascender: "text-ascender-500",
    neothinker: "text-neothinker-500",
    immortal: "text-immortal-500",
    brand: "brand-text-gradient",
  }

  return (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", variantClasses[variant], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-neutral-400", className)} {...props} />,
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

