"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TestimonialPopupProps {
  moduleId: string
  className?: string
}

export function TestimonialPopup({ moduleId, className }: TestimonialPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Testimonials for each module type
  const testimonials = {
    prosperity: [
      "John just unlocked Prosperity and 10x'd his revenue!",
      "Sarah made $50K in her first month after joining Ascenders!",
      "Mark quit his job after implementing our wealth strategies!",
    ],
    happiness: [
      "Lisa reports 87% higher happiness after just 2 weeks!",
      "David found his life purpose through Neothinker methods!",
      "Emma's anxiety disappeared after applying our techniques!",
    ],
    longevity: [
      "Robert reversed his biological age by 15 years!",
      "Jennifer's health markers improved dramatically in 30 days!",
      "Michael's doctor was shocked by his transformation!",
    ],
  }

  // Get the appropriate testimonials based on moduleId
  const moduleTestimonials = testimonials[moduleId as keyof typeof testimonials] || testimonials.prosperity

  // Set up the interval for cycling through testimonials
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fade out
      setIsVisible(false)

      // Change testimonial and fade in after a short delay
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % moduleTestimonials.length)
        setIsVisible(true)
      }, 500)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [moduleTestimonials.length])

  return (
    <div
      className={cn(
        "absolute bottom-3 right-3 z-20 bg-green-500 text-white rounded-full px-3 py-1 text-sm font-inter shadow-lg transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {moduleTestimonials[currentIndex]}
    </div>
  )
}

