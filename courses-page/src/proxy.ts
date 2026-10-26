import { NextResponse } from "next/server";
import { SITE_LOCKED, siteLockedResponse } from "../../site-lock";

export default function proxy() {
  if (SITE_LOCKED) return siteLockedResponse();
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
