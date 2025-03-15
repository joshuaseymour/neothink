/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Base neutral colors using Zinc palette
        neutral: {
          50: "rgb(250 250 250)",
          100: "rgb(244 244 245)",
          200: "rgb(228 228 231)",
          300: "rgb(212 212 216)",
          400: "rgb(161 161 170)",
          500: "rgb(113 113 122)",
          600: "rgb(82 82 91)",
          700: "rgb(63 63 70)",
          800: "rgb(39 39 42)",
          900: "rgb(24 24 27)",
          950: "rgb(9 9 11)",
        },
        // Product-specific color palettes
        ascender: {
          50: "rgb(255 247 237)",
          100: "rgb(255 237 213)",
          200: "rgb(254 215 170)",
          300: "rgb(253 186 116)",
          400: "rgb(251 146 60)",
          500: "rgb(249 115 22)",
          600: "rgb(234 88 12)",
          700: "rgb(194 65 12)",
          800: "rgb(154 52 18)",
          900: "rgb(124 45 18)",
          950: "rgb(67 20 7)",
        },
        neothinker: {
          50: "rgb(255 251 235)",
          100: "rgb(254 243 199)",
          200: "rgb(253 230 138)",
          300: "rgb(252 211 77)",
          400: "rgb(251 191 36)",
          500: "rgb(245 158 11)",
          600: "rgb(217 119 6)",
          700: "rgb(180 83 9)",
          800: "rgb(146 64 14)",
          900: "rgb(120 53 15)",
          950: "rgb(69 26 3)",
        },
        immortal: {
          50: "rgb(254 242 242)",
          100: "rgb(254 226 226)",
          200: "rgb(254 202 202)",
          300: "rgb(252 165 165)",
          400: "rgb(248 113 113)",
          500: "rgb(239 68 68)",
          600: "rgb(220 38 38)",
          700: "rgb(185 28 28)",
          800: "rgb(153 27 27)",
          900: "rgb(127 29 29)",
          950: "rgb(69 10 10)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))', // amber-500 -> orange-500 -> red-500
        'gradient-primary-vertical': 'linear-gradient(to bottom, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))',
        'gradient-primary-diagonal': 'linear-gradient(to bottom right, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
