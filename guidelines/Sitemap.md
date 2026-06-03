# Trust Axis Platform — Complete Sitemap

This document maps every route across both Next.js applications in the monorepo.

---

## Subdomain Strategy

| Subdomain | App Directory | Purpose |
| :--- | :--- | :--- |
| `trustacg.com` | `/frontend` | Main marketing site, auth, user dashboard |
| `train.trustacg.com` | `/courses-page` | Course catalog & brochure |

---

## App 1: Main Website (`trustacg.com`) — `/frontend`

```
trustacg.com/
├── /                              → Landing Page (Hero, Services, Courses overview, Testimonials, CTA)
│
├── /about                         → About Us (Team, Vision, Mission, Values)
│
├── /consultancy                   → Consultancy Listing (All service verticals)
│   └── /consultancy/[slug]        → Individual Consultancy Detail Page
│       (Slugs: fintech, grc, cyber-data-privacy, tprm, ai-strategy, cryptography)
│
├── /contact                       → Contact Form / Inquiry Page
│
├── /resources                     → Resources Hub (Featured blogs, articles, whitepapers)
│   ├── /resources/blogs           → Blog Listing Page
│   ├── /resources/articles        → Articles Listing Page
│   └── /resources/whitepapers     → Whitepapers Listing Page
│
├── /sustainability                → Sustainability / ESG Page
│
├── /value-proposition             → Value Proposition / Why Trust Axis Page
│
├── /privacy-policy                → Privacy Policy
│
├── /terms-and-conditions          → Terms & Conditions
│
├── /login                         → Login Page (Email/Password + Google OAuth)
│
├── /signup                        → Registration Page (Email/Password + Google OAuth)
│
├── /onboarding                    → Student Onboarding Flow (Multi-step profile setup)
│   └── (Client Component: OnboardingClient.tsx)
│
├── /profile                       → Student Profile Page (View & Edit)
│   └── (Client Component: ProfileForm.tsx)
│
└── /api                           → Backend API Routes
    ├── /api/auth/[...all]         → Better Auth handler (all auth operations)
    ├── /api/onboarding/complete   → POST: Mark onboarding as complete
    ├── /api/profile/update        → POST: Update student profile data
    └── /api/dev/api-log           → GET/POST: Developer API logging (dev only)
```

---

## App 2: Course Catalog (`train.trustacg.com`) — `/courses-page`

```
train.trustacg.com/
├── /                              → Course Catalog Home (All courses grid, filters)
│
└── /courses/[slug]                → Individual Course Detail Page
    (Displays: title, description, curriculum, trainer, price, enroll CTA)
```

---

## Route Access Control

| Route | Authentication Required | Notes |
| :--- | :--- | :--- |
| `/` | No | Public |
| `/about` | No | Public |
| `/consultancy` | No | Public |
| `/contact` | No | Public |
| `/resources/**` | No | Public |
| `/sustainability` | No | Public |
| `/value-proposition` | No | Public |
| `/privacy-policy` | No | Public |
| `/terms-and-conditions` | No | Public |
| `/login` | No | Redirects to `/profile` if already logged in |
| `/signup` | No | Redirects to `/onboarding` after success |
| `/onboarding` | **Yes** | Protected; redirects to `/login` if no session |
| `/profile` | **Yes** | Protected; redirects to `/login` if no session |
| `/api/auth/**` | No | Handled by Better Auth |
| `/api/onboarding/complete` | **Yes** | Session required |
| `/api/profile/update` | **Yes** | Session required |
| `train.trustacg.com/**` | No | Public catalog, no auth required |

---

## Middleware Behavior

The `middleware.ts` in `/frontend` applies to every non-static route:
1. **Public paths** (`/`, `/login`, `/signup`, `/api/auth`, static assets) → Always allowed.
2. **Protected paths** → Checks for Better Auth session cookie.
   - Cookie found → Proceed.
   - Cookie missing → Redirect to `/login?callbackUrl=<original-path>`.

---

## Future Routes (Planned)

| Route | Status | Description |
| :--- | :--- | :--- |
| `/dashboard` | Planned | Student dashboard with enrolled courses |
| `/dashboard/courses` | Planned | My enrolled courses + Thinkific SSO access |
| `/dashboard/rewards` | Planned | Reward points & tier tracker |
| `/admin` | Planned | Admin panel (user/course/payment management) |
| `/admin/users` | Planned | User management |
| `/admin/courses` | Planned | Course catalog management |
| `/admin/payments` | Planned | Payment reconciliation |
| `/trainer/onboarding` | Planned | Trainer application & profile form |
| `/api/checkout/course` | Planned | Create payment intent for course purchase |
| `/api/lms/sso-url` | Planned | Generate Thinkific SSO URL |
| `/api/lms/webhooks/progress` | Planned | Receive Thinkific progress webhooks |
| `/api/webhooks/stripe` | Planned | Handle Stripe payment events |
| `/api/webhooks/razorpay` | Planned | Handle Razorpay payment events |
