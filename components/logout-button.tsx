"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoutButtonProps {
  className?: string
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const supabase = createClient()
      await supabase.auth.signOut()

      // Refresh the page to update the auth state
      router.refresh()

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleLogout} className={cn("flex items-center", className)} disabled={isLoading}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isLoading ? "Signing out..." : "Sign out"}</span>
    </button>
  )
}
