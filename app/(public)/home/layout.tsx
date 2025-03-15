import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Neothink+ | Transform Your Life",
  description: "Join Neothink+ and unlock your full potential with our transformative programs.",
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
