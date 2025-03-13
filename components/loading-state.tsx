import { cn } from "@/lib/utils"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ascender" | "neothinker" | "immortal"
}

export function LoadingState({
  text = "Loading...",
  size = "md",
  variant = "default",
  className,
  ...props
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  }

  const variantClasses = {
    default: "border-t-neutral-50",
    ascender: "border-t-ascender-500",
    neothinker: "border-t-neothinker-500",
    immortal: "border-t-immortal-500",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3 p-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-neutral-800",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {text && (
        <p
          className={cn("text-neutral-400", {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          })}
        >
          {text}
        </p>
      )}
    </div>
  )
}
