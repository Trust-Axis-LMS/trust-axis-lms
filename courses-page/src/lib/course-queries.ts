import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { mapDbCourseToFrontend, getCourseBySlug, type Course } from "@/lib/courses-data";

const DB_TIMEOUT_MS = 4000;

/** Races a query against a timeout (Supabase can be paused / cold-starting). */
async function withTimeout<T>(query: Promise<T>, ms = DB_TIMEOUT_MS): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Database query timed out")), ms);
  });
  try {
    return await Promise.race([query, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Loads a course by slug from the DB, falling back to the static catalog.
 * Wrapped in React `cache` so generateMetadata and the page share one query.
 *
 * Returns `null` only when the DB answered and neither source has the course.
 * Throws when the DB is unreachable and there is no static fallback, so a
 * transient outage is not cached as a 404.
 */
export const getCourse = cache(async (slug: string): Promise<Course | null> => {
  try {
    const dbCourse = await withTimeout(
      prisma.course.findUnique({
        where: { slug },
        include: {
          curriculum: true,
          programHighlights: true,
          objectives: true,
          targetAudience: true,
          examDetails: true,
          toolsCovered: true,
        },
      })
    );

    if (dbCourse) return mapDbCourseToFrontend(dbCourse);
    return getCourseBySlug(slug) ?? null;
  } catch (err) {
    console.warn(`Supabase paused/unavailable for course [${slug}], using static course fallback:`, err);
    const staticCourse = getCourseBySlug(slug);
    if (!staticCourse) throw err;
    return staticCourse;
  }
});

/** Loads all courses for the catalog, falling back to the static list. */
export async function getAllCourses(): Promise<Course[] | null> {
  try {
    const dbCourses = await withTimeout(
      prisma.course.findMany({
        include: {
          curriculum: true,
        },
      })
    );

    if (dbCourses.length > 0) return dbCourses.map(mapDbCourseToFrontend);
  } catch (err) {
    console.warn("Supabase paused/unavailable on courses page, using fallback courses catalog:", err);
  }
  return null;
}
