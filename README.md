# BK Centre Connect

A modern web application built for Brahma Kumaris centres to manage meditation courses, visitors, course participation, regular students, and volunteers across multiple centres with data isolation.

---

## 1. Approved Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **UI & Logic**: React, TypeScript, Vanilla CSS (Mobile-First Design System)
- **Backend & Database**: [Supabase](https://supabase.com/)
  - PostgreSQL (Source of Truth)
  - Supabase Auth (Individual user credentials, role foundation: `SUPER_ADMIN`, `CENTRE_USER`)
  - Row Level Security (RLS) for multi-centre data isolation
  - Supabase Private Storage (for future signed-URL profile assets)
- **Deployment**: Vercel
- **Version Control**: GitHub (`bk-centre-connect`)

---

## 2. Architecture & Design Principles

```
UI (Mobile-First, Responsive, Fast)
       ↓
Next.js Server / API Layer (App Router, Server Actions, Route Handlers)
       ↓
Business Logic (Isolated Centre Scope, Role Checks)
       ↓
Data Access (@supabase/ssr Client & Server Separation)
       ↓
Supabase PostgreSQL (Source of Truth with RLS)
```

- **Person-Centric Model**: The central identity is `PERSON`. Progression stages (`New visitor` → `Course participant` → `Regular student` → `Volunteer`) are managed without creating duplicate person records.
- **Multi-Centre Isolation**: One application and database serve multiple centres. Centre access is strictly scoped via PostgreSQL RLS.
- **No Over-Engineering**: Clean, modular structure without microservices or unnecessary libraries.
- **Clean Client Separation**:
  - `src/lib/supabase/client.ts` — Browser-side client (`@supabase/ssr`)
  - `src/lib/supabase/server.ts` — Server-side client using Next.js `cookies()`
  - `src/lib/supabase/middleware.ts` & `src/middleware.ts` — Automatic session refreshing and route protection

---

## 3. Project Structure

```
bk-centre-connect/
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript compiler options
├── README.md                        # Documentation
├── supabase/
│   └── migrations/                  # Version-controlled SQL migrations (future)
│       └── README.md
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout with mobile-first viewport
    │   ├── globals.css              # Vanilla CSS theme variables & utilities
    │   ├── page.tsx                 # Root landing page (server auth check)
    │   ├── login/
    │   │   ├── page.tsx             # Login page
    │   │   ├── LoginForm.tsx        # Client login form
    │   │   └── actions.ts           # Login server action
    │   ├── auth/
    │   │   ├── callback/route.ts    # Supabase auth exchange handler
    │   │   └── signout/route.ts     # Sign-out route handler
    │   └── app/                     # Protected centre workspace
    │       ├── layout.tsx           # Authenticated application shell & header
    │       └── page.tsx             # Protected foundation status page
    ├── lib/
    │   └── supabase/
    │       ├── client.ts            # Client-side Supabase helper
    │       ├── server.ts            # Server-side Supabase helper
    │       └── middleware.ts        # Supabase middleware helper
    ├── types/
    │   ├── auth.ts                  # User session and auth state types
    │   └── database.types.ts        # Database schema and role types
    └── middleware.ts                # Next.js edge route protection
```

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js (v18.17+ or v20+ recommended)
- npm, pnpm, or yarn

### 1. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

> **Security Note**: Never expose Supabase secret or service-role keys in client-side code or commit `.env.local` to git.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 5. Route Structure

| Route | Type | Description |
|---|---|---|
| `/` | Public | Home landing page. Automatically redirects authenticated users to `/app`. |
| `/login` | Public | Centre user & administrator sign-in. Automatically redirects to `/app` if already authenticated. |
| `/auth/callback` | Public / API | Handles authentication redirects and code exchange. |
| `/auth/signout` | API | Clears auth session and redirects to `/login`. |
| `/app` | Protected | Authenticated workspace. Accessible only to logged-in users; unauthenticated requests redirect to `/login`. |
| `/c/{centreSlug}/join` | Public (Planned) | Public visitor intake form (to be added in future module; no CRM access). |

---

## 6. Next Steps

Subsequent development stages will introduce:
1. Version-controlled Supabase migration files for the 17 approved tables.
2. PostgreSQL Row Level Security (RLS) policies enforcing multi-centre isolation.
3. Centre and Person identity foundation.
4. Public intake workflows and course management modules.
