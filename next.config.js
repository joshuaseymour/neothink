/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Configure image domains for Next.js Image component
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },

  // Supabase and other environment variables will be
  // automatically included by Vercel
}

module.exports = nextConfig
