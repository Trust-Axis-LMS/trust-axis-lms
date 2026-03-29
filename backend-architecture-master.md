# Trust Axis Backend Architecture

## Description
Backend architecture and logic for Trust Axis cybersecurity ed-tech platform with Supabase (DB + Auth), Thinkific LMS integration, consultancy flows, and rewards.

## Project Structure
### Monorepo Apps
- **frontend_apps**:
  - **marketing_site**: Built with Next.js (`./apps/landing`)
  - **courses_app**: Built with Next.js (`./apps/courses`)
- **shared_backend**:
  - **Path**: `./apps/api`
  - **Runtime**: Node.js (v20)
  - **Framework**: Next.js App Router (v14)

## Tech Stack
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Next.js 14 App Router
- **Database**: Supabase Postgres
- **ORM**: Supabase JS
- **Auth**: Supabase Auth
- **LMS**: Thinkific
- **Payments**: Stripe, Razorpay

## Assumptions
- All persistent data (users, trainers, courses, payments, enrollments, rewards, consultancy) is stored in Supabase Postgres via the Supabase client.
- Supabase Auth is used for session handling via `@supabase/ssr` to support Server Components and Server Actions across both Next.js apps.
- Thinkific is integrated via its Admin REST API and Webhooks for user enrollments and progress sync; we store Thinkific user and enrollment IDs in Supabase.
- Payment providers (Stripe and/or Razorpay) send webhooks to our backend which then update the Supabase `payments` table and trigger LMS enrollment.
- Rewards system will start simple as points on the user plus an events table to make future gamification/leaderboards easier.
- Admin and Trainer roles are enforced via the `role` field on `public.users` plus authorization middleware on all `/api/admin/*` endpoints.

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `THINKIFIC_API_KEY`
- `THINKIFIC_SUBDOMAIN`
- `THINKIFIC_WEBHOOK_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `APP_BASE_URL`

## Authentication (Supabase Auth)
- **Strategies**: Email/Password, OAuth Google
- **Next.js Integration**:
  - Package: `@supabase/ssr`
  - Session Strategy: HTTP Only Cookies (managed via Supabase middleware)
  - User Model Extension: 
    - Supabase handles identity in `auth.users`. 
    - Custom profile data and `role` (student | trainer | admin) is anchored in `public.users`.

## Database (Supabase)
**Schema**: `public`

### Tables

#### `users`
Master user record for all authenticated identities; acts as the anchor for courses, payments, rewards, consultancy.
- `id`: uuid, primary_key, references `auth.users(id)`, on_delete: `cascade`
- `email`: text, unique, not_null
- `name`: text
- `avatar_url`: text
- `role`: text, check: `role IN ('student','trainer','admin')`, default: `'student'`
- `reward_points`: integer, default: `0`
- `reward_tier`: text, default: `'bronze'`
- `last_login_at`: timestamptz
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_users_email`, `idx_users_better_auth_user_id`

#### `trainers`
Onboarded trainers/consultants; extends users table for instructor-specific information.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `user_id`: uuid, references: `users.id`, on_delete: `cascade`, unique
- `phone`: text
- `experience_years`: integer
- `education`: text
- `subject_expertise`: text[] (*Array of expertise tags, e.g. ['Network Security','Cloud Security']*)
- `projects`: text
- `current_role`: text
- `linkedin_url`: text
- `bio`: text
- `is_active`: boolean, default: `true`
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_trainers_user_id`

#### `courses`
Course catalog metadata used on the website; Thinkific handles actual content hosting.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `slug`: text, unique, not_null
- `title`: text, not_null
- `short_description`: text
- `long_description`: text
- `cate`levgory`: text
- el`: text, check: `level IN ('beginner','intermediate','advanced')`
- `thumbnail_url`: text
- `price_inr`: integer (*Price in paise*)
- `price_usd`: integer (*Optional USD cents*)
- `duration_hours`: integer
- `primary_trainer_id`: uuid, references: `trainers.id`
- `thinkific_course_id`: text (*Foreign ID into Thinkific course*)
- `status`: text, check: `status IN ('draft','published','archived')`, default: `'draft'`
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_courses_slug`, `idx_courses_category`

#### `enrollments`
Mapping between users and courses, used for access control and LMS linkage.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `user_id`: uuid, references: `users.id`, on_delete: `cascade`
- `course_id`: uuid, references: `courses.id`, on_delete: `cascade`
- `payment_id`: uuid, references: `payments.id`
- `thinkific_enrollment_id`: text
- `status`: text, check: `status IN ('pending','active','completed','expired')`, default: `'pending'`
- `progress_percent`: integer, default: `0`
- `started_at`: timestamptz
- `completed_at`: timestamptz
- `expires_at`: timestamptz
- `last_synced_at`: timestamptz
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_enrollments_user_course` (columns: `user_id`, `course_id` - unique)

#### `payments`
Records for all monetary transactions (courses and consultancy).
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `user_id`: uuid, references: `users.id`, on_delete: `cascade`
- `course_id`: uuid, references: `courses.id`, nullable: `true`
- `consultancy_booking_id`: uuid, references: `consultancy_bookings.id`, nullable: `true`
- `amount`: integer (*Amount in minor units (paise/cents)*)
- `currency`: text, default: `'INR'`
- `payment_method`: text (*Card, UPI, NetBanking, etc.*)
- `payment_provider`: text, check: `payment_provider IN ('stripe','razorpay')`
- `payment_type`: text, check: `payment_type IN ('course','consultancy')`
- `external_payment_id`: text (*Stripe/Razorpay charge ID/order ID*)
- `status`: text, check: `status IN ('created','processing','succeeded','failed','refunded')`, default: `'created'`
- `paid_at`: timestamptz
- `expires_at`: timestamptz (*When access to purchased resource should be revoked.*)
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_payments_user_id`, `idx_payments_external_payment_id` (unique)

