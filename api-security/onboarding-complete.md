# API Security Test: `POST /api/onboarding/complete`

## Endpoint Goal
This endpoint allows a newly authenticated user (via Better Auth) to set up their initial `StudentProfile` row in Supabase, capturing metadata like current status, areas of interest, and goals.

## Potential Vulnerabilities to Cover

1. **Authentication Bypass**: Ensuring unauthorized (unauthenticated) traffic receives a `401 Unauthorized` without modifying the database.
2. **Insecure Direct Object Reference (IDOR)**: Preventing a user from setting the onboarding data for *another* user.
3. **Mass Assignment**: Preventing users from injecting unallowed fields (like escalating their role, injecting reward points, or hijacking payment data) during profile creation.

## Test Cases

### 1. Missing Authentication Token
**Expected Result:** `401 Unauthorized`
**Purpose:** Verify the endpoint enforces `session` presence before processing.
```bash
curl -X POST http://localhost:3000/api/onboarding/complete \
  -H "Content-Type: application/json" \
  -d '{"currentStatus": "student"}'
```

### 2. Invalid or Expired Token
**Expected Result:** `401 Unauthorized`
**Purpose:** Verify the endpoint rejects forged or expired tokens.
```bash
curl -X POST http://localhost:3000/api/onboarding/complete \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=INVALID_TOKEN123" \
  -d '{"currentStatus": "student"}'
```

### 3. IDOR / Forced User ID Injection
**Expected Result:** `200 OK` (but it must apply to the *authenticated user*, NOT the injected `userId`)
**Purpose:** Ensure the endpoint grabs the `userId` directly from the server-side session and ignores any `userId` passed in the body.
```bash
curl -X POST http://localhost:3000/api/onboarding/complete \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=<YOUR_SESSION_TOKEN>" \
  -d '{"userId": "11111111-1111-1111-1111-111111111111", "currentStatus": "student"}'
```

### 4. Mass Assignment Check
**Expected Result:** `200 OK` (but illegal fields must be dropped)
**Purpose:** Ensure the endpoint does not blindly spread the `body` into the Prisma upsert. Injecting `.reward_points` or `role` should have no effect on the database.
```bash
curl -X POST http://localhost:3000/api/onboarding/complete \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=<YOUR_SESSION_TOKEN>" \
  -d '{
    "currentStatus": "student",
    "reward_points": 9999,
    "role": "admin"
  }'
```

---

## Developer Security Review Checklist
- [x] Endpoint calls `auth.api.getSession()`.
- [x] Fails early with `401` if session is null.
- [x] Prisma uses `where: { userId: session.user.id }` natively for updates and creation. (Mitigates IDOR).
- [x] Prisma `data` object specifies only allowed fields (`currentStatus`, `areaOfInterest`, `goal`, `phone`, `linkedinUrl`). (Mitigates Mass Assignment).
