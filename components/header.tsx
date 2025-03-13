import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-neutral-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold brand-text-gradient">
          Neothink+
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-neutral-400 hover:text-neutral-50">
            Home
          </Link>
          <Link href="#" className="text-neutral-400 hover:text-neutral-50">
            About
          </Link>
          <Link href="#" className="text-neutral-400 hover:text-neutral-50">
            Features
          </Link>
          <Link href="#" className="text-neutral-400 hover:text-neutral-50">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="brand" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}

