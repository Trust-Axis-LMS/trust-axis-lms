import { Suspense } from "react";
import { courses as fallbackCourses } from "@/lib/courses-data";
import { getAllCourses } from "@/lib/course-queries";
import { CoursesPageClient, CoursesPageWithParams } from "./page-client";

// Course data changes rarely — serve a cached page and refresh in the background
export const revalidate = 300;

export default async function Page() {
  const catalog = (await getAllCourses()) ?? fallbackCourses;
  // The unfiltered catalog is the server-rendered fallback; ?category= / ?vendor= apply on the client
  return (
    <Suspense fallback={<CoursesPageClient courses={catalog} />}>
      <CoursesPageWithParams courses={catalog} />
    </Suspense>
  );
}
