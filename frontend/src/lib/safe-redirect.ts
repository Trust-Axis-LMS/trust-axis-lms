import { COURSES_SITE_URL, MAIN_SITE_URL } from "./url";

const ALLOWED_ORIGINS = [MAIN_SITE_URL, COURSES_SITE_URL].map((url) => new URL(url).origin);

/**
 * Validates a post-auth redirect target to prevent open redirects.
 * Allows same-site relative paths and absolute URLs on our own (sub)domains;
 * anything else falls back.
 */
export function safeCallbackURL(value: string | null | undefined, fallback = "/"): string {
  if (!value) return fallback;

  // Relative path — but not protocol-relative ("//evil.com") or "/\evil.com"
  if (value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")) {
    return value;
  }

  try {
    const url = new URL(value);
    if (ALLOWED_ORIGINS.includes(url.origin)) return url.toString();
  } catch {
    // Not a valid absolute URL
  }

  return fallback;
}
