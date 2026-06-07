import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, adminCookieOptions } from "@/lib/admin-auth";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/admin-rate-limit";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    const retryAfterSecs = Math.ceil((rateCheck.retryAfterMs ?? 60000) / 1000);
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSecs),
          "X-RateLimit-Reset": String(Date.now() + (rateCheck.retryAfterMs ?? 60000)),
        },
      }
    );
  }

  // ── Parse & validate body ────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials format." }, { status: 400 });
  }

  const { username, password } = parsed.data;

  // ── Credential check ─────────────────────────────────────────────────────────
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    console.error("[ADMIN] ADMIN_USERNAME or ADMIN_PASSWORD_HASH env vars not set.");
    return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
  }

  const usernameMatch = username === adminUsername;
  const passwordMatch = usernameMatch && await bcrypt.compare(password, adminPasswordHash);

  if (!usernameMatch || !passwordMatch) {
    recordFailedAttempt(ip);
    // Intentionally vague error to prevent user enumeration
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  clearAttempts(ip);
  const token = signAdminToken(username);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions.name, token, {
    httpOnly: adminCookieOptions.httpOnly,
    secure: adminCookieOptions.secure,
    sameSite: adminCookieOptions.sameSite,
    path: adminCookieOptions.path,
    maxAge: adminCookieOptions.maxAge,
  });

  return response;
}
