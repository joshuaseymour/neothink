import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header user={null} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
