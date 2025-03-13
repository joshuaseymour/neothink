import type { User } from "@supabase/supabase-js"

// Extend the existing types file with more precise definitions

// User-related types
export interface BasicUserInfo {
  id: string
  email: string | null
  created_at?: string
  user_metadata?: Record<string, any>
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  location: string | null
  created_at: string
  updated_at: string | null
  email_confirmed_at: string | null
  onboarding_completed: boolean
}

export interface UserAccountData {
  id: string
  account_status: string
  login_notifications_enabled: boolean
  last_password_check: string | null
  advanced_protection_enabled: boolean
  last_data_export: string | null
}

export interface SecurityNotification {
  id: string
  user_id: string
  notification_type: string
  metadata: Record<string, any>
  created_at: string
}

// Form data types
export interface OnboardingFormData {
  fullName: string
  bio: string
  location: string
  notificationsEnabled: boolean
  securityNotificationsEnabled: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  fullName: string
  email: string
  password: string
}

export interface ResetPasswordFormData {
  email: string
}

export interface UpdatePasswordFormData {
  password: string
  confirmPassword: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  redirectTo?: string
}

// Notification types
export type NotificationType =
  | "new_login"
  | "password_changed"
  | "account_deactivated"
  | "password_reset_requested"
  | "data_export_requested"
  | "data_export_ready"

export interface NotificationOptions {
  type: NotificationType
  user: { email: string | null; id: string }
  metadata: Record<string, any>
}

