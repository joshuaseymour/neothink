"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function AuthIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Define colors
    const colors = {
      ascender: "#f97316",
      neothinker: "#f59e0b",
      immortal: "#ef4444",
      background: "#18181b",
    }

    // Create particles
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      alpha: number
    }[] = []

    for (let i = 0; i < 50; i++) {
      const colorOptions = [colors.ascender, colors.neothinker, colors.immortal]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()
      })

      // Draw connecting lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw brand text
      const text = "NEOTHINK+"
      ctx.font = "bold 80px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Create gradient for text
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - 150,
        canvas.height / 2,
        canvas.width / 2 + 150,
        canvas.height / 2,
      )
      gradient.addColorStop(0, colors.ascender)
      gradient.addColorStop(0.5, colors.neothinker)
      gradient.addColorStop(1, colors.immortal)

      ctx.fillStyle = gradient
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)

      // Draw tagline
      const tagline = "PROSPERITY • HAPPINESS • LONGEVITY"
      ctx.font = "16px sans-serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.fillText(tagline, canvas.width / 2, canvas.height / 2 + 50)
    }

    // Animation loop
    const animate = () => {
      // Update particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
        }
      })

      draw()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <Card className="border-neutral-800 bg-neutral-900/50 overflow-hidden h-[500px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-50"></div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="space-y-4">
          <motion.div
            className="p-4 rounded-lg bg-neutral-800/80 backdrop-blur-sm border border-neutral-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-neutral-300 text-sm">
              "Neothink+ has completely transformed my approach to life. The combination of prosperity, happiness, and
              longevity strategies has given me a new perspective."
            </p>
            <div className="flex items-center mt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ascender-500 to-neothinker-500 flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <div className="ml-2">
                <p className="text-white text-xs font-medium">John Doe</p>
                <p className="text-neutral-500 text-xs">Ascender Member</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="h-1 flex-1 rounded-full bg-ascender-500"></div>
            <div className="h-1 flex-1 rounded-full bg-neothinker-500"></div>
            <div className="h-1 flex-1 rounded-full bg-immortal-500"></div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}

