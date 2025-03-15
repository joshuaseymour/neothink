import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "@/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Neothink+ | Transform Your Life",
  description: "Join Neothink+ to unlock your full potential in wealth, happiness, and health.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`font-sans ${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}