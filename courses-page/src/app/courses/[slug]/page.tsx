import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { mapDbCourseToFrontend } from "@/lib/courses-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseDetailsClient } from "@/components/course-details-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({ select: { slug: true } });
  return courses.map((course: { slug: string }) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Trust Axis`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbCourse = await prisma.course.findUnique({
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

  if (!dbCourse) {
    notFound();
  }
  
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
