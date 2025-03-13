import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Brain, HeartPulse } from "lucide-react"

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-neutral-950 font-inter">
      <Header />

      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-neutral-50">Neothink+ Design System</h1>

        {/* Typography */}
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

        {/* Color Palettes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Color Palettes</h2>

          {/* Neutral (Zinc) */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-neutral-50">Neutral (Zinc)</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="p-4 bg-neutral-50 text-neutral-950 text-xs font-medium text-center">50</div>
              <div className="p-4 bg-neutral-100 text-neutral-950 text-xs font-medium text-center">100</div>
              <div className="p-4 bg-neutral-200 text-neutral-950 text-xs font-medium text-center">200</div>
              <div className="p-4 bg-neutral-300 text-neutral-950 text-xs font-medium text-center">300</div>
              <div className="p-4 bg-neutral-400 text-neutral-950 text-xs font-medium text-center">400</div>
              <div className="p-4 bg-neutral-500 text-neutral-50 text-xs font-medium text-center">500</div>
              <div className="p-4 bg-neutral-600 text-neutral-50 text-xs font-medium text-center">600</div>
              <div className="p-4 bg-neutral-700 text-neutral-50 text-xs font-medium text-center">700</div>
              <div className="p-4 bg-neutral-800 text-neutral-50 text-xs font-medium text-center">800</div>
              <div className="p-4 bg-neutral-900 text-neutral-50 text-xs font-medium text-center">900</div>
            </div>
          </div>

          {/* Ascender (Orange) */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-ascender-500">Ascender (Orange)</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="p-4 bg-ascender-50 text-neutral-950 text-xs font-medium text-center">50</div>
              <div className="p-4 bg-ascender-100 text-neutral-950 text-xs font-medium text-center">100</div>
              <div className="p-4 bg-ascender-200 text-neutral-950 text-xs font-medium text-center">200</div>
              <div className="p-4 bg-ascender-300 text-neutral-950 text-xs font-medium text-center">300</div>
              <div className="p-4 bg-ascender-400 text-neutral-950 text-xs font-medium text-center">400</div>
              <div className="p-4 bg-ascender-500 text-neutral-50 text-xs font-medium text-center">500</div>
              <div className="p-4 bg-ascender-600 text-neutral-50 text-xs font-medium text-center">600</div>
              <div className="p-4 bg-ascender-700 text-neutral-50 text-xs font-medium text-center">700</div>
              <div className="p-4 bg-ascender-800 text-neutral-50 text-xs font-medium text-center">800</div>
              <div className="p-4 bg-ascender-900 text-neutral-50 text-xs font-medium text-center">900</div>
            </div>
          </div>

          {/* Neothinker (Amber) */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-neothinker-500">Neothinker (Amber)</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="p-4 bg-neothinker-50 text-neutral-950 text-xs font-medium text-center">50</div>
              <div className="p-4 bg-neothinker-100 text-neutral-950 text-xs font-medium text-center">100</div>
              <div className="p-4 bg-neothinker-200 text-neutral-950 text-xs font-medium text-center">200</div>
              <div className="p-4 bg-neothinker-300 text-neutral-950 text-xs font-medium text-center">300</div>
              <div className="p-4 bg-neothinker-400 text-neutral-950 text-xs font-medium text-center">400</div>
              <div className="p-4 bg-neothinker-500 text-neutral-50 text-xs font-medium text-center">500</div>
              <div className="p-4 bg-neothinker-600 text-neutral-50 text-xs font-medium text-center">600</div>
              <div className="p-4 bg-neothinker-700 text-neutral-50 text-xs font-medium text-center">700</div>
              <div className="p-4 bg-neothinker-800 text-neutral-50 text-xs font-medium text-center">800</div>
              <div className="p-4 bg-neothinker-900 text-neutral-50 text-xs font-medium text-center">900</div>
            </div>
          </div>

          {/* Immortal (Red) */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-immortal-500">Immortal (Red)</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              <div className="p-4 bg-immortal-50 text-neutral-950 text-xs font-medium text-center">50</div>
              <div className="p-4 bg-immortal-100 text-neutral-950 text-xs font-medium text-center">100</div>
              <div className="p-4 bg-immortal-200 text-neutral-950 text-xs font-medium text-center">200</div>
              <div className="p-4 bg-immortal-300 text-neutral-950 text-xs font-medium text-center">300</div>
              <div className="p-4 bg-immortal-400 text-neutral-950 text-xs font-medium text-center">400</div>
              <div className="p-4 bg-immortal-500 text-neutral-50 text-xs font-medium text-center">500</div>
              <div className="p-4 bg-immortal-600 text-neutral-50 text-xs font-medium text-center">600</div>
              <div className="p-4 bg-immortal-700 text-neutral-50 text-xs font-medium text-center">700</div>
              <div className="p-4 bg-immortal-800 text-neutral-50 text-xs font-medium text-center">800</div>
              <div className="p-4 bg-immortal-900 text-neutral-50 text-xs font-medium text-center">900</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Buttons</h2>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Button variant="ascender">Ascender</Button>
              <Button variant="neothinker">Neothinker</Button>
              <Button variant="immortal">Immortal</Button>
            </div>

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
            <div className="grid grid-cols-1 gap-4 mt-6">
              <Button variant="brand">Brand Gradient Button</Button>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Badges</h2>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="ascender">Ascender</Badge>
              <Badge variant="neothinker">Neothinker</Badge>
              <Badge variant="immortal">Immortal</Badge>
            </div>

            <div className="flex flex-wrap gap-4">
              <Badge variant="ascenderOutline">Ascender Outline</Badge>
              <Badge variant="neothinkerOutline">Neothinker Outline</Badge>
              <Badge variant="immortalOutline">Immortal Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <Badge variant="brand">Brand Gradient</Badge>
              <Badge variant="brandOutline">Brand Outline</Badge>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>This is a default card with neutral styling.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="default">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="ascender">
              <CardHeader>
                <CardTitle variant="ascender">Ascender Card</CardTitle>
                <CardDescription>This card uses the Ascender color palette.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ascender">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="neothinker">
              <CardHeader>
                <CardTitle variant="neothinker">Neothinker Card</CardTitle>
                <CardDescription>This card uses the Neothinker color palette.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="neothinker">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="immortal">
              <CardHeader>
                <CardTitle variant="immortal">Immortal Card</CardTitle>
                <CardDescription>This card uses the Immortal color palette.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="immortal">Action</Button>
              </CardFooter>
            </Card>
          </div>
          <Card variant="brand" className="mt-6">
            <CardHeader>
              <CardTitle variant="brand">Brand Gradient Card</CardTitle>
              <CardDescription>This card uses the brand gradient color palette.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button variant="brand">Action</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Brand Gradient</h2>
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 brand-text-gradient">Brand Gradient Text</h3>
            <div className="brand-gradient h-20 w-full rounded-lg mb-4"></div>
            <p className="mb-4">Use the brand gradient for general UI elements that aren't specific to any program:</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="brand">Get Started</Button>
              <Badge variant="brand">New Feature</Badge>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-neutral-50">Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="ascender">
              <CardHeader>
                <Rocket className="h-6 w-6 text-ascender-500" />
                <CardTitle variant="ascender" className="mt-4">
                  Ascender
                </CardTitle>
                <CardDescription>Financial abundance and wealth creation strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">
                  Discover powerful techniques to attract financial abundance and create sustainable wealth in your
                  life.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ascender" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="neothinker">
              <CardHeader>
                <Brain className="h-6 w-6 text-neothinker-500" />
                <CardTitle variant="neothinker" className="mt-4">
                  Neothinker
                </CardTitle>
                <CardDescription>Emotional well-being and fulfillment practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">
                  Learn evidence-based methods to increase your happiness baseline and experience more joy daily.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="neothinker" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="immortal">
              <CardHeader>
                <HeartPulse className="h-6 w-6 text-immortal-500" />
                <CardTitle variant="immortal" className="mt-4">
                  Immortal
                </CardTitle>
                <CardDescription>Health optimization and lifespan extension</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400">
                  Access cutting-edge protocols to optimize your health, increase energy, and potentially extend your
                  lifespan.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="immortal" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

