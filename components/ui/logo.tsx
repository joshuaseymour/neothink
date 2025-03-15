import { Brain } from "lucide-react"
import Link from 'next/link'
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string
}

export function Logo({ className, href = "/", ...props }: LogoProps) {
  return (
    <Link 
      href={href} 
      className={cn("flex items-center gap-2", className)} 
      {...props}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
        <Brain className="w-6 h-6" />
      </div>
      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Neothink+
      </span>
    </Link>
  )
}
