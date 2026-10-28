import type { Metadata } from "next";
import { CollectionIndexPage } from "@/components/course-collection";
import { getCatalog, groupByVendor } from "@/lib/course-collections";
import { getVendorInfo } from "@/lib/courses-catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Courses by Vendor",
  description: "Browse Trust Axis certification training by issuing body: EC-Council, ISC2, ISACA, IAPP, Cloud Security Alliance, Cisco, PeopleCert and PECB.",
};

export default async function VendorsPage() {
  const groups = groupByVendor(await getCatalog());
  return (
    <CollectionIndexPage
      badge="Courses by Vendor"
      title="Certification Training by Issuing Body"
      intro="Every program prepares you for an official certification exam. Choose the body whose credential you are working towards."
      links={groups.map((g) => ({
        href: `/vendors/${g.slug}`,
        title: g.name,
        description: getVendorInfo(g.slug)?.description ?? `Certification programs from ${g.name}.`,
        count: g.courses.length,
      }))}
    />
  );
}
