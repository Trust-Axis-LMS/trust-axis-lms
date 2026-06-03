# Trust Axis Platform — Data Flow Documentation

This document describes how data moves through the Trust Axis system for every major user journey and integration event.

---

## 1. Authentication Flows

### 1.1 Sign Up (Email/Password)

```
[User] → fills form on /signup
  → POST /api/auth/sign-up/email  (Better Auth handler)
  → Better Auth creates row in `public.users` (via Prisma)
  → Session cookie set (.trustacg.com domain, cross-subdomain)
  → Redirect → /onboarding
```

### 1.2 Sign Up / Sign In (Google OAuth)

```
[User] → clicks "Continue with Google" on /login or /signup
  → GET /api/auth/sign-in/social?provider=google
  → Redirect to Google OAuth consent screen
  → Google redirects back → /api/auth/callback/google
  → Better Auth verifies token, creates/updates row in `public.users`
  → Session cookie set
  → Redirect → / or callbackUrl
```

### 1.3 Sign In (Email/Password)

```
[User] → fills form on /login
  → POST /api/auth/sign-in/email
  → Better Auth verifies credentials via Prisma (bcrypt hash check)
  → Session cookie refreshed
  → Redirect → callbackUrl or /profile
```

### 1.4 Session Validation (Every Protected Request)

```
[User] → navigates to /profile or /onboarding
  → middleware.ts runs on Next.js Edge Runtime
  → getSessionCookie(request) checks for Better Auth cookie
    → Cookie missing → Redirect to /login?callbackUrl=<path>
    → Cookie present → NextResponse.next() (allow through)
  → Server Component reads full session via auth.api.getSession()
  → User data passed to component
```

### 1.5 Cross-Subdomain Session Sharing

```
User logs in at trustacg.com
  → Cookie set with domain=".trustacg.com"
  → Cookie is automatically sent to train.trustacg.com
  → courses-page middleware reads same cookie
  → Authenticated state shared across both apps
```

---

## 2. Student Onboarding Flow

```
[New User after signup]
  → Redirected to /onboarding
  → OnboardingClient.tsx renders multi-step form:
      Step 1: Personal info (phone, status)
      Step 2: Academic background (education, college, year)
      Step 3: Career goals (target role, target companies, salary)
      Step 4: Skills & learning preferences

  → On final submit:
      POST /api/onboarding/complete
        → Server verifies session
        → Upserts row in `public.student_profiles` via Prisma
        → Sets `student_profiles.onboarding_done = true`
        → Returns success response

  → Client redirects → /profile
```

---

## 3. Profile Update Flow

```
[Authenticated Student] → navigates to /profile
  → ProfileForm.tsx loads current StudentProfile data
  → User edits fields (career info, skills, LinkedIn, resume URL)
  → Clicks Save

  → POST /api/profile/update
      → Server verifies session
      → Validates incoming fields
      → Updates `public.student_profiles` via Prisma
      → Returns updated profile data

  → UI shows success toast
```

---

## 4. Course Catalog Flow (Courses-Page App)

```
[User] → visits train.trustacg.com
  → page.tsx fetches courses data (from API or static data)
  → Renders course grid with filters (category, level, search)

[User] → clicks a course card
  → /courses/[slug] page loads
  → Fetches course metadata (title, description, price, trainer, curriculum)
  → Renders course detail with Enroll CTA

[User clicks Enroll] → (Planned)
  → Check session (redirect to login if needed)
  → POST /api/checkout/course
  → Payment flow begins (see Section 5)
```

---

## 5. Course Purchase & Enrollment Flow (Planned)

```
[Authenticated User] → clicks "Enroll" on a course
  → POST /api/checkout/course { course_id, payment_provider }
      → Create `payments` row with status='created'
      → Call Stripe/Razorpay API to create payment intent
      → Return client_secret (Stripe) or order_id (Razorpay)

  → Frontend renders payment UI (Stripe Elements / Razorpay checkout)
  → User completes payment

  → Payment provider sends Webhook:
      POST /api/webhooks/stripe  OR  POST /api/webhooks/razorpay
        → Verify webhook signature (HMAC)
        → Update `payments.status` = 'succeeded', set `paid_at`
        → Create/activate `enrollments` row for user+course
        → Insert `rewards_events` { source: 'course_purchase', points_delta: X }
        → Update `users.reward_points` += X
        → Call internal: POST /api/lms/sync-enrollment { user_id, course_id }

  → LMS Sync (Internal):
      → Read user email + course's `thinkific_course_id` from Supabase
      → Call Thinkific Admin API: GET /api/v2/users?email=...
          → If not found: POST /api/v2/users (create Thinkific user)
      → POST /api/v2/enrollments (enroll user in Thinkific course)
      → Store `thinkific_enrollment_id` on enrollments row

  → Email sent to student: "You're enrolled!" (planned, via Supabase transactional email)
```

