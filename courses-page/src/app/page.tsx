import { courses as fallbackCourses } from "@/lib/courses-data";
import { getAllCourses } from "@/lib/course-queries";
import { CoursesPageClient } from "./page-client";

// Course data changes rarely — serve a cached page and refresh in the background
export const revalidate = 300;

export default async function Page() {
  const courses = await getAllCourses();
  return <CoursesPageClient courses={courses ?? fallbackCourses} />;
}
