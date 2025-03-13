"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

interface PasswordStrengthProps {
  strength: number
  password: string
}

export function PasswordStrength({ strength, password }: PasswordStrengthProps) {
  const getStrengthColor = () => {
    if (strength < 40) return "bg-destructive"
    if (strength < 80) return "bg-warning"
    return "bg-success"
  }

  const getStrengthText = () => {
    if (strength < 40) return "Weak"
    if (strength < 80) return "Good"
    return "Strong"
  }

  const requirements = [
    { regex: /^.{8,}$/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /[0-9]/, text: "At least one number" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Progress 
          value={strength} 
          className={cn(
            "h-2 transition-colors",
            getStrengthColor()
          )} 
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Password Strength
          </span>
          <span className={cn(
            "font-medium",
            strength < 40 ? "text-destructive" :
            strength < 80 ? "text-warning" :
            "text-success"
          )}>
            {getStrengthText()}
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2">
            {req.regex.test(password) ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={cn(
              "text-sm",
              req.regex.test(password)
                ? "text-success"
                : "text-muted-foreground"
            )}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
