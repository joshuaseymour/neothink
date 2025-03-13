import { z } from "zod"
import type { Database } from "@/types/supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export const profileSchema = z.object({
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  bio: z
    .string()
    .max(160, {
      message: "Bio must not be longer than 160 characters.",
    })
    .optional()
    .nullable(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  focus_area: z
    .string()
    .optional()
    .nullable(),
  location: z
    .string()
    .optional()
    .nullable(),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .nullable()
    .or(z.literal("")),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})
