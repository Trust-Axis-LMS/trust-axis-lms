import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug, courses } from "@/lib/courses-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import CheckoutClient from "./checkout-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `Enroll in ${course.title} — Trust Axis`,
    description: `Complete your enrollment for ${course.title}. Secure your spot in the next cohort.`,
  };
}

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

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
