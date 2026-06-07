import { NextResponse } from "next/server";
import { adminCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions.name, "", {
    httpOnly: true,
    secure: adminCookieOptions.secure,
    sameSite: adminCookieOptions.sameSite,
    path: adminCookieOptions.path,
    maxAge: 0, // Expire immediately
  });
  return response;
}
