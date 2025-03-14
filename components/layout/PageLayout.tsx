"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
