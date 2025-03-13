// Importing from shadcn/ui toast
import { useToast as useShadcnToast } from "@/components/ui/use-toast"
import { type ToastProps } from "@/components/ui/toast"

export interface ToastOptions extends Omit<ToastProps, "children"> {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const { toast: shadcnToast } = useShadcnToast()

  const toast = (options: ToastOptions) => {
    return shadcnToast({
      title: options.title,
      description: options.description,
      variant: options.variant,
      ...options,
    })
  }

  return {
    toast,
  }
}

export { useToast as toast }
