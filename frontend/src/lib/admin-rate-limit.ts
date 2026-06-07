/**
 * Simple in-memory rate limiter for admin login.
 * Tracks failed attempts per IP. Blocks after MAX_ATTEMPTS within WINDOW_MS.
 * Production note: For multi-instance deployments, use Redis instead.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface Record {
  count: number;
  firstAttemptAt: number;
  blockedUntil?: number;
}

const store = new Map<string, Record>();

/** Returns { allowed: true } or { allowed: false, retryAfterMs: number } */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const rec = store.get(ip);

  if (rec) {
    // If in block window
    if (rec.blockedUntil && now < rec.blockedUntil) {
      return { allowed: false, retryAfterMs: rec.blockedUntil - now };
    }
    // Reset if window expired
    if (now - rec.firstAttemptAt > WINDOW_MS) {
      store.delete(ip);
      return { allowed: true };
    }
    // Within window, check count
    if (rec.count >= MAX_ATTEMPTS) {
      const blockedUntil = rec.firstAttemptAt + WINDOW_MS;
      store.set(ip, { ...rec, blockedUntil });
      return { allowed: false, retryAfterMs: blockedUntil - now };
    }
  }

  return { allowed: true };
}

/** Called on each failed login attempt */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const rec = store.get(ip);
  if (!rec) {
    store.set(ip, { count: 1, firstAttemptAt: now });
  } else {
    store.set(ip, { ...rec, count: rec.count + 1 });
  }
}

/** Called on successful login — clears the record */
export function clearAttempts(ip: string): void {
  store.delete(ip);
}

/** Periodic cleanup to prevent memory leaks (call on app start or cron) */
export function cleanupExpired(): void {
  const now = Date.now();
  for (const [ip, rec] of store.entries()) {
    if (now - rec.firstAttemptAt > WINDOW_MS * 2) {
      store.delete(ip);
    }
  }
}
