"use client"

import { useState } from "react"
import { ClientAuthVerification } from "@/utils/client-auth-verification"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function VerificationRunner() {
  const [isRunning, setIsRunning] = useState(false)
  const [report, setReport] = useState<any>(null)

  const runVerification = async () => {
    setIsRunning(true)
    try {
      const result = await ClientAuthVerification.runVerification()
      setReport(result)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client-Side Authentication Verification</h2>
        <Button onClick={runVerification} disabled={isRunning}>
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            "Run Verification"
          )}
        </Button>
      </div>

      {report && (
        <div className="mt-6 border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Verification Report</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                report.overallSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {report.overallSuccess ? "All Tests Passed" : "Tests Failed"}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4">Generated at: {new Date(report.timestamp).toLocaleString()}</p>

          <div className="space-y-3">
            {report.tests.map((test: any, index: number) => (
              <div key={index} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{test.name}</h4>
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
      )}
    </div>
  )
}

