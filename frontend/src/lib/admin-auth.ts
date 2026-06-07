import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_JWT_SECRET!;
const COOKIE_NAME = "xp_cms_token";

export interface AdminPayload {
  sub: string; // username
  iat?: number;
  exp?: number;
}

/** Sign a new JWT and return it */
export function signAdminToken(username: string): string {
  return jwt.sign({ sub: username }, SECRET, { expiresIn: "8h" });
}

/** Verify JWT — returns payload or null if invalid/expired */
export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

/** Read and verify the token from the request cookie store (Server Component / Route Handler safe) */
export async function getAdminSession(): Promise<AdminPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/** Cookie options — httpOnly, Secure, SameSite=Strict */
export const adminCookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 8, // 8 hours in seconds
};
