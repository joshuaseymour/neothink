export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string | null
          email_confirmed_at?: string | null
          onboarding_completed?: boolean
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string | null
          email_confirmed_at?: string | null
          onboarding_completed?: boolean
        }
      }
      user_account_data: {
        Row: {
          id: string
          account_status: string
          login_notifications_enabled: boolean
          last_password_check: string | null
          advanced_protection_enabled: boolean
          last_data_export: string | null
        }
        Insert: {
          id: string
          account_status?: string
          login_notifications_enabled?: boolean
          last_password_check?: string | null
          advanced_protection_enabled?: boolean
          last_data_export?: string | null
        }
        Update: {
          id?: string
          account_status?: string
          login_notifications_enabled?: boolean
          last_password_check?: string | null
          advanced_protection_enabled?: boolean
          last_data_export?: string | null
        }
      }
      security_notifications: {
        Row: {
          id: string
          user_id: string
          notification_type: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notification_type: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notification_type?: string
          metadata?: Json
          created_at?: string
        }
      }
    }
  }
}

