import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
          label: vendor,
          courses,
        })),
      },
      {
        id: "domain",
        label: "Courses by Domain",
        subcategories: Object.entries(domainMap).map(([domain, courses]) => ({
          id: domain.toLowerCase().replace(/\s+/g, "-"),
          label: domain,
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
