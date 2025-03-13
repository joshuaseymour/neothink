import { User } from '@supabase/supabase-js'
import { Database } from './supabase'

export type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row']
export type ProfileRow = Database['public']['Tables']['profiles']['Row']

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  onboarding_completed: boolean
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
  subscriptions: string[]
  user_subscriptions?: Array<{ tier: string }>
}

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  error: AuthError | null
}

export interface AuthError {
  name: string
  message: string
  status?: number
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends SignInCredentials {
  redirectUrl?: string
}

export interface ResetPasswordCredentials {
  email: string
  redirectUrl?: string
}

export interface UpdatePasswordCredentials {
  password: string
}
