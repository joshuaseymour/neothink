import Link from "next/link"
import { GradientText } from "@/components/ui/gradient-text"

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <GradientText className="text-xl font-bold">Neothink+</GradientText>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-neutral-400 hover:text-neutral-50">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-neutral-400 hover:text-neutral-50">
              Terms
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-neutral-400">
            © {new Date().getFullYear()} Neothink. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

