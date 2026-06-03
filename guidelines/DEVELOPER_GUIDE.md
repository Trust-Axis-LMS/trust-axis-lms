# Trust Axis — Developer Guide

A complete technical reference for developers working on the Trust Axis monorepo. Covers local setup, project structure, coding conventions, and contribution workflows.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Structure](#2-project-structure)
3. [Local Development Setup](#3-local-development-setup)
4. [Environment Variables](#4-environment-variables)
5. [Authentication System](#5-authentication-system)
6. [Database & ORM](#6-database--orm)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Courses-Page Architecture](#8-courses-page-architecture)
9. [API Routes Reference](#9-api-routes-reference)
10. [Middleware & Route Protection](#10-middleware--route-protection)
11. [Adding New Features](#11-adding-new-features)
12. [Code Conventions](#12-code-conventions)

---

## 1. Prerequisites

| Tool | Version | Install |
| :--- | :--- | :--- |
| Node.js | v20+ | [nodejs.org](https://nodejs.org) |
| pnpm / npm | Latest | `npm install -g pnpm` |
| PostgreSQL | via Supabase (cloud) | [supabase.com](https://supabase.com) |
| Git | Latest | Pre-installed on macOS |

---

## 2. Project Structure

```
trust-axis-code/                    ← Monorepo root
├── frontend/                       ← Main marketing site (trustacg.com)
│   ├── src/
│   │   ├── app/                    ← Next.js App Router pages & API routes
│   │   │   ├── page.tsx            ← Landing page
│   │   │   ├── layout.tsx          ← Root layout (fonts, providers)
│   │   │   ├── about/page.tsx
│   │   │   ├── consultancy/
│   │   │   ├── contact/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── onboarding/
│   │   │   ├── profile/
│   │   │   ├── resources/
│   │   │   └── api/                ← Backend API route handlers
│   │   │       ├── auth/[...all]/  ← Better Auth catch-all handler
│   │   │       ├── onboarding/complete/
│   │   │       ├── profile/update/
│   │   │       └── dev/api-log/
│   │   ├── components/             ← Shared UI components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero-carousel.tsx
│   │   │   ├── articles-page.tsx
│   │   │   ├── resource-page-shell.tsx
│   │   │   ├── user-profile.tsx
│   │   │   └── ui/                 ← shadcn/ui component library
│   │   ├── lib/                    ← Utility & service modules
│   │   │   ├── auth.ts             ← Better Auth server configuration
│   │   │   ├── auth-client.ts      ← Better Auth browser client
│   │   │   ├── prisma.ts           ← Prisma client singleton
│   │   │   ├── api-logger.ts       ← Dev API request logger
│   │   │   ├── consultancy-data.ts ← Static consultancy content
│   │   │   ├── url.ts              ← App URL constants
│   │   │   └── utils.ts            ← Shared utilities (cn, etc.)
│   │   └── middleware.ts           ← Auth protection middleware
│   ├── prisma/
│   │   └── schema.prisma           ← Database schema (Postgres via Supabase)
│   ├── public/                     ← Static assets
│   ├── .env                        ← Local env (gitignored)
│   ├── .env.development            ← Dev env overrides
│   ├── .env.production             ← Prod env overrides
│   └── .env.example                ← Template for required variables
│
├── courses-page/                   ← Course catalog (train.trustacg.com)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            ← Course catalog listing
│   │   │   ├── layout.tsx
│   │   │   └── courses/[slug]/     ← Individual course detail page
│   │   ├── components/             ← Courses-specific components
│   │   ├── lib/                    ← Courses-page utilities
│   │   ├── utils/                  ← Data helpers
│   │   └── middleware.ts           ← (Lightweight auth check)
│   └── .env
│
├── guidelines/                     ← Project documentation
│   ├── Guidelines.md               ← Tech stack & coding rules
│   ├── Sitemap.md                  ← All routes across both apps
│   ├── Dataflow.md                 ← Data flows & integration points
│   └── DEVELOPER_GUIDE.md         ← This file
│
├── api-security/                   ← Security testing scripts
├── SYSTEM_ARCHITECTURE.md          ← High-level platform overview
├── backend-architecture-master.md  ← Detailed backend design spec
├── master_plan.md                  ← Product roadmap
├── package.json                    ← Root monorepo script runner
└── dev.sh                          ← Development startup script
```

---

## 3. Local Development Setup

### Step 1: Clone & Install Dependencies

```bash
# Clone the repository
git clone <repo-url>
cd trust-axis-code

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install courses-page dependencies
cd courses-page && npm install && cd ..
```

### Step 2: Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp frontend/.env.example frontend/.env
```

See [Section 4](#4-environment-variables) for all required variables.

### Step 3: Set Up the Database

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the **Database Connection String (URI)** from Supabase → Settings → Database
3. Paste it as `DATABASE_URL` in `frontend/.env`
4. Run the Prisma migration:

```bash
cd frontend
npx prisma db push     # Push schema to Supabase (development)
npx prisma generate    # Generate Prisma client
```

### Step 4: Start Both Apps

**Recommended: Use the root dev script**

```bash
# From the monorepo root
npm run dev
```

This starts:
- `frontend` → [http://localhost:3000](http://localhost:3000)
- `courses-page` → [http://localhost:3001](http://localhost:3001)

**Or start individually:**

```bash
# Terminal 1 — Main site
cd frontend && npm run dev

# Terminal 2 — Courses catalog
cd courses-page && npm run dev
```

---

## 4. Environment Variables

### `frontend/.env`

```env
# ─── Database (Supabase Postgres via Prisma) ──────────────────────────────────
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[ref].supabase.co:5432/postgres

# ─── Supabase (for Storage, Edge Functions, etc.) ────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Server-side only — never expose to browser

# ─── Better Auth ──────────────────────────────────────────────────────────────
BETTER_AUTH_SECRET=<random-32-char-string>   # Generate: openssl rand -hex 32
BETTER_AUTH_URL=http://localhost:3000        # Full URL of main site

# ─── Google OAuth ─────────────────────────────────────────────────────────────
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# ─── App URLs ─────────────────────────────────────────────────────────────────
NEXT_PUBLIC_MAIN_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COURSES_SITE_URL=http://localhost:3001

# ─── Planned (add when implementing payments & LMS) ───────────────────────────
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# RAZORPAY_KEY_ID=rzp_test_...
# RAZORPAY_KEY_SECRET=...
# RAZORPAY_WEBHOOK_SECRET=...
# THINKIFIC_API_KEY=...
# THINKIFIC_SUBDOMAIN=trustacg
# THINKIFIC_WEBHOOK_SECRET=...
```

### `courses-page/.env`

```env
NEXT_PUBLIC_MAIN_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COURSES_SITE_URL=http://localhost:3001
BETTER_AUTH_URL=http://localhost:3000
```

---

## 5. Authentication System

### Overview

Authentication is powered by **[Better Auth](https://better-auth.com)** with a **Prisma adapter** pointing to Supabase Postgres.

| Feature | Implementation |
| :--- | :--- |
| Email/Password sign up & login | Built-in Better Auth handler |
| Google OAuth | Better Auth `socialProviders.google` |
| Session storage | `public.session` table (Prisma) |
| Session cookies | HttpOnly, cross-subdomain (`.trustacg.com`) |
| Session TTL | 7 days, refreshed every 24h |
| Password hashing | bcrypt (handled by Better Auth) |

### Server-Side Session (API Routes & Server Components)

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
if (!session) {
  return new Response("Unauthorized", { status: 401 });
}
const user = session.user; // { id, email, name, role, ... }
```

### Client-Side Auth (Browser)

```typescript
import { authClient } from "@/lib/auth-client";

// Sign in
await authClient.signIn.email({ email, password });

// Sign in with Google
await authClient.signIn.social({ provider: "google" });

// Sign out
await authClient.signOut();

// Get current session
const { data: session } = await authClient.getSession();
```

### Better Auth API Endpoints (auto-generated)

All auth routes are handled by the catch-all route at `frontend/src/app/api/auth/[...all]/route.ts`:

| Method | Path | Action |
| :--- | :--- | :--- |
| `POST` | `/api/auth/sign-up/email` | Register with email/password |
| `POST` | `/api/auth/sign-in/email` | Login with email/password |
| `GET` | `/api/auth/sign-in/social?provider=google` | Initiate Google OAuth |
| `GET` | `/api/auth/callback/google` | Google OAuth callback |
| `POST` | `/api/auth/sign-out` | Sign out (clears session cookie) |
| `GET` | `/api/auth/get-session` | Returns current session |

---

## 6. Database & ORM

### Technology

- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma (with `multiSchema` preview feature enabled)
- **Schema file:** `frontend/prisma/schema.prisma`

### Models (Current Schema)

| Model | Table | Description |
| :--- | :--- | :--- |
| `User` | `public.users` | Core user identity, role, reward points |
| `Session` | `public.session` | Active auth sessions |
| `Account` | `public.account` | OAuth provider linkages |
| `Verification` | `public.verification` | Email verification tokens |
| `StudentProfile` | `public.student_profiles` | Extended student onboarding data |

### Using Prisma in Code

```typescript
import { prisma } from "@/lib/prisma";

// Fetch a user with their profile
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { studentProfile: true },
});

// Upsert student profile
await prisma.studentProfile.upsert({
  where: { userId },
  create: { userId, ...profileData },
  update: { ...profileData },
});
```

### Running Migrations

```bash
cd frontend

# Push schema changes to DB (development only — no migration history)
npx prisma db push

# Create a tracked migration (use for production)
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (visual DB browser)
npx prisma studio
```

---

## 7. Frontend Architecture

### Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| Next.js | 14 / App Router | Framework, SSR, API routes |
| React | 19 | UI rendering |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| shadcn/ui | Latest | Component library (built on Radix UI) |
| Better Auth | Latest | Authentication |
| Prisma | 5 | ORM |

### Routing Convention (App Router)

All pages live in `frontend/src/app/`. Each directory with a `page.tsx` becomes a route.

```
app/
├── page.tsx                → / (Landing page)
├── layout.tsx              → Root layout (wraps all pages)
├── about/page.tsx          → /about
├── consultancy/
│   ├── page.tsx            → /consultancy
│   └── [slug]/page.tsx     → /consultancy/[slug] (dynamic)
├── onboarding/
│   ├── page.tsx            → /onboarding (Server Component wrapper)
│   └── OnboardingClient.tsx → Client Component (uses hooks, form state)
└── api/
    └── auth/[...all]/route.ts  → API handler (not a page)
```

### Server vs. Client Components

| Pattern | When to Use |
| :--- | :--- |
| **Server Component** (default) | Data fetching, no browser APIs, no state |
| **Client Component** (`"use client"`) | Form state, hooks, event listeners, `authClient` |

Keep Server Components as the outer wrapper to fetch session/data, then pass to a Client Component for interactivity. See `onboarding/page.tsx` + `OnboardingClient.tsx` as the reference pattern.

### Adding a New Page

1. Create `src/app/<route>/page.tsx`
2. Add it to `Sitemap.md`
3. If it needs auth protection, the middleware handles it automatically for all non-public paths
4. If the page needs to appear in navigation, update `components/header.tsx`

### Adding a New shadcn Component

```bash
cd frontend
npx shadcn add <component-name>
# Example: npx shadcn add dialog
```

The component appears in `src/components/ui/`.

---

## 8. Courses-Page Architecture

The courses-page is a **lightweight, read-only** Next.js app focused purely on the course catalog display. It does not run its own auth server — it reads the shared Better Auth session cookie set by the main `frontend` app.

### Key Differences from Frontend

| | `frontend` | `courses-page` |
| :--- | :--- | :--- |
| Auth server | **Yes** (runs Better Auth) | No |
| Database | **Yes** (Prisma + Supabase) | No direct DB |
| Purpose | Marketing + user flows | Course catalog display |
| Port (dev) | 3000 | 3001 |

### Adding New Courses

Course data is currently served statically. To add a course, update the course data source in `courses-page/src/utils/` or `lib/`.

---

## 9. API Routes Reference

All API routes live in `frontend/src/app/api/`. Each route is a `route.ts` file exporting HTTP method handlers.

### Pattern

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // 1. Validate session
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse & validate body
  const body = await req.json();

  // 3. Business logic via Prisma
  const result = await prisma.studentProfile.upsert({ ... });

  // 4. Return response
  return NextResponse.json({ success: true, data: result });
}
```

### Current Routes

| Method | Route | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/api/auth/[...all]` | — | Better Auth handler (all auth ops) |
| `POST` | `/api/onboarding/complete` | Required | Save student onboarding data |
| `POST` | `/api/profile/update` | Required | Update student profile fields |
| `GET` | `/api/dev/api-log` | Dev only | View recent API request logs |

---

## 10. Middleware & Route Protection

The middleware (`frontend/src/middleware.ts`) runs on the **Next.js Edge Runtime** for every request matching the `config.matcher` pattern.

### Logic

```
Request arrives
  ↓
Is path in PUBLIC_PATHS? (/login, /signup, /api/auth, /, /_next, favicons)
  → YES → Allow through (NextResponse.next())
  → NO  →
      Does request have a Better Auth session cookie?
        → YES → Allow through
        → NO  → Redirect to /login?callbackUrl=<original-path>
```

### Adding a New Protected Route

Protected routes work **automatically** — any path not in `PUBLIC_PATHS` requires a session. To add a new public (unprotected) route, add it to the `PUBLIC_PATHS` array in `middleware.ts`.

```typescript
const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/api/auth",
  "/",
  "/_next",
  "/favicon.ico",
  "/your-new-public-page",   // ← Add here
];
```

---

## 11. Adding New Features

### Checklist for a New Feature

- [ ] **Document it**: Add routes to `guidelines/Sitemap.md`, add data flows to `guidelines/Dataflow.md`
- [ ] **Database**: If new models are needed, update `prisma/schema.prisma` and run `npx prisma db push`
- [ ] **API Route**: Create `src/app/api/<feature>/route.ts` following the standard pattern
- [ ] **Page**: Create `src/app/<route>/page.tsx` (Server Component) + optional `<FeatureClient>.tsx` (Client Component)
- [ ] **Navigation**: Update `components/header.tsx` if the feature needs a nav link
- [ ] **Test it**: Test happy path, session-expired state, and error states

### Planned Feature: Payments

1. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` to `.env`
2. Add `courses`, `payments`, `enrollments` models to `schema.prisma`
3. Create `src/app/api/checkout/course/route.ts`
4. Create `src/app/api/webhooks/stripe/route.ts`
5. Update `Dataflow.md` Section 5 to mark as implemented

### Planned Feature: Thinkific LMS

1. Add `THINKIFIC_API_KEY`, `THINKIFIC_SUBDOMAIN`, `THINKIFIC_WEBHOOK_SECRET` to `.env`
2. Create `src/app/api/lms/sync-enrollment/route.ts`
3. Create `src/app/api/lms/webhooks/progress/route.ts`
4. Create `src/app/api/lms/sso-url/route.ts`

---

## 12. Code Conventions

### TypeScript

- **Strict mode**: Always enabled in `tsconfig.json`
- **No `any`**: Use proper types or `unknown` for untyped data
- **Imports**: Use absolute imports via `@/` alias (maps to `src/`)

### Naming

| Item | Convention | Example |
| :--- | :--- | :--- |
| Files | `kebab-case` | `hero-carousel.tsx` |
| Components | `PascalCase` | `HeroCarousel` |
| Functions | `camelCase` | `getSessionCookie` |
| Constants | `UPPER_SNAKE_CASE` | `MAIN_SITE_URL` |
| Prisma models | `PascalCase` | `StudentProfile` |
| DB table names | `snake_case` | `student_profiles` |

### Styling

- Use **Tailwind CSS** utility classes
- Use **shadcn/ui** components for all UI primitives (Button, Input, Card, Dialog, etc.)
- Keep custom CSS minimal — only in `globals.css` for base resets and design tokens
- Font: **Helvetica Neue** (set via CSS or Google Fonts equivalent)

### Git Workflow

```bash
# Feature branches off main
git checkout -b feature/<feature-name>

# Commit convention
git commit -m "feat: add student profile update API"
git commit -m "fix: correct session cookie domain in production"
git commit -m "docs: update sitemap with new consultancy routes"
```

Commit prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
