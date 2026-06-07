import { prisma } from "@/lib/prisma";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

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
      items={items.length > 0 ? items : defaultItems}
    />
  );
}

const defaultItems = [
  { title: "Zero Trust Architecture in Practice", description: "A technical walkthrough of implementing zero trust across enterprise environments.", category: "Cybersecurity", readTime: "8 Min Read" },
  { title: "Data Mesh vs. Data Lake: When to Use Each", description: "A practical comparison of modern data architecture patterns and their tradeoffs.", category: "Data Science", readTime: "6 Min Read" },
];
