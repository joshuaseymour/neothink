"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain } from "lucide-react"
import { useSupabase } from "@/components/providers"

export function Header() {
  const router = useRouter()
  const { user, supabase } = useSupabase()

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <header className="border-b border-neothinker-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-neothinker-50 p-2">
            <Brain className="h-6 w-6 text-neothinker-600" />
          </div>
          <span className="text-xl font-semibold text-neothinker-900">Neothink+</span>
        </Link>
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-700"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/profile" 
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-700"
              >
                Profile
              </Link>
              <div className="relative">
                <button
                  onClick={signOut}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neothinker-50 text-sm font-medium text-neothinker-900 hover:bg-neothinker-100"
                >
                  {user.email?.[0].toUpperCase()}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login"
                className="text-sm font-medium text-neothinker-600 hover:text-neothinker-700"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-neothinker-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neothinker-700 focus:outline-none focus:ring-2 focus:ring-neothinker-400 focus:ring-offset-2"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
