import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseCollectionPage } from "@/components/course-collection";
import { getCatalog, groupByVendor } from "@/lib/course-collections";
import { getVendorInfo } from "@/lib/courses-catalog";
import { shortCourseName, truncate } from "@/lib/seo";

interface Props {
  params: Promise<{ vendor: string }>;
}

export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

async function getVendorGroup(slug: string) {
  return groupByVendor(await getCatalog()).find((g) => g.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vendor } = await params;
  const group = await getVendorGroup(vendor);
  if (!group) return { title: "Vendor Not Found" };
  return {
    title: `${group.name} Certification Training`,
    description: truncate(`Instructor-led preparation for ${group.name} certifications: ${group.courses.map((c) => shortCourseName(c.title)).join(", ")}. Online and onsite in Singapore.`),
  };
}

export default async function VendorPage({ params }: Props) {
  const { vendor } = await params;
  const group = await getVendorGroup(vendor);
  if (!group) notFound();

  const info = getVendorInfo(group.slug);
  return (
    <CourseCollectionPage
      badge="Courses by Vendor"
      title={`${group.name} Certification Training`}
      intro={info?.description ?? `Instructor-led preparation for ${group.name} certifications.`}
      website={info?.website}
      courses={group.courses}
    />
  );
}
