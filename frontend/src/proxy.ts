import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { verifyAdminToken } from "@/lib/admin-auth";

const ADMIN_COOKIE  = "xp_cms_token";
const ADMIN_PREFIX  = "/xp-cms";
const ADMIN_LOGIN   = "/xp-cms";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/api/auth",
  "/",
  "/_next",
  "/favicon.ico",
];

// ── Mobile UA detector ───────────────────────────────────────────────────────
function isMobileUA(ua: string): boolean {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua);
}

function mobileBlockResponse(): NextResponse {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Desktop Only — Trust Axis CMS</title><style>*{box-sizing:border-box;margin:0;padding:0}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#09090E;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;padding:24px;text-align:center}.icon{font-size:56px;margin-bottom:20px}h1{font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px}p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6;max-width:280px;margin:0 auto}.badge{display:inline-block;margin-top:28px;padding:6px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.15);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.4)}</style></head><body><div><div class="icon">🖥️</div><h1>Open on Desktop</h1><p>The Trust Axis admin panel is only accessible on desktop devices with a screen width of at least 1024px.</p><span class="badge">Admin Panel</span></div></body></html>`;
  return new NextResponse(html, {
    status: 403,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin panel routes ───────────────────────────────────────────────────────
  if (pathname.startsWith(ADMIN_PREFIX)) {
    // 1. Mobile block — server-side, cannot be bypassed by URL
    const ua = request.headers.get("user-agent") ?? "";
    if (isMobileUA(ua)) return mobileBlockResponse();

    // 2. Auth guard — all admin sub-routes except the login page itself
    const isLoginPage = pathname === ADMIN_PREFIX || pathname === `${ADMIN_PREFIX}/`;
    if (!isLoginPage && !pathname.startsWith("/api/xp-cms/auth/")) {
      const token = request.cookies.get(ADMIN_COOKIE)?.value;
      if (!token || !verifyAdminToken(token)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = ADMIN_LOGIN;
        loginUrl.search = "";
        return NextResponse.redirect(loginUrl);
      }
    }

    // 3. Security headers for admin
    const adminResponse = NextResponse.next();
    adminResponse.headers.set("X-Frame-Options", "DENY");
    adminResponse.headers.set("X-Content-Type-Options", "nosniff");
    adminResponse.headers.set("Referrer-Policy", "no-referrer");
    adminResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
    adminResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return adminResponse;
  }

  // ── Standard app auth (better-auth) ─────────────────────────────────────────
  if (pathname === "/" || PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};