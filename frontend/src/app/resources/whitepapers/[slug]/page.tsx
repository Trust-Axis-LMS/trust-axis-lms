import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({ where: { slug, type: "WHITEPAPER", status: "PUBLISHED" }, select: { title: true, excerpt: true } }).catch(() => null);
  if (!post) return { title: "Whitepaper — Trust Axis" };
  return { title: `${post.title} — Trust Axis`, description: post.excerpt ?? undefined };
}

export default async function WhitepaperPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({ where: { slug, type: "WHITEPAPER", status: "PUBLISHED" } }).catch(() => null);
  if (!post) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">Whitepaper</span>
              {post.category && <span className="text-[12px] text-[#6C757D]">{post.category}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#212529] tracking-tight leading-tight mb-4">{post.title}</h1>
            {post.excerpt && <p className="text-[#6C757D] text-base md:text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
              {post.author && <span className="text-sm font-semibold text-[#374151]">By {post.author}</span>}
              {post.publishedAt && <span className="text-sm text-[#9CA3AF]">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>}
              {post.pdfUrl && (
                <a
                  href={post.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={post.pdfFilename ?? true}
                  className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#007BFF] text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ⬇ Download PDF
                </a>
              )}
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10 md:py-14">
          {post.pdfUrl ? (
            <div>
              {/* Inline embed */}
              <div style={{ border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <embed
                  src={`${post.pdfUrl}#toolbar=1&navpanes=0`}
                  type="application/pdf"
                  width="100%"
                  style={{ height: "85vh", minHeight: "600px", display: "block" }}
                />
              </div>
              {/* Fallback link */}
              <p className="text-center mt-4 text-sm text-[#9CA3AF]">
                Can&apos;t see the PDF?{" "}
                <a href={post.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#007BFF] underline">
                  Open in new tab
                </a>
              </p>
            </div>
          ) : (
            <div className="text-center py-16 text-[#9CA3AF]">
              <p className="text-4xl mb-4">📋</p>
              <p className="text-base font-medium">PDF not available yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
