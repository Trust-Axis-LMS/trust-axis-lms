import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMegaMenuData, FALLBACK_COURSES } from "@/lib/courses-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Attempt DB query with 3.5-second timeout in case Supabase is dormant/paused
    const fetchDbCourses = prisma.course.findMany({
      select: { title: true, slug: true, vendor: true, category: true },
    });

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out (Supabase cold start)")), 3500)
    );

    const dbCourses = await Promise.race([fetchDbCourses, timeoutPromise]);

    if (Array.isArray(dbCourses) && dbCourses.length > 0) {
      return NextResponse.json(buildMegaMenuData(dbCourses));
    }

    // If DB returned empty, fallback to catalog
    return NextResponse.json(buildMegaMenuData(FALLBACK_COURSES));
  } catch (error) {
    console.warn("Supabase database unavailable or waking up, serving fallback course catalog:", error);
    // Graceful fallback prevents 500 error and React client crashes
    return NextResponse.json(buildMegaMenuData(FALLBACK_COURSES));
  }
}
