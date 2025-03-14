"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { useAuth } from "@/context/auth-context"

interface PageLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function PageLayout({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: PageLayoutProps) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header user={user} />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
