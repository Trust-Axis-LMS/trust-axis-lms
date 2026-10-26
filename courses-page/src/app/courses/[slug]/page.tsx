import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourse } from "@/lib/course-queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseDetailsClient } from "@/components/course-details-client";

interface Props {
  params: Promise<{ slug: string }>;
}

// Rendered on first request, then cached and refreshed in the background
export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug).catch(() => null);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Trust Axis`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

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
