# API Security Test: `POST /api/profile/update`

## Endpoint Goal
This endpoint allows an authenticated student or professional to continually update their user profile within the LMS, altering details like education, current role, job goals, or learning mode.

## Potential Vulnerabilities to Cover

1. **Authentication Bypass**: Ensuring unauthorized users cannot update internal records.
2. **Insecure Direct Object Reference (IDOR)**: The endpoint relies on `auth.getSession().user` rather than accepting a dynamic unauthenticated `id` as the primary key.
3. **Mass Assignment**: The `POST` body shouldn’t implicitly be mapped to Prisma, avoiding unwanted writes to things like `id` or foreign keys outside of its intended scope.
4. **Data Integrity Validations (Future Proofing)**: Making sure fields like integers don't throw server crashes on malformed inputs (NaN values).

## Test Cases

### 1. Missing Authentication Token
**Expected Result:** `401 Unauthorized`
**Purpose:** Verify the endpoint enforces `session` presence before processing.
```bash
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -d '{"educationLevel": "Graduated"}'
```

### 2. Invalid or Expired Token
**Expected Result:** `401 Unauthorized`
**Purpose:** Verify the endpoint rejects forged or expired tokens.
```bash
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=INVALID_TOKEN123" \
  -d '{"educationLevel": "Graduated"}'
```

### 3. IDOR / Forced User ID Injection
**Expected Result:** `200 OK` (applied solely to the owner of the session token, NOT the injected ID param)
**Purpose:** Ensure the endpoint grabs the `userId` directly from the server-side session, completely ignoring any injection attempt in the body.
```bash
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=<YOUR_SESSION_TOKEN>" \
  -d '{
    "userId": "22222222-2222-2222-2222-222222222222", 
    "educationLevel": "Graduated"
  }'
```

### 4. Mass Assignment Check
**Expected Result:** `200 OK` (but illegal fields must be dropped)
**Purpose:** Protect `reward_tier`, `reward_points`, or `role` fields via strict Prisma object definitions.
```bash
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=<YOUR_SESSION_TOKEN>" \
  -d '{
    "reward_points": 9999,
    "role": "admin",
    "onboardingDone": false
  }'
```

### 5. Malformed Type Handing Check Node/Prisma Crashes
**Expected Result:** Should handle `NaN` gracefully (e.g. converting it correctly or ignoring it) rather than generating a `500 Internal Server error`.
**Purpose:** Validating that integer parsing bounds logic works without crashing the Node application.
```bash
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=<YOUR_SESSION_TOKEN>" \
  -d '{
    "graduationYear": "abc",
    "yearsExperience": "undefined",
    "studyHoursPerWeek": "lots"
  }'
```

---

## Developer Security Review Checklist
- [x] Endpoint calls `auth.api.getSession()`.
- [x] Fails early with `401` if session is null.
- [x] `userId` is retrieved ONLY from the `session.user.id`.
- [x] Explicit extraction of fields `currentStatus, areasOfInterest, goals, etc.` instead of blind spread operators `update: { ...body }`.
- [ ] Needs a guard around `parseInt` logic. Currently `parseInt("abc", 10)` sets fields to `NaN` causing a `PrismaClientValidationError`. Suggest applying a check on parsed ints `Number.isNaN()` before inserting them into DB.
