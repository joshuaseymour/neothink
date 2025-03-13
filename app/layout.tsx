import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"
import { QueryProvider } from "@/components/query-provider"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neothink+ | Transform Your Life",
  description: "Join Neothink+ to unlock your full potential in wealth, happiness, and health.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}