#### `rewards_events`
Event log for all reward point changes to support future analytics and gamification.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `user_id`: uuid, references: `users.id`, on_delete: `cascade`
- `source`: text (*signup, course_purchase, lesson_completed, consultancy_booked, etc.*)
- `points_delta`: integer
- `metadata`: jsonb
- `created_at`: timestamptz, default: `now()`
- **Indexes**: `idx_rewards_user_id`

#### `consultancy_offerings`
Types of consultancy services linked to trainers.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `trainer_id`: uuid, references: `trainers.id`, on_delete: `cascade`
- `title`: text, not_null
- `description`: text
- `duration_minutes`: integer
- `price_inr`: integer
- `price_usd`: integer
- `status`: text, check: `status IN ('draft','published','archived')`, default: `'draft'`
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`

#### `consultancy_bookings`
Bookings for 1:1 consultancy sessions between students and trainers.
- `id`: uuid, primary_key, default: `uuid_generate_v4()`
- `user_id`: uuid, references: `users.id`, on_delete: `cascade`
- `trainer_id`: uuid, references: `trainers.id`, on_delete: `cascade`
- `offering_id`: uuid, references: `consultancy_offerings.id`, on_delete: `cascade`
- `scheduled_at`: timestamptz
- `status`: text, check: `status IN ('pending_payment','confirmed','completed','cancelled')`, default: `'pending_payment'`
- `notes`: text
- `created_at`: timestamptz, default: `now()`
- `updated_at`: timestamptz, default: `now()`
- **Indexes**: `idx_consultancy_user_id`, `idx_consultancy_trainer_id`

---

## Services

### 1. `public_api`
APIs for registered users, trainers and anonymous visitors to interact with courses, consultancy, rewards.
**Base Path**: `/api`

| Method | Path | Auth Req. | Description | Details/Uses |
|--------|------|-----------|-------------|--------------|
| `GET`  | `/me` | Yes | Return current user profile with mapped Supabase user and summary of rewards. | Returns: `user`, `reward_points` |
| `GET`  | `/courses` | No | List published courses from Supabase for catalogs and search. | Query Params: `category`, `level`, `search`<br>Uses: `courses` |
| `GET`  | `/courses/:slug` | No | Get single course details, trainer info and published status. | Uses: `courses`, `trainers`, `users` |
| `POST` | `/checkout/course` | Yes | Create payment intent for a course and a pending payment row. | Body: `course_id`, `payment_provider`<br>Uses: `courses`, `payments` |
| `GET`  | `/enrollments` | Yes | List courses the user is enrolled in with current progress. | Uses: `enrollments`, `courses` |
| `GET`  | `/rewards` | Yes | Return current reward points and recent events for the user. | Uses: `users`, `rewards_events` |
| `GET`  | `/consultancy/offerings` | No | List published consultancy offerings with trainer info. | Uses: `consultancy_offerings`, `trainers`, `users` |
| `POST` | `/consultancy/book` | Yes | Create a pending consultancy booking and optional payment intent. | Body: `offering_id`, `preferred_time`, `notes`, `payment_provider`<br>Uses: `consultancy_bookings`, `payments` |
| `GET`  | `/consultancy/bookings` | Yes | List current user's consultancy bookings. | Uses: `consultancy_bookings`, `consultancy_offerings`, `trainers` |

### 2. `admin_api`
Admin-only APIs with full access to Supabase tables to manage courses, trainers, users, resources and mappings.
**Base Path**: `/api/admin`
**Authorization**: `role_admin`

| Method | Path | Description | Details/Uses |
|--------|------|-------------|--------------|
| `GET`  | `/users` | List users with pagination and filters. | Uses: `users` |
| `PATCH`| `/users/:id` | Update user role, reward points or other metadata. | Uses: `users` |
| `GET`  | `/trainers` | List trainer records with linked user profiles. | Uses: `trainers`, `users` |
| `POST` | `/trainers` | Create or approve trainer profile mapped to a user. | Uses: `trainers`, `users` |
| `POST` | `/courses` | Create a new course metadata record, optionally linking to an existing Thinkific course ID. | Uses: `courses` |
| `PATCH`| `/courses/:id` | Update course metadata (title, descriptions, price, trainer, status). | Uses: `courses` |
| `GET`  | `/payments` | View all payments for reconciliation and support. | Uses: `payments`, `users`, `courses`, `consultancy_bookings` |
| `GET`  | `/consultancy/offerings` | List all consultancy offerings. | Uses: `consultancy_offerings`, `trainers` |
| `POST` | `/consultancy/offerings` | Create/update consultancy offerings for trainers. | Uses: `consultancy_offerings` |
| `POST` | `/lms/sync-course` | Manually sync or update Thinkific course ID mapping for a course. | Body: `course_id`, `thinkific_course_id`<br>Uses: `courses` |

### 3. `payments_webhooks`
Stripe/Razorpay webhook handlers to mark payments succeeded/failed and trigger enrollments.
**Base Path**: `/api/webhooks`

| Method | Path | Description | On Success Hooks |
|--------|------|-------------|------------------|
| `POST` | `/stripe` | Handle Stripe events: `payment_intent.succeeded`, `payment_intent.payment_failed`. | - Update `payments.status` to 'succeeded'<br>- Set `payments.paid_at` and `payments.expires_at`<br>- If `payment_type` == 'course', create or activate enrollment row<br>- Insert `rewards_events` for course_purchase<br>- Optionally call LMS integration to create Thinkific user/enrollment |
| `POST` | `/razorpay` | Handle Razorpay payment authorized/captured events. | - Update `payments.status` to 'succeeded'<br>- Set `payments.paid_at` and `payments.expires_at`<br>- If `payment_type` == 'course', create or activate enrollment row<br>- Insert `rewards_events` for course_purchase<br>- Optionally call LMS integration to create Thinkific user/enrollment |

### 4. `lms_integration_service`
Thinkific LMS integration endpoints to create users/enrollments and consume progress webhooks.
**Base Path**: `/api/lms`

| Method | Path | Auth Req. | Description | Steps/Inputs |
|--------|------|-----------|-------------|--------------|
| `POST` | `/sync-enrollment` | No (Internal Only) | Internal helper called after payment success to ensure Thinkific user and enrollment exist. | Inputs: `user_id`, `course_id`<br>Steps:<br>1. Read users and courses from Supabase<br>2. Call Thinkific Admin API: ensure user exists with email<br>3. Create enrollment in Thinkific for the course<br>4. Store `thinkific_enrollment_id` on enrollments row |
| `POST` | `/webhooks/progress` | Yes (HMAC) | Receive Thinkific webhook when a lesson is completed or progress is updated. | Steps:<br>1. Parse webhook payload to find user email/IDs<br>2. Lookup user and enrollment in Supabase<br>3. Update `enrollments.progress_percent` and `last_synced_at`<br>4. When 100%, set `status`='completed' and `completed_at`<br>5. Insert `rewards_events` for lesson_completed or course_completed |
| `GET`  | `/sso-url` | Yes | Generate SSO URL for a user to access a Thinkific course from dashboard. | Query Params: `course_id`<br>Steps:<br>1. Verify user has active enrollment for `course_id` and not expired<br>2. Generate Thinkific SSO JWT or appropriate redirect URL<br>3. Return URL for frontend to redirect user into Thinkific course player |

---

## Architectures & Key Flows

### 1. Registered User and Trainer Architecture
*Flow from BetterAuth-authenticated users and trainers through Next.js frontend into Supabase-backed APIs.*
- User authenticates via Supabase Auth (email/password or Google).
- On signup, a Postgres trigger or webhook creates the corresponding row in `public.users`, linking the generic identity.
- User browses courses (`GET /api/courses`, `/api/courses/:slug`).
- User purchases a course (`POST /api/checkout/course`) which creates payments and triggers payment provider checkout.
- On webhook confirmation, backend creates enrollment and triggers LMS sync.
- Trainer onboarding form posts into `/api/admin/trainers` or a protected public endpoint, populating `public.trainers` and linking to users.
- User actions (purchases, progress) generate `rewards_events` and update `users.reward_points`.

### 2. Admin Architecture
*Admin-only flows to fully manage catalog, trainers, users, payments, consultancy and mappings.*
- Admin logs in via Supabase Auth; `role=admin` is determined from the `public.users` table.
- Admin accesses `/api/admin/*` endpoints guarded by `requireAdmin` middleware.
- Admin CRUDs courses, which update `public.courses` and optionally Thinkific mappings.
- Admin approves trainers, linking a user to `trainers` row with profile details.
- Admin maps user emails to course enrollments by creating enrollments rows manually where necessary.
- Admin manages consultancy offerings and sees bookings and payments for them.

### 3. Third-Party LMS Architecture
*Separate LMS service (Thinkific) added into main website; used for course content, assessments, and progress.*
- After successful payment, backend ensures Thinkific user exists using Admin API and creates an enrollment.
- User launches course from dashboard via SSO URL from `/api/lms/sso-url`.
- Thinkific hosts videos and assessments; on progress and completion events, it calls our `/api/lms/webhooks/progress` endpoint.
- Backend updates Supabase enrollments and rewards based on webhook payload.
- Landing/courses frontend reads enrollments and progress from Supabase to show unified view without hitting Thinkific directly.