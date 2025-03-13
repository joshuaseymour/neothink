import type { User } from "@supabase/supabase-js"
import type { Profile, UserAccountData } from "@/types"

// Base props for components that need user data
export interface WithUserProps {
  user: User
}

// Props for components that need profile data
export interface WithProfileProps extends WithUserProps {
  profile: Profile
}

// Props for components that need account data
export interface WithAccountDataProps extends WithUserProps {
  accountData: UserAccountData
}

// Props for form components
export interface FormComponentProps {
  onSuccess?: () => void
  defaultValues?: Record<string, any>
  redirectTo?: string
}

