import type { Metadata } from "next"
import Link from "next/link"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { GhostLinkButton } from "@/components/auth/ghost-link-button"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password to continue accessing your account.",
}

export default function ResetPasswordPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <GhostLinkButton href="/auth/login" className="absolute right-4 top-4 md:right-8 md:top-8 text-white">
          Login
        </GhostLinkButton>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          MyApp
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Secure password recovery is an essential part of a robust authentication system."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to receive a password reset link</p>
          </div>
          <ResetPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

