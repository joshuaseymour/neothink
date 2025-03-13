"use client"

interface ColorSwatchProps {
  colorName: string
  colorClass: string
  textColorClass: string
  shade: string
}

function ColorSwatch({ colorName, colorClass, textColorClass, shade }: ColorSwatchProps) {
  return (
    <div className={`p-4 ${colorClass} ${textColorClass} text-xs font-medium text-center`}>
      {shade}
    </div>
  )
}

interface ColorPaletteProps {
  title: string
  baseColor: string
  titleColorClass: string
}

function ColorPalette({ title, baseColor, titleColorClass }: ColorPaletteProps) {
  const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
  
  return (
    <div className="mb-6">
      <h3 className={`text-xl font-bold mb-2 ${titleColorClass}`}>{title}</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {shades.map((shade) => (
          <ColorSwatch
            key={shade}
            colorName={baseColor}
            colorClass={`bg-${baseColor}-${shade}`}
            textColorClass={parseInt(shade) > 400 ? "text-neutral-50" : "text-neutral-950"}
            shade={shade}
          />
        ))}
      </div>
    </div>
  )
}

export function ColorPaletteSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-neutral-50">Color Palettes</h2>
      
      <ColorPalette 
        title="Neutral (Zinc)" 
        baseColor="neutral"
        titleColorClass="text-neutral-50"
      />
      
      <ColorPalette 
        title="Ascender (Orange)" 
        baseColor="ascender"
        titleColorClass="text-ascender-500"
      />
      
      <ColorPalette 
        title="Neothinker (Amber)" 
        baseColor="neothinker"
        titleColorClass="text-neothinker-500"
      />
      
      <ColorPalette 
        title="Immortal (Red)" 
        baseColor="immortal"
        titleColorClass="text-immortal-500"
      />
    </section>
  )
}
