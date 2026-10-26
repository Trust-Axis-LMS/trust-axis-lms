import type { MetadataRoute } from "next";
import { courses as fallbackCourses } from "@/lib/courses-data";
import { getAllCourses } from "@/lib/course-queries";
import { COURSES_SITE_URL } from "@/lib/url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = (await getAllCourses()) ?? fallbackCourses;

  return [
    { url: COURSES_SITE_URL },
    ...courses.map((c) => ({ url: `${COURSES_SITE_URL}/courses/${c.slug}` })),
  ];
}
