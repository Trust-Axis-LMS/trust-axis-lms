import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs",
  description: "Commentary from Trust Axis on cybersecurity, AI governance, privacy and workforce capability.",
};

export default async function BlogsPage() {
  const posts = await prisma.contentPost.findMany({
    where: { type: "BLOG", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, excerpt: true, category: true, readTime: true, coverImageUrl: true, author: true, publishedAt: true },
  }).catch(() => []);

  const items = posts.map((p) => ({
    title: p.title,
    description: p.excerpt ?? "",
    category: p.category ?? "Blog",
    readTime: p.readTime ?? "5 Min Read",
    href: `/resources/blogs/${p.slug}`,
    coverImageUrl: p.coverImageUrl ?? undefined,
    author: p.author ?? undefined,
  }));

  return (
    <ResourcePageShell
      variant="blogs"
      badge="Blogs"
      title="Current Thinking For Technical Teams"
      intro="Explore blog posts focused on practical upskilling, workforce development, and the operating realities behind high-quality technical training."
      items={items}
    />
  );
}
