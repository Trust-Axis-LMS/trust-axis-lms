import { prisma } from "@/lib/prisma";
import { mapDbCourseToFrontend } from "@/lib/courses-data";
import { CoursesPageClient } from "./page-client";

export default async function Page() {
  const dbCourses = await prisma.course.findMany({
    include: {
      curriculum: true,
    },
  });

  const courses = dbCourses.map(mapDbCourseToFrontend);

  return <CoursesPageClient courses={courses} />;
}
