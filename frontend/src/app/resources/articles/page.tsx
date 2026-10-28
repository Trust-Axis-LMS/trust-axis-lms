import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Articles",
  description: "Practical articles from Trust Axis on security architecture, data and technology risk.",
};

export default async function ArticlesPage() {
  const posts = await prisma.contentPost.findMany({
    where: { type: "ARTICLE", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, excerpt: true, category: true, readTime: true, coverImageUrl: true, author: true, publishedAt: true },
  }).catch(() => []);

  const items = posts.map((p) => ({
    title: p.title,
    description: p.excerpt ?? "",
    category: p.category ?? "Article",
    readTime: p.readTime ?? "5 Min Read",
    href: `/resources/articles/${p.slug}`,
    coverImageUrl: p.coverImageUrl ?? undefined,
    author: p.author ?? undefined,
  }));

  return (
    <ResourcePageShell
      variant="articles"
      badge="Articles"
      title="Technical Deep-Dives For Modern Teams"
      intro="Explore technical articles on security architecture, data engineering, cloud platforms, and digital risk from Trust Axis experts."
      items={items}
    />
  );
}
