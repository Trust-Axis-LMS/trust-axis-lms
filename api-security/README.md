# Trust Axis API Security Test Suite

This folder acts as a "workspace" for API security checks of the active endpoints currently running in the Trust Axis platform. 

## Objectives
- Ensure that Authentication/Authorization boundaries are well-defined and respected.
- Prevent Common Web Vulnerabilities (IDOR, Mass Assignment, CSRF, Injection).
- Provide a standardized way for developers to quickly test and assert the security posture of newly implemented or modified endpoints.

## Active APIs Covered
1. **Authentication Endpoints** (`/api/auth/*`) - Managed by Better Auth.
2. **Onboarding Completion API** (`/api/onboarding/complete`) - Bootstraps student profiles.
3. **Profile Update API** (`/api/profile/update`) - Updates existing profile details.

## How to perform the tests
Each file in this directory contains a breakdown of the specific API endpoint, the potential security risks for that endpoint, and `curl` scripts you can run in your terminal (or import into Postman) to manually verify the security constraints are holding.

### Prerequisite Setup
For many of these tests, you will need a valid session token. To retrieve a session cookie:
1. Log into the application naturally using your browser.
2. Open Dev Tools -> Application -> Cookies.
3. Copy the value of the Better Auth session cookie (e.g., `better-auth.session_token`).
4. Replace `<YOUR_SESSION_TOKEN>` in the curl requests with your copied token.

---
*Note: As the LMS expands (e.g., handling payments, LMS course progress webhooks, or consultancy bookings), you should add new files to this suite following the established format.*
