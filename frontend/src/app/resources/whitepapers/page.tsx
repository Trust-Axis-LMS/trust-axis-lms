import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Whitepapers",
  description: "Research and frameworks from Trust Axis for security, risk and technology leaders.",
};

export default async function WhitepapersPage() {
  const posts = await prisma.contentPost.findMany({
    where: { type: "WHITEPAPER", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, excerpt: true, category: true, author: true, publishedAt: true, coverImageUrl: true },
  }).catch(() => []);

  const items = posts.map((p) => ({
    title: p.title,
    description: p.excerpt ?? "",
    category: p.category ?? "Research",
    readTime: "PDF",
    href: `/resources/whitepapers/${p.slug}`,
    coverImageUrl: p.coverImageUrl ?? undefined,
    author: p.author ?? undefined,
  }));

  return (
    <ResourcePageShell
      variant="whitepapers"
      badge="Whitepapers"
      title="Research And Decision Support For Program Leaders"
      intro="Access longer-form whitepapers designed to support education strategy, vendor evaluation, and technical workforce planning."
      items={items}
    />
  );
}
