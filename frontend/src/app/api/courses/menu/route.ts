import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const abbreviationMap: Record<string, string> = {
  "isc2": "ISC2: International Information System Security Certification Consortium",
  "isaca": "ISACA: Information Systems Audit and Control Association",
  "ec-council": "EC-Council: International Council of E-Commerce Consultants",
  "aws": "AWS: Amazon Web Services",
  "gcp": "GCP: Google Cloud Platform",
  "comptia": "CompTIA: Computing Technology Industry Association",
  "ceh": "CEH: Certified Ethical Hacker",
  "cism": "CISM: Certified Information Security Manager",
  "cisa": "CISA: Certified Information Systems Auditor",
  "cissp": "CISSP: Certified Information Systems Security Professional",
  "ai": "AI: Artificial Intelligence",
  "ml": "ML: Machine Learning",
  "iot": "IoT: Internet of Things",
  "it": "IT: Information Technology"
};

function formatLabel(label: string): string {
  const key = label.toLowerCase();
  return abbreviationMap[key] || label;
}

export async function GET() {
  try {
    const dbCourses = await prisma.course.findMany({
      select: { title: true, slug: true, vendor: true, category: true },
    });

    const vendorMap: Record<string, { title: string; slug: string }[]> = {};
    const domainMap: Record<string, { title: string; slug: string }[]> = {};
    const allCourses: { title: string; slug: string }[] = [];

    dbCourses.forEach((c: { title: string; slug: string; vendor: string | null; category: string | null }) => {
      const courseItem = { title: c.title, slug: c.slug };
      allCourses.push(courseItem);

      if (c.vendor) {
        if (!vendorMap[c.vendor]) vendorMap[c.vendor] = [];
        vendorMap[c.vendor].push(courseItem);
      }

      if (c.category) {
        if (!domainMap[c.category]) domainMap[c.category] = [];
        domainMap[c.category].push(courseItem);
      }
    });

    const megaMenuData = [
      {
        id: "vendor",
        label: "Courses by Vendor",
        subcategories: Object.entries(vendorMap).map(([vendor, courses]) => ({
          id: vendor.toLowerCase().replace(/\s+/g, "-"),
          label: formatLabel(vendor),
          courses,
        })),
      },
      {
        id: "domain",
        label: "Courses by Domain",
        subcategories: Object.entries(domainMap).map(([domain, courses]) => ({
          id: domain.toLowerCase().replace(/\s+/g, "-"),
          label: formatLabel(domain),
          courses,
        })),
      },
      {
        id: "courses",
        label: "All Courses",
        allCourses,
      },
    ];

    return NextResponse.json(megaMenuData);
  } catch (error) {
    console.error("Failed to fetch courses menu data:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses menu data" },
      { status: 500 }
    );
  }
}
