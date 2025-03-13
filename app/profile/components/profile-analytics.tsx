"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/types"
import { BarChart, CalendarClock, Clock, BarChart2 } from "lucide-react"
import { useEffect, useRef } from "react"

interface ProfileAnalyticsProps {
  user: User
  userSubscriptions: string[]
}

export function ProfileAnalytics({ user, userSubscriptions }: ProfileAnalyticsProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const donutChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = chartRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#27272a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Helper function to create gradient
    const createGradient = (colorStops: [number, string][]) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      colorStops.forEach(([stop, color]) => {
        gradient.addColorStop(stop, color)
      })
      return gradient
    }

    // Program colors
    const colors = {
      ascender: "#f97316",
      neothinker: "#f59e0b",
      immortal: "#ef4444",
    }

    // Months data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonth = new Date().getMonth()
    const lastSixMonths = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1)

    // Create dummy data
    const data = {
      labels: lastSixMonths,
      datasets: [
        {
          label: "Engagement Score",
          data: [65, 72, 80, 85, 92, 95],
          gradient: createGradient([
            [0, colors.ascender],
            [0.5, colors.neothinker],
            [1, colors.immortal],
          ]),
          lineWidth: 3,
        },
      ],
    }

    // Calculate dimensions
    const padding = 40
    const chartHeight = canvas.height - padding * 2
    const chartWidth = canvas.width - padding * 2

    // Draw grid lines
    ctx.strokeStyle = "#3f3f46"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + chartHeight - (i / 10) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
      ctx.stroke()

      // Add labels on the left
      if (i % 2 === 0) {
        ctx.fillStyle = "#71717a"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"
        ctx.fillText(`${i * 10}`, padding - 10, y + 4)
      }
    }

    // Vertical grid lines & labels
    const dataLength = data.labels.length
    for (let i = 0; i < dataLength; i++) {
      const x = padding + (i / (dataLength - 1)) * chartWidth

      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, padding + chartHeight)
      ctx.stroke()

      // Add labels at the bottom
      ctx.fillStyle = "#71717a"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(data.labels[i], x, padding + chartHeight + 20)
    }

    // Draw lines
    data.datasets.forEach((dataset) => {
      ctx.beginPath()
      ctx.lineWidth = dataset.lineWidth
      ctx.strokeStyle = dataset.gradient

      dataset.data.forEach((value, index) => {
        const x = padding + (index / (dataLength - 1)) * chartWidth
        const y = padding + chartHeight - (value / 100) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Add points
      dataset.data.forEach((value, index) => {
        const x = padding + (index / (dataLength - 1)) * chartWidth
        const y = padding + chartHeight - (value / 100) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill()
        ctx.strokeStyle = dataset.gradient
        ctx.lineWidth = 2
        ctx.stroke()
      })
    })

    // Add title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Engagement Over Time", canvas.width / 2, 20)
  }, [])

  // Render donut chart
  useEffect(() => {
    if (!donutChartRef.current) return

    const ctx = donutChartRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = donutChartRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#27272a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Program colors
    const colors = {
      ascender: "#f97316",
      neothinker: "#f59e0b",
      immortal: "#ef4444",
      other: "#3f3f46",
    }

    // Create dummy data
    const data = [
      { label: "Prosperity", value: 40, color: colors.ascender },
      { label: "Happiness", value: 30, color: colors.neothinker },
      { label: "Health", value: 20, color: colors.immortal },
      { label: "Other", value: 10, color: colors.other },
    ]

    // Calculate total
    const total = data.reduce((acc, item) => acc + item.value, 0)

    // Draw donut chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const innerRadius = radius * 0.6

    let startAngle = 0

    // Draw sections
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      // Draw slice
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()

      // Fill with color
      ctx.fillStyle = item.color
      ctx.fill()

      // Add label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(item.label, labelX, labelY)

      // Update start angle for next slice
      startAngle += sliceAngle
    })

    // Add center hole
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "#27272a"
    ctx.fill()

    // Add center text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Focus Areas", centerX, centerY - 10)
    ctx.font = "12px sans-serif"
    ctx.fillText("Distribution", centerX, centerY + 10)
  }, [])

  // Mock stats
  const stats = [
    { label: "Login Streak", value: "12 days", icon: CalendarClock },
    { label: "Time Spent", value: "42 hours", icon: Clock },
    { label: "Growth Rate", value: "+15%", icon: BarChart2 },
  ]

  return (
    <Card className="border-neutral-800 bg-neutral-900/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-neutral-400" />
          Analytics & Insights
        </CardTitle>
        <CardDescription>Track your engagement and progress metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-neutral-800 bg-neutral-950">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <stat.icon className="h-8 w-8 mb-2 text-neutral-400" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-neutral-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-neutral-800 bg-neutral-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Engagement Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <canvas ref={chartRef} style={{ width: "100%", height: "100%" }}></canvas>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Focus Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <canvas ref={donutChartRef} style={{ width: "100%", height: "100%" }}></canvas>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-neutral-800 bg-neutral-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-ascender-500/30 rounded-lg">
                <h4 className="text-ascender-500 font-medium">Prosperity Focus</h4>
                <p className="text-sm text-neutral-300">
                  Consider increasing your engagement with the wealth creation modules to maximize financial growth.
                </p>
              </div>

              <div className="p-3 border border-neothinker-500/30 rounded-lg">
                <h4 className="text-neothinker-500 font-medium">Consistency Opportunity</h4>
                <p className="text-sm text-neutral-300">
                  Your engagement shows periodic gaps. Try to establish a daily routine for best results.
                </p>
              </div>

              <div className="p-3 border border-immortal-500/30 rounded-lg">
                <h4 className="text-immortal-500 font-medium">Health Tracking</h4>
                <p className="text-sm text-neutral-300">
                  Start logging your health metrics to get more personalized recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

