"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { handleError } from "@/lib/utils"

interface UseFormSubmitOptions<T> {
  onSubmit: (values: T) => Promise<void>
  onSuccess?: () => void
  successMessage?: {
    title?: string
    description?: string
  }
}

export function useFormSubmit<T>({ onSubmit, onSuccess, successMessage }: UseFormSubmitOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (values: T) => {
    setIsSubmitting(true)
    try {
      await onSubmit(values)

      if (successMessage) {
        toast({
          title: successMessage.title || "Success",
          description: successMessage.description || "Operation completed successfully",
          variant: "default",
        })
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: handleError(error),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    handleSubmit,
  }
}

