import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = createClient()

    // Check environment variables
    const diagnostics = {
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
        supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing",
        nodeEnv: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString(),
    }

    // Test database connection
    try {
      const { data, error } = await supabase.from("profiles").select("count(*)", { count: "exact" })
      diagnostics["database"] = {
        connected: !error,
        error: error ? error.message : null,
        profileCount: data,
      }
    } catch (dbError: any) {
      diagnostics["database"] = {
        connected: false,
        error: dbError.message,
      }
    }

    // Check current session
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      diagnostics["session"] = {
        active: !!session,
        error: error ? error.message : null,
        userId: session?.user?.id,
      }
    } catch (sessionError: any) {
      diagnostics["session"] = {
        active: false,
        error: sessionError.message,
      }
    }

    return NextResponse.json(diagnostics)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

