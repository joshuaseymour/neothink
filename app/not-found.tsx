"use client"

import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto rounded-full bg-neothinker-50 p-2">
          <FileQuestion className="h-6 w-6 text-neothinker-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Page Not Found</h1>
        <p className="text-sm text-zinc-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button 
        asChild
        className="bg-neothinker-600 hover:bg-neothinker-700 text-white"
      >
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  )
}
