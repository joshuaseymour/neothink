"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { checkPasswordStrength } from "@/app/actions/auth"

const formSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
})

export function PasswordStrengthCheck() {
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{ strong?: boolean; reasons?: string[] } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsChecking(true)
    setResult(null)

    try {
      const strengthResult = await checkPasswordStrength(values.password)
      setResult({
        strong: strengthResult.strong,
        reasons: strengthResult.reasons,
      })
    } catch (error) {
      console.error("Error checking password:", error)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Check the strength of your password against security best practices. This check is performed locally and your
        password is never sent to our servers.
      </p>

      {result && (
        <Alert
          variant={!result.strong ? "destructive" : "default"}
          className={!result.strong ? "" : "bg-green-50 border-green-200"}
        >
          {!result.strong ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
          <AlertTitle>{!result.strong ? "Password could be stronger" : "Strong password"}</AlertTitle>
          <AlertDescription>
            {!result.strong ? (
              <div>
                <p>Your password could be improved:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="text-sm">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              "Great job! Your password meets all the recommended security criteria."
            )}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password to check</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isChecking}>
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Check Password Strength"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

