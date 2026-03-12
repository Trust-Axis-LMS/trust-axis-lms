"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Newspaper, Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

type ArticleItem = {
  title: string;
  description: string;
  category: string;
  readTime: string;
};

interface ArticlesPageProps {
  items: ArticleItem[];
}

export function ArticlesPage({ items }: ArticlesPageProps) {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const normalized = query.toLowerCase();

    return (
      normalized === "" ||
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized)
    );
  });

  const [featuredItem, ...feedItems] = filteredItems;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-[#E8EBEF] bg-[linear-gradient(180deg,#FAFBFC_0%,#FFFFFF_58%)]">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
            <Link
              href="/#resources"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D] transition-colors hover:text-[#212529]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back To Resources
            </Link>

            <div className="mt-10 grid gap-10 border-t border-[#E8EBEF] pt-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
              <div className="max-w-4xl">
                <Badge
                  variant="secondary"
                  className="rounded-sm border border-[#E5E7EB] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529]"
                >
                  <Newspaper className="mr-2 h-3.5 w-3.5" />
                  Articles
                </Badge>

                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                  Trust Axis Journal
                </p>
                <h1 className="mt-5 max-w-[13ch] text-4xl font-bold leading-[1.03] tracking-[-0.03em] text-[#212529] md:text-[4.15rem]">
                  Deep Dives on Skill Development and Delivery
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#5E6975] md:text-lg">
                  Detailed articles on technical education, program design, and workforce
                  readiness for teams comparing learning options with more rigor.
                </p>
              </div>

              <div className="space-y-6 border-t border-[#E8EBEF] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                    Library
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#212529]">
                    {items.length} Articles
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                    Focus
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#212529]">
                    Long-form editorial analysis for operators, team leads, and learning
                    decision-makers.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                  <Clock3 className="h-3.5 w-3.5" />
                  Updated Library
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4 md:px-8">
            <div className="border-b border-[#E8EBEF] pb-8">
              <label className="block max-w-2xl">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529]">
                  Search Articles
                </span>
                <div className="relative mt-3">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C757D]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by topic, theme, or category"
                    className="h-14 w-full rounded-sm border border-[#E5E7EB] bg-white pl-12 pr-4 text-base text-[#212529] outline-none transition-colors placeholder:text-[#7C8793] focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/15"
                  />
                </div>
              </label>
            </div>

            <div className="pt-10">
              {featuredItem ? (
                <article className="border-b border-[#E8EBEF] pb-10">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em]">
                        <span className="rounded-sm bg-[#F4F4F5] px-3 py-1.5 text-[#212529]">
                          {featuredItem.category}
                        </span>
                        <span className="text-[#6C757D]">Featured Article</span>
                      </div>

                      <h2 className="mt-6 max-w-[15ch] text-3xl font-bold leading-[1.06] tracking-[-0.03em] text-[#212529] md:text-[3.7rem]">
                        {featuredItem.title}
                      </h2>
                      <p className="mt-5 max-w-3xl text-base leading-8 text-[#5E6975] md:text-lg">
                        {featuredItem.description}
                      </p>

                      <a
                        href="#"
                        className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529] transition-colors hover:text-[#007BFF]"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="border-t border-[#E8EBEF] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                        Reading Time
                      </p>
                      <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#212529]">
                        {featuredItem.readTime}
                      </p>

                      <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                        Focus
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#212529]">
                        Analytical writing for leaders evaluating learning quality,
                        program structure, and team-readiness outcomes.
                      </p>
                    </div>
                  </div>
                </article>
              ) : (
                <div className="border-b border-[#E8EBEF] py-10">
                  <p className="text-lg font-semibold text-[#212529]">No articles found</p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#5E6975]">
                    Try a different keyword or browse the full article index again.
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529] transition-colors hover:text-[#007BFF]"
                  >
                    Clear Search
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {feedItems.length > 0 && (
                <div className="divide-y divide-[#E8EBEF]">
                  {feedItems.map((item) => (
                    <article
                      key={item.title}
                      className="grid gap-5 py-8 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-start md:gap-8"
                    >
                      <div className="flex flex-wrap items-center gap-3 md:block">
                        <span className="inline-flex rounded-sm bg-[#F4F4F5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#212529]">
                          {item.category}
                        </span>
                        <p className="mt-0 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D] md:mt-4">
                          {item.readTime}
                        </p>
                      </div>

                      <div>
                        <h3 className="max-w-[20ch] text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#212529]">
                          {item.title}
                        </h3>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-[#5E6975]">
                          {item.description}
                        </p>
                      </div>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 self-start pt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529] transition-colors hover:text-[#007BFF]"
                      >
                        Read
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
