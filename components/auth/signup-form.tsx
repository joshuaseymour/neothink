"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

export function SignupForm() {
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)
  const router = useRouter()

  // Set isMounted to false when the component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Basic validation function
  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {}
    let isValid = true

    // Email validation
    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submission started")

    // Validate form
    if (!validateForm()) {
      console.log("Form validation failed", errors)
      return
    }

    setIsLoading(true)
    console.log("Form validated, proceeding with signup")

    try {
      // Use the direct signup endpoint
      console.log("Sending signup request to server")

      const response = await fetch("/api/auth/signup-direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      console.log("Received response from server:", response.status)

      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.message || "Signup failed")
      }

      // Only update state if the component is still mounted
      if (isMounted.current) {
        // Show success message
        toast({
          title: "Account created",
          description: "Your account has been created successfully. You can now log in.",
        })

        // Set signup complete to show verification message
        setSignupComplete(true)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error("Signup error:", error)

      // Only update state if the component is still mounted
      if (isMounted.current) {
        toast({
          title: "Signup failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }
  }

  // Show verification message after successful signup
  if (signupComplete) {
    return (
      <div className="space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              className="h-10 w-10 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">Account Created</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Your account has been created successfully. You can now log in with your email and password.
          </p>
        </motion.div>
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-neutral-700 text-white hover:bg-neutral-800"
            onClick={() => router.push("/auth/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  // Render the signup form
  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500"
            disabled={isLoading}
            autoComplete="email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500 pr-10"
              disabled={isLoading}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 text-neutral-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-neutral-800 border-neutral-700 text-white focus:border-neothinker-500 pr-10"
              disabled={isLoading}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 text-neutral-400 hover:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-ascender-500 via-neothinker-500 to-immortal-500 hover:opacity-90 focus:ring-2 focus:ring-neothinker-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </motion.div>
    </form>
  )
}

