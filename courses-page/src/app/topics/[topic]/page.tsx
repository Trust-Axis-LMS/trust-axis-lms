import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseCollectionPage } from "@/components/course-collection";
import { getCatalog, groupByTopic, vendorNames } from "@/lib/course-collections";
import { truncate } from "@/lib/seo";

interface Props {
  params: Promise<{ topic: string }>;
}

export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

async function getTopicGroup(slug: string) {
  return groupByTopic(await getCatalog()).find((g) => g.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const group = await getTopicGroup(topic);
  if (!group) return { title: "Domain Not Found" };
  return {
    title: `${group.name} Training`,
    description: truncate(`${group.name} certification training from ${vendorNames(group.courses)}, delivered by Trust Axis Academy online and onsite in Singapore.`),
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const group = await getTopicGroup(topic);
  if (!group) notFound();

  return (
    <CourseCollectionPage
      badge="Courses by Domain"
      title={`${group.name} Training`}
      intro={`Instructor-led certification programs in ${group.name.toLowerCase()}, from ${vendorNames(group.courses)}.`}
      courses={group.courses}
    />
  );
}
