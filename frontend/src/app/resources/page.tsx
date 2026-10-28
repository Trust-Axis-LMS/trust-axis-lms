import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Library, Newspaper, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Knowledge Base",
  description: "Explore blogs, articles, whitepapers, and research by Trust Axis experts.",
};

const POST_PATHS = {
  BLOG: "/resources/blogs",
  ARTICLE: "/resources/articles",
  WHITEPAPER: "/resources/whitepapers",
} as const;

const categories = [
  { icon: Library, label: "Blogs", description: "Commentary on cybersecurity, AI governance, privacy and building capable security teams.", href: "/resources/blogs" },
  { icon: Newspaper, label: "Articles", description: "Practical deep-dives on security architecture, data and technology risk.", href: "/resources/articles" },
  { icon: FileText, label: "Whitepapers", description: "Research and frameworks for security, risk and technology decision-makers.", href: "/resources/whitepapers" },
];

export const revalidate = 60;

export default async function ResourcesPage() {
  const latest = await prisma.contentPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { type: true, slug: true, title: true, excerpt: true, category: true, readTime: true, publishedAt: true },
  }).catch(() => []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
              Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#212529] tracking-tight leading-tight mb-6">
              Insights, Research &<br />Learning Resources
            </h1>
            <p className="text-[#6C757D] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Perspectives from Trust Axis on cybersecurity, AI governance, privacy, and technology risk —
              from practical deep-dives to strategic frameworks.
            </p>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-10 md:mb-12">
              Browse by Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Link key={i} href={cat.href} className="group outline-none">
                    <Card
                      className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-all duration-300 group-hover:-translate-y-0.5 cursor-pointer h-full"
                    >
                      <CardContent className="p-0">
                        <div className="mb-5">
                          <div className="h-12 w-12 bg-[#F4F4F5] group-hover:bg-black rounded-lg flex items-center justify-center transition-colors duration-300">
                            <Icon className="h-6 w-6 text-[#212529] group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#212529] mb-2">{cat.label}</h3>
                        <p className="text-sm text-[#6C757D] leading-relaxed">{cat.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Content */}
        {latest.length > 0 && (
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-10 md:mb-12">
              Latest From Trust Axis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {latest.map((post) => (
                <Link key={post.slug} href={`${POST_PATHS[post.type]}/${post.slug}`} className="group outline-none">
                  <Card className="rounded-xl border border-[#E5E7EB] bg-white hover:shadow-md transition-all duration-300 flex flex-col h-full">
                    <div className="h-2 bg-[#212529] rounded-t-xl" />
                    <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {post.category && (
                          <span className="inline-block bg-[#F4F4F5] text-[#212529] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                            {post.category}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="text-[11px] text-[#6C757D]">
                            {post.publishedAt.toLocaleDateString("en-SG", { month: "long", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#212529] leading-snug mb-3 tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#6C757D] leading-relaxed flex-1 line-clamp-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F4F4F5]">
                        <span className="text-[11px] text-[#6C757D]">{post.readTime}</span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#212529] uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Newsletter CTA */}
        <section className="bg-black text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Get the latest industry insights, program updates, and research directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-sm bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
              />
              <button className="h-12 px-6 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
