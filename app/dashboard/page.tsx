import { redirect } from "next/navigation"

export const metadata = {
  title: "Dashboard | NeoThink",
  description: "Your personal dashboard for managing your profile and content.",
}

export default function DashboardPage() {
  redirect("/")
}
