import { type NextRequest, NextResponse } from "next/server"
import { generateCsrfToken } from "@/lib/csrf"

/**
 * API endpoint to generate and return a CSRF token
 */
export async function GET(request: NextRequest) {
  try {
    // Generate a new CSRF token
    const csrfToken = generateCsrfToken()

    // Return the token to the client with proper headers
    return NextResponse.json(
      { csrfToken },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error generating CSRF token:", error)
    return NextResponse.json({ error: "Failed to generate security token" }, { status: 500 })
  }
}

