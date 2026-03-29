import { type NextRequest, NextResponse } from 'next/server'

// Courses-page middleware: passthrough for static assets only.
// Auth is managed by the frontend app (trustacg.com). This app has no auth-gated routes.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
