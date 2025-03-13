import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-50 text-neutral-900 hover:bg-neutral-200",
        destructive: "bg-immortal-500 text-white hover:bg-immortal-600",
        outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 hover:text-neutral-50",
        secondary: "bg-neutral-800 text-neutral-50 hover:bg-neutral-700",
        ghost: "hover:bg-neutral-800 hover:text-neutral-50",
        link: "text-neutral-50 underline-offset-4 hover:underline",

        // Theme-specific variants
        ascender: "bg-ascender-500 text-white hover:bg-ascender-600",
        neothinker: "bg-neothinker-500 text-white hover:bg-neothinker-600",
        immortal: "bg-immortal-500 text-white hover:bg-immortal-600",

        // New brand gradient variant
        brand:
          "relative text-white overflow-hidden bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }

