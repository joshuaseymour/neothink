"use client"

import { Card } from "@/components/ui/card"

export function TypographySection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-neutral-50">Typography</h2>
      <div className="bg-neutral-900 p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-neutral-50">Heading 1</h1>
        <h2 className="text-3xl font-bold mb-4 text-neutral-50">Heading 2</h2>
        <h3 className="text-2xl font-bold mb-4 text-neutral-50">Heading 3</h3>
        <h4 className="text-xl font-bold mb-4 text-neutral-50">Heading 4</h4>
        <h5 className="text-lg font-bold mb-4 text-neutral-50">Heading 5</h5>
        <h6 className="text-base font-bold mb-4 text-neutral-50">Heading 6</h6>
        <p className="text-base mb-4 text-neutral-300">
          This is a paragraph of text. The Inter font is used throughout the entire application.
        </p>
        <p className="text-sm text-neutral-400">
          This is smaller text, often used for captions or secondary information.
        </p>
      </div>
    </section>
  )
}
