import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { generateToc } from "@/lib/generate-toc";
import { TipTapRenderer } from "@/components/tiptap-renderer";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({ where: { slug, type: "BLOG", status: "PUBLISHED" }, select: { title: true, excerpt: true } }).catch(() => null);
  if (!post) return { title: "Blog — Trust Axis" };
  return { title: `${post.title} — Trust Axis`, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({
    where: { slug, type: "BLOG", status: "PUBLISHED" },
  }).catch(() => null);

  if (!post) return notFound();

  const toc = post.content ? generateToc(post.content) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Cover */}
        {post.coverImageUrl && (
          <div style={{ width: "100%", maxHeight: "420px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Hero */}
        <div className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex gap-12 items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  {post.category && (
                    <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                      {post.category}
                    </span>
                  )}
                  {post.readTime && <span className="text-[12px] text-[#6C757D]">{post.readTime}</span>}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-[#212529] tracking-tight leading-tight mb-4">
                  {post.title}
                </h1>
                {post.excerpt && <p className="text-[#6C757D] text-base md:text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
                  {post.author && <span className="text-sm font-semibold text-[#374151]">By {post.author}</span>}
                  {post.publishedAt && (
                    <span className="text-sm text-[#9CA3AF]">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Spacer to match the right sidebar width so the main column left edge perfectly aligns */}
              <div className="hidden xl:block w-64 flex-shrink-0"></div>
            </div>
          </div>
        </div>

        {/* Content + ToC */}
        <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12 md:py-16">
          <div className="flex gap-12 items-start">
            {/* Main content */}
            <article className="flex-1 min-w-0">
              {post.content ? (
                <TipTapRenderer content={post.content} />
              ) : (
                <p className="text-[#6C757D]">No content available.</p>
              )}
            </article>

            {/* Sticky ToC */}
            {toc.length > 0 && (
              <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-[90px]">
                <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#FAFAFA]">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] mb-4">Table of Contents</p>
                  <ul className="space-y-1">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-[13px] text-[#6B7280] hover:text-[#007BFF] transition-colors py-1 leading-snug"
                          style={{ paddingLeft: item.level === 2 ? "0" : `${(item.level - 2) * 12}px` }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
