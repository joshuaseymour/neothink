"use client"

import Link from "next/link"
import { LoginForm } from "./login-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasswordResetForm } from "./password-reset-form"
import { motion } from "framer-motion"

export function LoginView() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome back</h1>
            <p className="mt-2 text-sm text-neutral-400">Sign in to your account to continue your journey</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
          style={{ pointerEvents: "auto" }}
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-800/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-neutral-700 relative z-20"
                style={{ pointerEvents: "auto" }}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="reset"
                className="data-[state=active]:bg-neutral-700 relative z-20"
                style={{ pointerEvents: "auto" }}
              >
                Reset Password
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
              <TabsContent value="login" className="mt-0">
                <LoginForm />
                <div className="mt-6 text-center text-sm text-neutral-500">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-neothinker-500 hover:underline relative z-20"
                    style={{ pointerEvents: "auto" }}
                  >
                    Sign up
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="reset" className="mt-0">
                <PasswordResetForm />
                <div className="mt-6 text-center text-sm text-neutral-500">
                  Remember your password?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-neothinker-500 hover:underline relative z-20"
                    onClick={() => {
                      const loginTab = document.querySelector('[data-state="inactive"][value="login"]') as HTMLElement
                      if (loginTab) loginTab.click()
                    }}
                    style={{ pointerEvents: "auto" }}
                  >
                    Sign in
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

