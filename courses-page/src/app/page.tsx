import { prisma } from "@/lib/prisma";
import { mapDbCourseToFrontend, courses as fallbackCourses } from "@/lib/courses-data";
import { CoursesPageClient } from "./page-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const fetchDbCourses = prisma.course.findMany({
      include: {
        curriculum: true,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out")), 4000)
    );

    const dbCourses = await Promise.race([fetchDbCourses, timeoutPromise]);

    if (Array.isArray(dbCourses) && dbCourses.length > 0) {
      const courses = dbCourses.map(mapDbCourseToFrontend);
      return <CoursesPageClient courses={courses} />;
    }
  } catch (err) {
    console.warn("Supabase paused/unavailable on courses page, using fallback courses catalog:", err);
  }

  return <CoursesPageClient courses={fallbackCourses} />;
}
