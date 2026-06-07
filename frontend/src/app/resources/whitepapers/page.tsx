import { prisma } from "@/lib/prisma";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

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
      items={items.length > 0 ? items : defaultItems}
    />
  );
}

const defaultItems = [
  { title: "State Of Technical Upskilling In High-Trust Industries", description: "A research-led perspective on how regulated and security-sensitive sectors are approaching workforce capability building.", category: "Research", readTime: "12 Min Read" },
  { title: "A Framework For Enterprise Training Program Selection", description: "A whitepaper outlining the decision model enterprises can use to compare external learning vendors.", category: "Enterprise Learning", readTime: "14 Min Read" },
];
