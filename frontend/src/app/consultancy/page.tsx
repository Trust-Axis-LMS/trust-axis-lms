import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Globe, Lock, Shield, Cloud, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { consultancies } from "@/lib/consultancy-data";
import { PRACTICE_AREAS, contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consultancy Practice Areas",
  description:
    "Trust Axis advisory across cybersecurity, AI and technology, privacy and data protection, cloud and technology risk, banking services and ESG.",
};

const ICONS: Record<string, React.ElementType> = {
  ShieldCheck: Shield, Brain, Lock, Cloud, TrendingUp, Globe,
};

const practices = PRACTICE_AREAS.map((area) => {
  const data = consultancies.find((c) => c.slug === area.slug);
  return { ...area, excerpt: data?.excerpt ?? "", color: data?.color ?? "#007BFF", icon: ICONS[data?.icon ?? ""] ?? Shield };
});

export default function ConsultancyHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Our Practice Areas</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#212529] tracking-tight leading-tight mb-6">
              Consultancy Services
            </h1>
            <p className="text-[#6C757D] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Practical, risk-led advisory that helps organizations strengthen security, govern AI, protect data
              and grow responsibly.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {practices.map((practice) => {
              const Icon = practice.icon;
              return (
                <Link
                  key={practice.slug}
                  href={`/consultancy/${practice.slug}`}
                  className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${practice.color}15`, color: practice.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-[#212529] mb-3">{practice.label}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-[#6C757D] line-clamp-4">{practice.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#212529] group-hover:text-[#007BFF] transition-colors">
                    Explore Practice <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-black text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Not Sure Where to Start?</h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Tell us about your challenge and we will point you to the right practice.
            </p>
            <Link
              href={contactHref("", "consultancy")}
              className="inline-flex h-14 items-center justify-center gap-2 px-8 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
