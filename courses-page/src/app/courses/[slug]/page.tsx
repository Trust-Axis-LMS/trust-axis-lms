import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { mapDbCourseToFrontend, getCourseBySlug } from "@/lib/courses-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseDetailsClient } from "@/components/course-details-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course = await prisma.course.findUnique({ where: { slug } }).catch(() => null);
    if (course) {
      return {
        title: `${course.title} — Trust Axis`,
        description: course.subtitle,
      };
    }
  } catch (err) {
    // Silently fall through to static data
  }

  const staticCourse = getCourseBySlug(slug);
  if (!staticCourse) return { title: "Course Not Found" };
  return {
    title: `${staticCourse.title} — Trust Axis`,
    description: staticCourse.subtitle,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const fetchDbCourse = prisma.course.findUnique({
      where: { slug },
      include: {
        curriculum: true,
        programHighlights: true,
        objectives: true,
        targetAudience: true,
        examDetails: true,
        toolsCovered: true,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out")), 4000)
    );

    const dbCourse = await Promise.race([fetchDbCourse, timeoutPromise]);

    if (dbCourse) {
      const course = mapDbCourseToFrontend(dbCourse);
      return (
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-1">
            <CourseDetailsClient course={course} />
          </main>
          <Footer />
        </div>
      );
    }
  } catch (err) {
    console.warn(`Supabase paused/unavailable for course [${slug}], using static course fallback:`, err);
  }

  const staticCourse = getCourseBySlug(slug);
  if (!staticCourse) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <CourseDetailsClient course={staticCourse} />
      </main>
      <Footer />
    </div>
  );
}
