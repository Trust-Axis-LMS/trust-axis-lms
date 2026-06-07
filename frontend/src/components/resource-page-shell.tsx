"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  FileText,
  Newspaper,
  ScrollText,
  Search,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ResourceItem = {
  title: string;
  description: string;
  category: string;
  readTime: string;
  href?: string;
  coverImageUrl?: string;
  author?: string;
  date?: string;
};

interface ResourcePageShellProps {
  variant: "blogs" | "articles" | "whitepapers";
  badge: string;
  title: string;
  intro: string;
  items: ResourceItem[];
}

const resourceVariants = {
  blogs: {
    icon: BookOpen,
    heroClassName:
      "border-b border-[#F4F4F5] bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.14),transparent_35%),linear-gradient(180deg,rgba(0,123,255,0.07)_0%,rgba(255,255,255,1)_60%)]",
    heroPanelClassName:
      "rounded-[2rem] border border-[#DCE7F7] bg-white/88 p-8 shadow-[0_18px_60px_rgba(0,123,255,0.08)]",
    heroAccentClassName:
      "bg-[linear-gradient(135deg,#212529_0%,#007BFF_100%)] text-white",
    gridClassName: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    cardClassName:
      "group overflow-hidden rounded-[1.5rem] border border-transparent bg-white p-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E4E4E7] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] h-full flex flex-col",
    cardBandClassName: "hidden",
    ctaLabel: "Read Post",
  },
  articles: {
    icon: Newspaper,
    heroClassName:
      "border-b border-[#E6E8EB] bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_40%),linear-gradient(180deg,rgba(247,249,252,0.9)_0%,rgba(255,255,255,1)_100%)]",
    heroPanelClassName: "",
    heroAccentClassName: "bg-[#111] text-white",
    gridClassName: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    cardClassName:
      "group overflow-hidden rounded-[1.5rem] border border-transparent bg-white p-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E4E4E7] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] h-full flex flex-col",
    cardBandClassName: "hidden",
    ctaLabel: "Read Article",
  },
  whitepapers: {
    icon: ScrollText,
    heroClassName:
      "border-b border-[#111827] bg-[linear-gradient(135deg,#101827_0%,#17365C_55%,#2E7BE8_100%)] text-white",
    heroPanelClassName:
      "rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur",
    heroAccentClassName:
      "bg-white/10 text-white ring-1 ring-white/14 backdrop-blur",
    gridClassName: "grid-cols-1 xl:grid-cols-2",
    cardClassName:
      "group overflow-hidden rounded-[1.5rem] border border-transparent bg-white p-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E4E4E7] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] h-full flex flex-col",
    cardBandClassName: "hidden",
    ctaLabel: "View Summary",
  },
} as const;

export function ResourcePageShell({
  variant,
  badge,
  title,
  intro,
  items,
}: ResourcePageShellProps) {
  const config = resourceVariants[variant];
  const HeroIcon = config.icon;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className={cn("py-16 md:py-20", config.heroClassName)}>
          <div className="container mx-auto max-w-6xl px-4 md:px-8">
            <Link
              href="/#resources"
              className={cn(
                "mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                variant === "whitepapers"
                  ? "text-white/72 hover:text-white"
                  : "text-[#6C757D] hover:text-[#212529]"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back To Resources
            </Link>

            <div className={config.heroPanelClassName}>
              <div className="max-w-[820px]">
                <Badge
                  variant="secondary"
                  className={cn(
                    "mb-6 rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                    variant === "whitepapers"
                      ? "border-white/14 bg-white/8 text-white"
                      : "border-[#E5E7EB] bg-white text-[#212529]"
                  )}
                >
                  <HeroIcon className="mr-2 h-3.5 w-3.5" />
                  {badge}
                </Badge>


                    <h1
                      className={cn(
                        "max-w-[14ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-6xl",
                        variant === "whitepapers" ? "text-white" : "text-[#212529]"
                      )}
                    >
                      {title}
                    </h1>
                    <p
                      className={cn(
                        "mt-6 max-w-3xl text-base leading-8 md:text-lg",
                        variant === "whitepapers"
                          ? "text-white/76"
                          : "text-[#6C757D]"
                      )}
                    >
                      {intro}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]",
                          config.heroAccentClassName
                        )}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {items.length} Featured Pieces
                      </div>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]",
                          variant === "whitepapers"
                            ? "bg-white/10 text-white/88 ring-1 ring-white/14"
                            : "bg-[#F4F4F5] text-[#6C757D]"
                        )}
                      >
                        <Clock3 className="h-3.5 w-3.5" />
                        Updated Library
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F9FAFB]">
          <div className="container mx-auto max-w-6xl px-4 md:px-8">
              {/* Search Bar */}
              <div className="mb-16 max-w-3xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-[#9CA3AF] transition-colors group-focus-within:text-[#007BFF]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the library..."
                    className="block w-full pl-16 pr-8 py-5 bg-white border border-[#E5E7EB] rounded-full text-[18px] focus:ring-4 focus:ring-[#007BFF]/15 focus:border-[#007BFF] outline-none transition-all shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)] placeholder:text-[#9CA3AF] text-[#212529]"
                  />
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-16 text-center text-[#6C757D]">
                  <p className="text-lg">No resources found matching &quot;{searchQuery}&quot;.</p>
                </div>
              ) : (
                <div className={cn("grid gap-6 md:gap-8", config.gridClassName)}>
                  {filteredItems.map((item) => (
                  <Link key={item.title} href={item.href ?? "#"} className="outline-none flex flex-col h-full">
                    <Card className={config.cardClassName}>
                      {config.cardBandClassName !== "hidden" && (
                        <div className={config.cardBandClassName} />
                      )}
                      {/* Optional cover image for articles/blogs */}
                      {item.coverImageUrl && (
                        <div className="h-52 w-full bg-[#F4F4F5] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={item.coverImageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        </div>
                      )}
                      <CardContent className="flex h-full flex-col p-6 md:p-8">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]",
                              variant === "whitepapers"
                                ? "bg-[#EAF3FF] text-[#17365C]"
                                : "bg-[#F4F4F5] text-[#212529]"
                            )}
                          >
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6C757D] tracking-wider uppercase">
                            <Clock3 className="h-3.5 w-3.5" />
                            {item.readTime}
                          </div>
                        </div>

                        <h2
                          className={cn(
                            "mt-6 text-2xl md:text-[26px] font-bold leading-[1.25] tracking-tight text-[#212529] line-clamp-3",
                            variant === "whitepapers" ? "max-w-[18ch]" : ""
                          )}
                        >
                          {item.title}
                        </h2>
                        <p className="mt-4 flex-1 text-sm leading-7 text-[#6C757D] line-clamp-3">
                          {item.description}
                        </p>

                        <div className="mt-8 flex items-center justify-between border-t border-[#F4F4F5] pt-5">
                          {item.author && (
                            <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">
                              {item.author}
                            </span>
                          )}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                              variant === "whitepapers"
                                ? "text-[#17365C] group-hover:text-[#007BFF]"
                                : "text-[#212529] group-hover:text-[#007BFF]"
                            )}
                          >
                            {config.ctaLabel}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
