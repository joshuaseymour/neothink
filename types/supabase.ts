export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          bio: string | null
          email: string | null
          focus_area: string | null
          location: string | null
          website: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          bio?: string | null
          email?: string | null
          focus_area?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          bio?: string | null
          email?: string | null
          focus_area?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          tier: string
          active: boolean
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tier: string
          active?: boolean
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tier?: string
          active?: boolean
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          title: string
          program: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          program: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          program?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          program: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          program: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          program?: string
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
