import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const setupBaseUrl = process.env.NEXT_PUBLIC_SETUP_BASE_URL
  const authHeader = request.headers.get("authorization")

  if (!setupBaseUrl) {
    return NextResponse.json({ success: false, error: "NEXT_PUBLIC_SETUP_BASE_URL is not defined" }, { status: 500 })
  }

  if (!authHeader) {
    return NextResponse.json({ success: false, error: "Authorization header is missing" }, { status: 401 })
  }

  const dbSetup = await fetch(`${setupBaseUrl}/database/route`, {
    headers: { authorization: authHeader },
  })

  const accountSetup = await fetch(`${setupBaseUrl}/account-management/route`, {
    headers: { authorization: authHeader },
  })

  const storageSetup = await fetch(`${setupBaseUrl}/storage/route`, {
    headers: { authorization: authHeader },
  })

  const protectionSetup = await fetch(`${setupBaseUrl}/protection/route`, {
    headers: { authorization: authHeader },
  })

  const onboardingSetup = await fetch(`${setupBaseUrl}/onboarding/route`, {
    headers: { authorization: authHeader },
  })

  const triggersSetup = await fetch(`${setupBaseUrl}/triggers/route`, {
    headers: { authorization: authHeader },
  })

  return NextResponse.json({
    success: true,
    results: {
      database: await dbSetup.json(),
      accountManagement: await accountSetup.json(),
      storage: await storageSetup.json(),
      protection: await protectionSetup.json(),
      onboarding: await onboardingSetup.json(),
      triggers: await triggersSetup.json(),
    },
  })
}

