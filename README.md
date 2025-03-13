# NeoThink+ Dashboard

A modern web application built with Next.js 14, Supabase, and TailwindCSS.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
# Copy the example env file
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Add Sentry for error tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Database**: [Supabase](https://supabase.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Error Tracking**: [Sentry](https://sentry.io/)

## 🗄️ Database Schema

### Profiles Table
```sql
id: uuid (primary key)
full_name: text
username: text
bio: text
email: text
focus_area: text
location: text
website: text
avatar_url: text
created_at: timestamp
updated_at: timestamp
```

### User Subscriptions Table
```sql
id: uuid (primary key)
user_id: uuid (foreign key)
tier: text
active: boolean
created_at: timestamp
updated_at: timestamp
expires_at: timestamp
```

### User Activity Table
```sql
id: uuid (primary key)
user_id: uuid (foreign key)
title: text
program: text
created_at: timestamp
```

### Events Table
```sql
id: uuid (primary key)
title: text
description: text
program: text
date: timestamp
created_at: timestamp
```

## 📁 Project Structure

```
├── app/                   # Next.js app directory
│   ├── (protected)/      # Protected routes
│   ├── (public)/         # Public routes
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/              # UI components
│   ├── dashboard/       # Dashboard components
│   └── profile/         # Profile components
├── lib/                 # Utility functions
│   └── supabase/       # Supabase client
└── types/              # TypeScript types
```

## 🔒 Authentication

Authentication is handled by Supabase. Protected routes are in the `app/(protected)` directory and require a valid session.

## 🎨 UI Components

The app uses a combination of custom components and Radix UI primitives, all styled with TailwindCSS.

## 🚀 Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel
4. Deploy!

## 🛠️ Development Tools

- Use v0.dev for rapid UI prototyping
- Use the Supabase dashboard to manage your database
- Use Vercel for deployment and monitoring

## 📱 Features

- User authentication with Supabase
- Protected dashboard routes
- Profile management
- Program subscriptions
- Activity tracking
- Event management
- Error tracking with Sentry

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT
