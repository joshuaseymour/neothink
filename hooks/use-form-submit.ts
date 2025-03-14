"use client"

import { FieldValues, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { handleError } from "@/lib/utils"

interface UseFormSubmitOptions<T extends FieldValues> {
  onSubmit: SubmitHandler<T>
  successMessage?: string
  errorMessage?: string
}

export function useFormSubmit<T extends FieldValues>({
  onSubmit,
  successMessage = "Success!",
  errorMessage = "Something went wrong. Please try again.",
}: UseFormSubmitOptions<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      setIsLoading(true)
      await onSubmit(data)
      toast({
        description: successMessage,
      })
    } catch (error) {
      handleError(error)
      toast({
        variant: "destructive",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleSubmit,
  }
}
