"use client"

import { useEffect, useRef } from "react"

interface ProgressChartProps {
  userSubscriptions: string[]
}

export function ProgressChart({ userSubscriptions }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Helper to create gradient
    const createGradient = (colorStops: [number, string][]) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      colorStops.forEach(([stop, color]) => {
        gradient.addColorStop(stop, color)
      })
      return gradient
    }

    // Program colors
    const ascenderColor = "#f97316"
    const neothinkerColor = "#f59e0b"
    const immortalColor = "#ef4444"

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#27272a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create data
    // In a real app, you would get this data from your backend
    const data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      datasets: [
        {
          label: "Overall Progress",
          data: [10, 25, 30, 42, 50, 62],
          gradient: createGradient([
            [0, ascenderColor],
            [0.5, neothinkerColor],
            [1, immortalColor],
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
        ctx.fillText(`${i * 10}%`, padding - 10, y + 4)
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
    ctx.fillText("Progress Over Time", canvas.width / 2, 20)
  }, [userSubscriptions])

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-neutral-800">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  )
}

