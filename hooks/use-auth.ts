import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '@/lib/services/auth-service'
import { AuthState, UserProfile } from '@/types/auth'
import { useRouter } from 'next/navigation'

interface AuthMutationParams {
  email: string
  password: string
  redirectUrl?: string
}

const authService = AuthService.getInstance()

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Get current session with retry disabled
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => authService.getSession(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Get user profile if session exists
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['auth', 'profile', session?.session?.user?.id],
    queryFn: () => authService.getProfile(session?.session?.user?.id!),
    enabled: !!session?.session?.user?.id,
    staleTime: 30 * 1000, // 30 seconds
  })

  // Sign in mutation
  const signIn = useMutation({
    mutationFn: ({ email, password }: AuthMutationParams) =>
      authService.signIn(email, password),
    onSuccess: (data) => {
      if (data.user) {
        queryClient.invalidateQueries({ queryKey: ['auth'] })
        router.push('/dashboard')
      }
    },
  })

  // Sign up mutation with redirect URL support
  const signUp = useMutation({
    mutationFn: ({ email, password, redirectUrl }: AuthMutationParams) =>
      authService.signUp(email, password, redirectUrl),
    onSuccess: () => {
      router.push('/auth/verify')
    },
  })

  // Sign out mutation with query cache cleanup
  const signOut = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      // Clear all queries from the cache
      queryClient.clear()
      // Reset auth-related queries
      queryClient.resetQueries({ queryKey: ['auth'] })
      router.push('/auth/login')
    },
  })

  // Reset password mutation with redirect URL support
  const resetPassword = useMutation({
    mutationFn: ({ email, redirectUrl }: Omit<AuthMutationParams, 'password'>) =>
      authService.resetPassword(email, redirectUrl),
    onSuccess: () => {
      router.push('/auth/check-email')
    },
  })

  // Update profile mutation with strict type safety
  const updateProfile = useMutation({
    mutationFn: ({ data }: { data: Partial<Omit<UserProfile, 'id' | 'email' | 'subscriptions'>> }) =>
      authService.updateProfile(session?.session?.user?.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] })
    },
  })

  const authState: AuthState = {
    user: session?.session?.user ?? null,
    profile: profileData?.profile ?? null,
    isLoading: isSessionLoading || isProfileLoading,
    error: profileData?.error ?? session?.error ?? null,
  }

  return {
    ...authState,
    signIn: signIn.mutateAsync,
    signUp: signUp.mutateAsync,
    signOut: signOut.mutateAsync,
    resetPassword: resetPassword.mutateAsync,
    updateProfile: updateProfile.mutateAsync,
    isSigningIn: signIn.isPending,
    isSigningUp: signUp.isPending,
    isSigningOut: signOut.isPending,
    isResettingPassword: resetPassword.isPending,
    isUpdatingProfile: updateProfile.isPending,
    signInError: signIn.error,
    signUpError: signUp.error,
    signOutError: signOut.error,
    resetPasswordError: resetPassword.error,
    updateProfileError: updateProfile.error,
  }
}
