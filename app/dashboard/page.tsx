"use client"

export const dynamic = "force-dynamic"

import { Brain } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-neothinker-50 p-3">
          <Brain className="w-8 h-8 text-neothinker-600" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Neothink
            </span>
          </h1>
          <p className="text-lg text-zinc-500">
            Your personal learning dashboard
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Start */}
        <div className="rounded-lg border border-neothinker-200 bg-white p-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold">Quick Start</h2>
            <p className="text-sm text-zinc-500">Get started with Neothink</p>
          </div>
          <div className="mt-6">
            <ul className="space-y-4">
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-neothinker-500 mr-2" />
                Complete your profile
              </li>
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-neothinker-500 mr-2" />
                Set your learning preferences
              </li>
              <li className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-neothinker-500 mr-2" />
                Start your first course
              </li>
            </ul>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-lg border border-neothinker-200 bg-white p-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold">Your Progress</h2>
            <p className="text-sm text-zinc-500">Track your learning journey</p>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Courses Completed</span>
                  <span className="font-medium">0/0</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full">
                  <div className="h-full bg-neothinker-500 rounded-full w-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-neothinker-200 bg-white p-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="text-sm text-zinc-500">Your latest interactions</p>
          </div>
          <div className="mt-6">
            <div className="text-sm text-zinc-500 text-center py-8">
              No recent activity
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
