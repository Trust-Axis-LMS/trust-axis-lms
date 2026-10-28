import type { Metadata } from "next";
import { CollectionIndexPage } from "@/components/course-collection";
import { getCatalog, groupByTopic, vendorNames } from "@/lib/course-collections";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Courses by Domain",
  description: "Browse Trust Axis certification training by domain: security management, GRC, audit, cloud, privacy, network security, security operations and more.",
};

export default async function TopicsPage() {
  const groups = groupByTopic(await getCatalog());
  return (
    <CollectionIndexPage
      badge="Courses by Domain"
      title="Certification Training by Domain"
      intro="Find the programs that match your role, from security leadership and audit to hands-on network and offensive security."
      links={groups.map((g) => ({
        href: `/topics/${g.slug}`,
        title: g.name,
        description: `Programs from ${vendorNames(g.courses)}.`,
        count: g.courses.length,
      }))}
    />
  );
}
