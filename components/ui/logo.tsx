import { Brain } from "lucide-react"
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
        <Brain className="w-6 h-6" />
      </div>
      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Neothink+
      </span>
    </Link>
  )
}
