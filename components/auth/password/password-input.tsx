"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

interface PasswordInputProps {
  form: UseFormReturn<any>
  name: "password" | "confirmPassword"
  label: string
  disabled?: boolean
}

export function PasswordInput({ form, name, label, disabled }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "pr-10", // Make room for the button
                  disabled && "cursor-not-allowed opacity-50"
                )}
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-0 h-full px-3",
                "hover:bg-transparent",
                disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
