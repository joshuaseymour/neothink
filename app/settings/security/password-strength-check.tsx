"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function PasswordStrengthCheck() {
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])

  const checkPasswordStrength = (password: string) => {
    // Initialize score
    let score = 0
    const feedback: string[] = []

    // Check length
    if (password.length < 8) {
      feedback.push("Password should be at least 8 characters long")
    } else {
      score += 20
    }

    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      feedback.push("Add uppercase letters")
    } else {
      score += 20
    }

    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      feedback.push("Add lowercase letters")
    } else {
      score += 20
    }

    // Check for numbers
    if (!/[0-9]/.test(password)) {
      feedback.push("Add numbers")
    } else {
      score += 20
    }

    // Check for special characters
    if (!/[^A-Za-z0-9]/.test(password)) {
      feedback.push("Add special characters")
    } else {
      score += 20
    }

    setStrength(score)
    setFeedback(feedback)
  }

  const getStrengthLabel = (strength: number) => {
    if (strength < 40) return "Weak"
    if (strength < 80) return "Moderate"
    return "Strong"
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Strength Checker</CardTitle>
        <CardDescription>Check how strong your password is and get suggestions for improvement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter a password to check"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                checkPasswordStrength(e.target.value)
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                setPassword("")
                setStrength(0)
                setFeedback([])
              }}
            >
              Clear
            </Button>
          </div>

          {password && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Strength: {getStrengthLabel(strength)}</span>
                  <span className="text-sm">{strength}%</span>
                </div>
                <Progress value={strength} className={getStrengthColor(strength)} />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Feedback:</h4>
                {feedback.length > 0 ? (
                  <ul className="space-y-1">
                    {feedback.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-red-500">
                        <XCircle className="h-4 w-4 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center text-sm text-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Your password meets all strength criteria!
                  </div>
                )}
              </div>

              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Password tips</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use at least 12 characters</li>
                        <li>Mix uppercase and lowercase letters</li>
                        <li>Include numbers and special characters</li>
                        <li>Avoid common words and patterns</li>
                        <li>Don't reuse passwords across sites</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

