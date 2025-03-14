"use server"

import { createClient } from "@/lib/supabase/client"

export async function loadUserProfile() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
