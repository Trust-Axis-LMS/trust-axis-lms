import { courses as fallbackCourses, type Course } from "@/lib/courses-data";
import { getAllCourses } from "@/lib/course-queries";
import { getVendor, getVendorInfo, topicSlug, vendorSlug } from "@/lib/courses-catalog";

export interface CourseGroup {
  slug: string;
  name: string;
  courses: Course[];
}

/** Every catalog course, from the DB or the static fallback. */
export async function getCatalog(): Promise<Course[]> {
  return (await getAllCourses()) ?? fallbackCourses;
}

/** Groups courses by issuing body, keyed by the /vendors/{slug} slug. */
export function groupByVendor(courses: Course[]): CourseGroup[] {
  const groups = new Map<string, CourseGroup>();
  for (const course of courses) {
    const slug = vendorSlug(course.vendor || getVendor(course.title));
    const group = groups.get(slug) ?? { slug, name: getVendorInfo(slug)?.name ?? slug, courses: [] };
    group.courses.push(course);
    groups.set(slug, group);
  }
  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Groups courses by domain (catalog category), keyed by the /topics/{slug} slug. */
export function groupByTopic(courses: Course[]): CourseGroup[] {
  const groups = new Map<string, CourseGroup>();
  for (const course of courses) {
    if (!course.category) continue;
    const slug = topicSlug(course.category);
    const group = groups.get(slug) ?? { slug, name: course.category, courses: [] };
    group.courses.push(course);
    groups.set(slug, group);
  }
  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** "ISC2 and ISACA" style list of the bodies behind a set of courses. */
export function vendorNames(courses: Course[]): string {
  const names = groupByVendor(courses).map((g) => g.name);
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}
