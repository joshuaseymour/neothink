"use client"

import { Badge } from "@/components/ui/badge"

export function BadgeSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-neutral-50">Badges</h2>
      <div className="bg-neutral-900 p-6 rounded-lg">
        {/* Basic Variants */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

        {/* Program Variants */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="ascender">Ascender</Badge>
          <Badge variant="neothinker">Neothinker</Badge>
          <Badge variant="immortal">Immortal</Badge>
        </div>

        {/* Program Outline Variants */}
        <div className="flex flex-wrap gap-4">
          <Badge variant="ascenderOutline">Ascender Outline</Badge>
          <Badge variant="neothinkerOutline">Neothinker Outline</Badge>
          <Badge variant="immortalOutline">Immortal Outline</Badge>
        </div>

        {/* Brand Variants */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Badge variant="brand">Brand Gradient</Badge>
          <Badge variant="brandOutline">Brand Outline</Badge>
        </div>
      </div>
    </section>
  )
}
