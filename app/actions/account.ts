// Simplify the data export process
export async function requestDataExport() {
  try {
    const supabase = createClient()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: "You must be logged in to request a data export" }
    }

    // Check for existing pending requests
    const { data: existingRequests } = await supabase
      .from("data_export_requests")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("status", "pending")

    if (existingRequests && existingRequests.length > 0) {
      return { error: "You already have a pending data export request" }
    }

    // Create a new data export request
    const { data, error: insertError } = await supabase
      .from("data_export_requests")
      .insert({
        user_id: user.id,
        status: "pending",
      })
      .select()
      .single()

    if (insertError) {
      return { error: "Failed to create data export request" }
    }

    // Update last data export time
    await supabase
      .from("user_account_data")
      .update({
        last_data_export: new Date().toISOString(),
      })
      .eq("id", user.id)

    // Send security notification
    await sendSecurityNotification({
      type: "data_export_requested",
      user,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    })

    // Process the export immediately (in a real app, this would be a background job)
    await processDataExport(data.id)

    revalidatePath("/settings/account")
    return { success: true }
  } catch (error) {
    console.error("Error requesting data export:", error)
    return { error: "An unexpected error occurred" }
  }
}

// Simplify the processDataExport function
export async function processDataExport(requestId: string) {
  try {
    const supabase = createClient()

    // Get the export request
    const { data: request, error: requestError } = await supabase
      .from("data_export_requests")
      .select("user_id")
      .eq("id", requestId)
      .single()

    if (requestError || !request) {
      return { error: "Export request not found" }
    }

    // Get user data
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(request.user_id)

    if (userError || !userData.user) {
      return { error: "User not found" }
    }

    // Get profile data
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", request.user_id).single()

    // Get security notifications
    const { data: securityNotifications } = await supabase
      .from("security_notifications")
      .select("*")
      .eq("user_id", request.user_id)

    // Get sessions
    const { data: sessions } = await supabase.from("user_sessions").select("*").eq("user_id", request.user_id)

    // Generate download URL
    const downloadUrl = `/api/data-export/${requestId}`
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Expire in 7 days

    // Update the request
    await supabase
      .from("data_export_requests")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        download_url: downloadUrl,
        expires_at: expiresAt.toISOString(),
      })
      .eq("id", requestId)

    // Send notification to user
    await sendSecurityNotification({
      type: "data_export_ready",
      user: userData.user,
      metadata: {
        timestamp: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error processing data export:", error)
    return { error: "An unexpected error occurred" }
  }
}

