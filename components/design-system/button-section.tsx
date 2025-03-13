"use client"

import { Button } from "@/components/ui/button"

export function ButtonSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-neutral-50">Buttons</h2>
      <div className="bg-neutral-900 p-6 rounded-lg">
        {/* Basic Variants */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        {/* Program Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button variant="ascender">Ascender</Button>
          <Button variant="neothinker">Neothinker</Button>
          <Button variant="immortal">Immortal</Button>
        </div>

        {/* Size Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="ascender" size="sm">
            Small
          </Button>
          <Button variant="neothinker" size="default">
            Default
          </Button>
          <Button variant="immortal" size="lg">
            Large
          </Button>
        </div>

        {/* Brand Button */}
        <div className="grid grid-cols-1 gap-4 mt-6">
          <Button variant="brand">Brand Gradient Button</Button>
        </div>
      </div>
    </section>
  )
}
