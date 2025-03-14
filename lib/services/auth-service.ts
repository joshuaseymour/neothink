import { createClient } from '@/lib/supabase/client'
import { AuthError, AuthState, UserProfile, UserSubscription } from '@/types/auth'
import { User } from '@supabase/supabase-js'

export class AuthService {
  private static instance: AuthService
  private supabase = createClient()

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check if profile exists, if not create it
      if (data.user) {
        const { error: profileError } = await this.supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (profileError?.code === 'PGRST116') {
          // Profile doesn't exist, create it
          await this.createProfile(data.user.id, email)
        }
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        user: null,
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 401,
        },
      }
    }
  }

  async signUp(email: string, password: string, redirectUrl?: string): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl || `${window.location.origin}/auth/callback`,
          data: {
            email,
          },
        },
      })

      if (error) throw error

      // Create profile entry
      if (data.user) {
        await this.createProfile(data.user.id, email)
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return {
        user: null,
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 400,
        },
      }
    }
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return {
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 500,
        },
      }
    }
  }

  async resetPassword(email: string, redirectUrl?: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl || `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 500,
        },
      }
    }
  }

  async getSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession()
      
      if (error) throw error
      
      // Check session expiration
      if (session) {
        const expiresAt = new Date((session.expires_at || 0) * 1000)
        if (expiresAt <= new Date()) {
          // Session expired, try to refresh
          const { data: { session: newSession }, error: refreshError } = 
            await this.supabase.auth.refreshSession()
          
          if (refreshError) throw refreshError
          return { session: newSession, error: null }
        }
      }
      
      return { session, error: null }
    } catch (error) {
      console.error('Get session error:', error)
      return {
        session: null,
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 401,
        },
      }
    }
  }

  private async createProfile(userId: string, email: string) {
    try {
      const { error } = await this.supabase.from('profiles').insert([
        {
          id: userId,
          email,
          full_name: email.split('@')[0], // Default name from email
          avatar_url: null,
          bio: null,
          onboarding_completed: false,
          role: 'user' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

      if (error) throw error
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error // Re-throw to handle in the signup flow
    }
  }

  async getProfile(userId: string): Promise<{ profile: UserProfile | null; error: AuthError | null }> {
    try {
      // Get profile data with subscriptions in a single query
      const { data: profileData, error } = await this.supabase
        .from('profiles')
        .select(`
          *,
          user_subscriptions!inner(tier)
        `)
        .eq('id', userId)
        .eq('user_subscriptions.active', true)
        .single()

      if (error) throw error

      if (!profileData) {
        throw new Error('Profile not found')
      }

      const profile: UserProfile = {
        ...profileData,
        subscriptions: (profileData.user_subscriptions as Array<{ tier: string }> || []).map(sub => sub.tier),
      }

      return { profile, error: null }
    } catch (error) {
      console.error('Get profile error:', error)
      return {
        profile: null,
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 500,
        },
      }
    }
  }

  async updateProfile(
    userId: string,
    data: Partial<Omit<UserProfile, 'id' | 'email' | 'subscriptions' | 'user_subscriptions'>>
  ): Promise<{ profile: UserProfile | null; error: AuthError | null }> {
    try {
      const { error } = await this.supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (error) throw error

      return this.getProfile(userId)
    } catch (error) {
      console.error('Update profile error:', error)
      return {
        profile: null,
        error: {
          name: 'AuthError',
          message: this.getErrorMessage(error),
          status: 500,
        },
      }
    }
  }

  private getErrorMessage(error: any): string {
    if (typeof error === 'string') return error
    if (error?.message) return error.message
    if (error?.error_description) return error.error_description
    return 'An unexpected error occurred'
  }
}
