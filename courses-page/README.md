# Trust Axis Courses Page

This is a Next.js App Router frontend for the Trust Axis course catalog and course detail pages.

Production domain: `https://train.trustacg.com`

The landing site runs separately from `frontend` at `https://trustacg.com`. Keep these Vercel environment variables set in the courses project:

```bash
NEXT_PUBLIC_MAIN_SITE_URL=https://trustacg.com
NEXT_PUBLIC_COURSES_SITE_URL=https://train.trustacg.com
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Routes

- `/` renders the course catalog
- `/courses/[slug]` renders individual course detail pages from `src/lib/courses-data.ts`

## Notes

- Course content is currently hardcoded in `src/lib/courses-data.ts`
- Shared layout pieces live in `src/components`
- Global styles live in `src/app/globals.css`
