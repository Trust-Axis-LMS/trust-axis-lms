import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourse } from "@/lib/course-queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import CheckoutClient from "./checkout-client";
import { shortCourseName } from "@/lib/seo";

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
    title: `Enrol in ${shortCourseName(course.title)}`,
    description: `Request a place in the next ${shortCourseName(course.title)} cohort with Trust Axis Academy.`,
    // Transactional step: kept out of search (also disallowed in robots.txt)
    robots: { index: false, follow: true },
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <CheckoutClient course={course} />
      </main>
      <Footer />
    </div>
  );
}
