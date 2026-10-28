import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { consultancies } from "@/lib/consultancy-data";
import { MAIN_SITE_URL } from "@/lib/url";

export const revalidate = 3600;

const STATIC_ROUTES = [
  "",
  "/consultancy",
  "/about",
  "/contact",
  "/value-proposition",
  "/sustainability",
  "/resources",
  "/resources/blogs",
  "/resources/articles",
  "/resources/whitepapers",
  "/privacy-policy",
  "/terms-and-conditions",
];

const POST_PATHS = {
  BLOG: "/resources/blogs",
  ARTICLE: "/resources/articles",
  WHITEPAPER: "/resources/whitepapers",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.contentPost.findMany({
    where: { status: "PUBLISHED" },
    select: { type: true, slug: true, updatedAt: true },
  }).catch(() => []);

  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${MAIN_SITE_URL}${route}` })),
    ...consultancies.map((c) => ({ url: `${MAIN_SITE_URL}/consultancy/${c.slug}` })),
    ...posts.map((p) => ({
      url: `${MAIN_SITE_URL}${POST_PATHS[p.type]}/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
