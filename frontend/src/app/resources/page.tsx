import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Library, Newspaper, FileText, BookOpen, Video, Headphones } from "lucide-react";

export const metadata = {
  title: "Resources — Trust Axis",
  description: "Explore blogs, articles, whitepapers, and research by Trust Axis experts.",
};

const featured = [
  {
    tag: "Cybersecurity",
    title: "Understanding Zero Trust Architecture in Enterprise Environments",
    excerpt:
      "A deep dive into zero trust principles, how they differ from traditional perimeter-based security, and a practical framework for implementation across your organization.",
    readTime: "8 min read",
    date: "March 2026",
  },
  {
    tag: "Data Science",
    title: "The Future of AI in Financial Services: Risks and Opportunities",
    excerpt:
      "How leading financial institutions are leveraging machine learning for fraud detection, risk modeling, and automated advisory services — and what guardrails must be in place.",
    readTime: "12 min read",
    date: "March 2026",
  },
  {
    tag: "Cloud",
    title: "FinOps: Controlling Cloud Spend Without Slowing Innovation",
    excerpt:
      "Practical strategies for cloud cost optimization used by modern engineering teams — from tagging policies to reserved instances and rightsizing workloads.",
    readTime: "6 min read",
    date: "February 2026",
  },
];

const categories = [
  { icon: Library, label: "Blogs", count: "40+ articles", description: "Expert commentary, industry news, and practical how-to guides from our faculty and alumni." },
  { icon: Newspaper, label: "Articles", count: "25+ deep-dives", description: "Technical deep-dives on security, cloud architecture, data engineering, and product management." },
  { icon: FileText, label: "Whitepapers", count: "12+ reports", description: "Research-backed reports and frameworks intended for practitioners and organizational decision-makers." },
  { icon: BookOpen, label: "Guides", count: "18+ guides", description: "Step-by-step learning guides aligned with certification tracks and real-world skill building." },
  { icon: Video, label: "Webinars", count: "30+ sessions", description: "Recorded and upcoming live sessions with industry experts on in-demand technical topics." },
  { icon: Headphones, label: "Podcasts", count: "Coming soon", description: "Conversations with practitioners, founders, and educators shaping the future of the industry." },
];

export default function ResourcesPage() {
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
              Explore curated content from Trust Axis experts — from technical deep-dives to strategic
              frameworks across cybersecurity, data, cloud, and leadership domains.
            </p>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-10 md:mb-12">
              Browse by Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Card
                    key={i}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-5">
                        <div className="h-12 w-12 bg-[#F4F4F5] group-hover:bg-black rounded-lg flex items-center justify-center transition-colors duration-300">
                          <Icon className="h-6 w-6 text-[#212529] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-[10px] font-bold text-[#6C757D] uppercase tracking-widest">{cat.count}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#212529] mb-2">{cat.label}</h3>
                      <p className="text-sm text-[#6C757D] leading-relaxed">{cat.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-10 md:mb-12">
              Featured This Month
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featured.map((post, i) => (
                <Card
                  key={i}
                  className="rounded-xl border border-[#E5E7EB] bg-white hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="h-2 bg-[#212529] rounded-t-xl" />
                  <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block bg-[#F4F4F5] text-[#212529] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                        {post.tag}
                      </span>
                      <span className="text-[11px] text-[#6C757D]">{post.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#212529] leading-snug mb-3 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#6C757D] leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F4F4F5]">
                      <span className="text-[11px] text-[#6C757D]">{post.readTime}</span>
                      <a
                        href="#"
                        className="flex items-center gap-1.5 text-[11px] font-bold text-[#212529] uppercase tracking-widest hover:text-blue-600 transition-colors"
                      >
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
