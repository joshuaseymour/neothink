"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { createBrowserClient } from "@/lib/supabase/client"
import type { AuthChangeEvent, SupabaseClient, User } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  user: User | null
  isLoading: boolean
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function useSupabase() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [supabase] = useState(() => createBrowserClient())
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error getting initial session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null)

        // Handle auth events
        switch (event) {
          case "INITIAL_SESSION":
            // Initial session loaded
            break
          case "SIGNED_IN":
            // Handle successful sign in
            break
          case "SIGNED_OUT":
            // Clear any user data
            break
          case "TOKEN_REFRESHED":
            // Session token was refreshed
            break
          case "USER_UPDATED":
            // User data was updated
            break
          case "MFA_CHALLENGE_VERIFIED":
            // MFA challenge completed
            break
          case "PASSWORD_RECOVERY":
            // Password recovery email requested
            break
        }
      } catch (error) {
        console.error("Auth state change error:", error)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <Context.Provider value={{ supabase, user, isLoading }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </ThemeProvider>
    </Context.Provider>
  )
}
