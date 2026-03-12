# Trust Axis Courses Page

This is a Next.js App Router frontend for the Trust Axis course catalog and course detail pages.

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
