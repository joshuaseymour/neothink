import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-neutral-800 text-neutral-50",
        secondary: "border-transparent bg-neutral-700 text-neutral-50",
        outline: "text-neutral-50 border-neutral-700",

        // Theme-specific variants
        ascender: "border-transparent bg-ascender-500 text-white",
        neothinker: "border-transparent bg-neothinker-500 text-white",
        immortal: "border-transparent bg-immortal-500 text-white",

        // Outline theme variants
        ascenderOutline: "bg-transparent border-ascender-500 text-ascender-500",
        neothinkerOutline: "bg-transparent border-neothinker-500 text-neothinker-500",
        immortalOutline: "bg-transparent border-immortal-500 text-immortal-500",

        // New brand gradient variant
        brand: "border-transparent bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 text-white",
        brandOutline: "bg-transparent border border-transparent bg-clip-padding brand-border-gradient text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

