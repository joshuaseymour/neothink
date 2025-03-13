export const dynamic = "force-dynamic"

import { VerificationRunner } from "@/components/auth/verification-runner"

export default function ClientVerificationPage() {
  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Client-Side Authentication Verification</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-6 text-gray-600">
          This page allows you to run client-side verification tests for the authentication system. These tests will
          verify the login, signup, and session management functionality without changing the UI.
        </p>

        <VerificationRunner />
      </div>
    </div>
  )
}

