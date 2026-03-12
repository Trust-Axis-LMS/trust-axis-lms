"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import { courses, categories } from "@/lib/courses-data";
import { getCourseCategoryMeta } from "@/lib/course-category-meta";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategoryLabel =
    selectedCategory === "All" ? "All Programs" : selectedCategory;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.12),transparent_32%),linear-gradient(180deg,rgba(0,123,255,0.07)_0%,rgba(255,255,255,1)_48%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-primary/10" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-10 py-14 md:pb-16 md:pt-[4.5rem] lg:grid-cols-[minmax(0,780px)_minmax(320px,430px)] lg:items-center lg:gap-12 lg:pb-[4.5rem] lg:pt-20">
              <div className="max-w-[760px]">
                <Badge
                  variant="secondary"
                  className="mb-6 h-auto gap-2 rounded-sm border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Training Catalog
                </Badge>

                <div className="space-y-6">
                  <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[3.8rem]">
                    Structured Programs for Technical and Leadership Teams.
                  </h1>
                  <p className="max-w-[720px] text-base leading-8 text-muted md:text-lg">
                    Explore certification-aware training paths across security,
                    data, cloud, product, and engineering domains. Trust Axis
                    programs are structured for professionals, team leads, and
                    organizations comparing serious learning options.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#catalog-grid"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Explore Programs
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://trust-axis-frontend.vercel.app/#contact"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-border bg-background px-8 text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative mx-auto max-w-[430px]">
                  <div className="absolute inset-6 rounded-[2rem] bg-primary/12 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/70 p-3 shadow-[0_24px_70px_rgba(33,37,41,0.12)] backdrop-blur">
                    <Image
                      src="/catalog-hero-visual.svg"
                      alt="Trust Axis program catalog preview"
                      width={800}
                      height={620}
                      className="h-auto w-full rounded-[1.4rem] border border-white/60"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 left-5 rounded-full border border-primary/12 bg-white/92 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground shadow-[0_12px_26px_rgba(33,37,41,0.08)]">
                    Program Pathways
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Workspace */}
        <section id="catalog-grid" className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
              <aside className="hidden lg:sticky lg:top-[114px] lg:block lg:self-start">
                <div className="max-h-[calc(100vh-138px)] overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-[0_16px_48px_rgba(33,37,41,0.06)]">
                  <div className="border-b border-border pb-5">
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      Course Catalogue
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      Browse Categories
                    </p>
                  </div>

                  <nav className="mt-5 space-y-2" aria-label="Course categories">
                    {categories.map((category) => {
                      const categoryMeta = getCourseCategoryMeta(category);
                      const CategoryIcon = categoryMeta.icon;

                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200",
                            selectedCategory === category
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_14px_32px_rgba(0,123,255,0.22)]"
                              : "border-transparent bg-background text-foreground hover:border-border hover:bg-secondary"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border",
                              selectedCategory === category
                                ? "border-white/20 bg-white/10"
                                : "border-border bg-secondary"
                            )}
                          >
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate uppercase tracking-[0.08em]">
                              {category}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              <div className="min-w-0">
                <div className="lg:hidden">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                    Browse Categories
                  </p>
                  <div className="mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex min-w-max gap-2 pb-1">
                      {categories.map((category) => {
                        const categoryMeta = getCourseCategoryMeta(category);
                        const CategoryIcon = categoryMeta.icon;

                        return (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                              selectedCategory === category
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            )}
                          >
                            <CategoryIcon className="h-3.5 w-3.5" />
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-10 lg:mt-0 lg:pr-2">
                  <div className="flex items-center gap-4">
                    <h2 className="shrink-0 text-xl font-bold uppercase tracking-[0.16em] text-foreground md:text-2xl">
                      {activeCategoryLabel}
                    </h2>
                    <div className="h-px flex-1 bg-foreground/15" />
                  </div>

                  <div className="mt-5 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
                    <p className="font-medium text-muted">
                      {filteredCourses.length === 0
                        ? "No programs found"
                        : `${filteredCourses.length} program${filteredCourses.length !== 1 ? "s" : ""} found`}
                      {selectedCategory !== "All" && ` in ${selectedCategory}`}
                      {searchQuery && ` for "${searchQuery}"`}
                    </p>

                    {(searchQuery || selectedCategory !== "All") && (
                      <button
                        onClick={resetFilters}
                        className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  <div className="mt-5 lg:sticky lg:top-[114px] lg:z-30">
                    <div className="rounded-md border border-border bg-white/96 p-3 shadow-[0_8px_28px_rgba(33,37,41,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/90 md:p-3.5">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="inline-flex h-10 items-center rounded-sm border border-border bg-secondary px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
                          {activeCategoryLabel}
                        </div>

                        <label className="block flex-1">
                          <span className="sr-only">Search Catalog</span>
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                            <input
                              type="text"
                              placeholder="Search by program, domain, or specialization"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="h-11 w-full rounded-sm border border-border bg-background pl-12 pr-4 text-base text-foreground transition-colors placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {filteredCourses.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
                      {filteredCourses.map((course) => (
                        <CourseCard key={course.slug} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
                      <Search className="mx-auto h-10 w-10 text-muted" />
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                        No programs matched your search
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
                        Adjust the selected category or search term to explore the
                        available Trust Axis programs.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-8 inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        View All Programs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advisor CTA */}
        <section className="bg-[#F9FAFB] border-t border-[#F4F4F5] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-4">
              Need Help Choosing a Program?
            </h2>
            <p className="text-[#6C757D] text-base md:text-lg mb-8 leading-relaxed">
              Speak with an enrollment advisor to compare programs, review
              curricula, and find the best fit for your goals.
            </p>
            <a
              href="https://trust-axis-frontend.vercel.app/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/80 transition-colors"
            >
              Speak to an Advisor
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