---

## 6. Course Progress Sync Flow (Planned — Thinkific Webhooks)

```
[Student] → watches lesson on Thinkific (train.trustacg.com SSO redirect)
  → Thinkific fires webhook on lesson completion:
      POST /api/lms/webhooks/progress  (HMAC-verified)
        → Parse payload: user email, enrollment ID, lesson count, completion %
        → Lookup user by email in `public.users`
        → Lookup enrollment by `thinkific_enrollment_id`
        → Update `enrollments.progress_percent`
        → Update `enrollments.last_synced_at`
        → If progress = 100%:
            → Set `enrollments.status` = 'completed'
            → Set `enrollments.completed_at` = now()
            → Insert `rewards_events` { source: 'course_completed', points_delta: Y }
            → Update `users.reward_points` += Y
```

---

## 7. Consultancy Booking Flow (Planned)

```
[User] → browses /consultancy
  → Views consultancy verticals (Fintech, GRC, Cyber, TPRM, AI, Cryptography)
  → Clicks a vertical → /consultancy/[slug]
  → Views trainer profiles and session offerings

[User clicks Book]
  → POST /api/consultancy/book { offering_id, preferred_time, notes, payment_provider }
      → Validate user session
      → Create `consultancy_bookings` row with status='pending_payment'
      → Create `payments` row with payment_type='consultancy'
      → Initiate payment flow (same as course payment above)

  → On payment success webhook:
      → Update `payments.status` = 'succeeded'
      → Update `consultancy_bookings.status` = 'confirmed'
      → Insert `rewards_events` { source: 'consultancy_booked', points_delta: Z }
      → Notify trainer (planned email)
```

---

## 8. Admin Data Flows (Planned)

```
Admin Dashboard Routes: /admin/**
  → All routes guarded by `requireAdmin` middleware (role === 'admin')

Admin → GET /api/admin/users
  → Returns paginated list from `public.users`

Admin → PATCH /api/admin/users/:id
  → Updates role, reward points, or other fields

Admin → POST /api/admin/courses
  → Inserts course metadata into `public.courses`
  → Optionally stores `thinkific_course_id` for LMS sync

Admin → POST /api/admin/lms/sync-course
  → Links existing course to a Thinkific course ID
```

---

## 9. Developer API Logging Flow (Dev Only)

```
Any API call → lib/api-logger.ts intercepts
  → Logs request method, path, timestamp, response status
  → Appended to in-memory log store

GET /api/dev/api-log
  → Returns recent API call log for developer inspection
  → Only accessible in development environment (NODE_ENV !== 'production')
```

---

## 10. Data Entity Relationships

```
auth.users (Better Auth identity)
  ↕ 1:1
public.users (custom profile, role, points)
  ├── 1:1 → student_profiles (extended onboarding data)
  ├── 1:N → sessions (active sessions)
  ├── 1:N → accounts (OAuth providers)
  ├── 1:N → payments (purchases)
  ├── 1:N → enrollments (course access)
  ├── 1:N → rewards_events (point history)
  └── 1:N → consultancy_bookings (session bookings)

public.courses (course catalog)
  ├── 1:N → enrollments
  └── 1:N → payments (course payments)

public.trainers (instructor profiles)
  ├── 1:N → courses (teaches)
  ├── 1:N → consultancy_offerings (session types)
  └── 1:N → consultancy_bookings

public.consultancy_offerings (bookable session types)
  └── 1:N → consultancy_bookings

public.consultancy_bookings
  └── 1:1 → payments
```

---

## 11. External Service Integration Points

| Event | Our System | External Service | Direction |
| :--- | :--- | :--- | :--- |
| User signs in with Google | `/api/auth/callback/google` | Google OAuth | ← Inbound |
| User purchases a course | `/api/checkout/course` | Stripe / Razorpay | → Outbound |
| Payment confirmed | `/api/webhooks/stripe` or `/razorpay` | Stripe / Razorpay | ← Inbound (Webhook) |
| Enroll student in LMS | `/api/lms/sync-enrollment` | Thinkific Admin API | → Outbound |
| Student opens course | `/api/lms/sso-url` | Thinkific SSO | → Outbound |
| Student completes lesson | `/api/lms/webhooks/progress` | Thinkific | ← Inbound (Webhook) |
| Send transactional email | Internal trigger | Supabase / Resend | → Outbound (Planned) |
