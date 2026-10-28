import type { MetadataRoute } from "next";
import { getCatalog, groupByTopic, groupByVendor } from "@/lib/course-collections";
import { COURSES_SITE_URL } from "@/lib/url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCatalog();

  return [
    { url: COURSES_SITE_URL },
    { url: `${COURSES_SITE_URL}/vendors` },
    { url: `${COURSES_SITE_URL}/topics` },
    { url: `${COURSES_SITE_URL}/corporate` },
    ...groupByVendor(courses).map((g) => ({ url: `${COURSES_SITE_URL}/vendors/${g.slug}` })),
    ...groupByTopic(courses).map((g) => ({ url: `${COURSES_SITE_URL}/topics/${g.slug}` })),
    ...courses.map((c) => ({ url: `${COURSES_SITE_URL}/courses/${c.slug}` })),
  ];
}
