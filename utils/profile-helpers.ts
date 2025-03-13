import { createClient } from "@/utils/supabase/client"

export async function loadUserProfile() {
  const supabase = createClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
      throw error
    }

    return {
      ...data,
      email: user.email,
    }
  } catch (error) {
    console.error("Error loading profile:", error)
    return null
  }
}

export async function updateUserProfile(profileData) {
  const supabase = createClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error("User not authenticated")
    }

    const { error } = await supabase.from("profiles").update(profileData).eq("id", user.id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error("Error updating profile:", error)
    return false
  }
}

