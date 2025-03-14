# NeoThink+

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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **UI Development**: [v0.dev](https://v0.dev)

## 🗄️ Database Schema

### Profiles Table
```sql
id: uuid (primary key)
full_name: text
email: text
avatar_url: text
onboarding_completed: boolean
created_at: timestamp
updated_at: timestamp
```

### Program Progress Table
```sql
id: uuid (primary key)
user_id: uuid (foreign key)
program_id: text
progress: integer
last_activity: timestamp
created_at: timestamp
updated_at: timestamp
```

### User Settings Table
```sql
user_id: uuid (primary key)
theme: text
email_notifications: boolean
created_at: timestamp
updated_at: timestamp
```

## 📁 Project Structure

```
├── app/              # Next.js app directory
│   ├── (auth)/      # Auth routes
│   ├── (dashboard)/ # Dashboard routes
│   └── api/         # API routes
├── components/      # React components
│   ├── ui/         # UI components
│   ├── layout/     # Layout components
│   └── profile/    # Profile components
├── context/        # React context
└── lib/           # Utility functions
```

## 🔒 Authentication

Authentication is handled by Supabase Auth. Protected routes in the `app/(dashboard)` directory require a valid session.

## 🎨 UI Components

The app uses [shadcn/ui](https://ui.shadcn.com/) components, styled with TailwindCSS and prototyped with [v0.dev](https://v0.dev).

## 🚀 Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

## 📱 Features

- User authentication with Supabase
- Protected dashboard routes
- Profile management
- Program progress tracking
- Theme customization
- Responsive design

## 📄 License

MIT
