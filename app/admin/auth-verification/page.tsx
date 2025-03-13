export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { AuthVerification } from "@/utils/auth-verification"

// Server component to run verification tests
async function VerificationReport() {
  const report = await AuthVerification.generateReport()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Authentication Verification Report</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            report.overallSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {report.overallSuccess ? "All Tests Passed" : "Tests Failed"}
        </span>
      </div>

      <p className="text-sm text-gray-500">Generated at: {new Date(report.timestamp).toLocaleString()}</p>

      <div className="space-y-4">
        {report.tests.map((test, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{test.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  test.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {test.success ? "Passed" : "Failed"}
              </span>
            </div>

            {test.error && <p className="mt-2 text-sm text-red-600">{test.error}</p>}

            <p className="mt-2 text-sm text-gray-600">{test.details}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AuthVerificationPage() {
  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Authentication System Verification</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-6 text-gray-600">
          This page runs a series of tests to verify the authentication flow without changing the visual design or
          layout of the application. The tests cover user signup, login, session management, and security features.
        </p>

        <Suspense fallback={<div className="text-center py-10">Running verification tests...</div>}>
          <VerificationReport />
        </Suspense>
      </div>
    </div>
  )
}

