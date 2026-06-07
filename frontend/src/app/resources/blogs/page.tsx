import { prisma } from "@/lib/prisma";
import { ResourcePageShell } from "@/components/resource-page-shell";

export const revalidate = 60;

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
      items={items.length > 0 ? items : defaultItems}
    />
  );
}

const defaultItems = [
  { title: "How Training Teams Should Evaluate Technical Programs", description: "A practical framework for comparing curriculum depth, delivery format, instructor quality, and learner outcomes before committing budget.", category: "Program Strategy", readTime: "6 Min Read" },
  { title: "What Employers Actually Look For In Cybersecurity Candidates", description: "A breakdown of the technical, communication, and certification signals hiring teams use when evaluating early and mid-career security talent.", category: "Cybersecurity", readTime: "5 Min Read" },
];
