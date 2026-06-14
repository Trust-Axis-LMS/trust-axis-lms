"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import { courses, categories } from "@/lib/courses-data";
import { getCourseCategoryMeta } from "@/lib/course-category-meta";
import { cn } from "@/lib/utils";

const domainCategories = categories.filter((c) => c !== "All");

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);

  /* ── helpers ─────────────────────────────────────── */
  const toggleCategory = (category: string) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  const clearCategories = () => setSelectedCategories([]);

  /* ── derived ─────────────────────────────────────── */
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCount = selectedCategories.length;

  // Short heading label — always fits on mobile
  const headingLabel =
    activeCount === 0
      ? "All Programs"
      : activeCount === 1
      ? getCourseCategoryMeta(selectedCategories[0]).shortLabel
      : `${activeCount} Domains`;

  /* ── close panel on outside click (desktop dropdown only) ── */
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      const target = e.target as Node;
      const inRow = dropdownRef.current?.contains(target);
      // mobile sheet is position:fixed — outside dropdownRef DOM subtree
      const inSheet = mobileSheetRef.current?.contains(target);
      if (!inRow && !inSheet) setFilterOpen(false);
    }
    if (filterOpen) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [filterOpen]);

  /* ── lock body scroll when mobile sheet is open ───── */
  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [filterOpen]);

  /* ── scroll catalog on category change ─────────────  */
  useEffect(() => {
    const el = document.getElementById("catalog-grid");
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  }, [selectedCategories]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────── */}
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
                  <h1 className="max-w-[22ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[3.8rem]">
                    Structured Programs for Technical and Leadership Teams.
                  </h1>
                  <p className="max-w-[720px] text-base leading-8 text-muted md:text-lg">
                    Explore certification-aware training paths across security, data, cloud, and
                    engineering domains. Structured for professionals and leadership teams.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#catalog-grid"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Explore Programs <ArrowRight className="h-4 w-4" />
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
                      alt="Trust Axis program catalog"
                      width={800}
                      height={620}
                      className="h-auto w-full rounded-[1.4rem] border border-white/60"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Catalog ───────────────────────────────────── */}
        <section id="catalog-grid" className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">

            {/* Search + Filter button row */}
            <div className="relative flex gap-3" ref={dropdownRef}>

              {/* Search — flex-1, self-contained */}
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-md border border-border bg-background pl-11 pr-9 text-sm text-foreground placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter button */}
              <button
                onClick={() => setFilterOpen((p) => !p)}
                aria-label="Open filters"
                className={cn(
                  "relative inline-flex h-12 shrink-0 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition-colors",
                  activeCount > 0 || filterOpen
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
                {activeCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[11px] font-bold">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Desktop dropdown — shown only on lg+, positioned relative to row */}
              {filterOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 hidden rounded-xl border border-border bg-white shadow-[0_20px_60px_rgba(33,37,41,0.14)] lg:block">
                  <FilterPanel
                    domainCategories={domainCategories}
                    selectedCategories={selectedCategories}
                    filteredCount={filteredCourses.length}
                    onToggle={toggleCategory}
                    onClear={clearCategories}
                    onClose={() => setFilterOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* ── Mobile bottom sheet ───────────────────── */}
            {filterOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
                  onClick={() => setFilterOpen(false)}
                />
                {/* Sheet — ref needed so outside-click handler ignores taps inside */}
                <div ref={mobileSheetRef} className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white lg:hidden">
                  <FilterPanel
                    domainCategories={domainCategories}
                    selectedCategories={selectedCategories}
                    filteredCount={filteredCourses.length}
                    onToggle={toggleCategory}
                    onClear={clearCategories}
                    onClose={() => setFilterOpen(false)}
                  />
                </div>
              </>
            )}

            {/* Results heading — short text, safe on any screen */}
            <div className="mt-8 mb-6 flex items-center gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                {headingLabel}
              </p>
              <div className="flex-1 border-t border-foreground/10" />
              <span className="text-xs font-semibold text-muted">
                {filteredCourses.length} {filteredCourses.length === 1 ? "program" : "programs"}
              </span>
            </div>

            {/* Search/category clear hint */}
            {(searchQuery || activeCount > 0) && (
              <p className="mb-4 text-xs text-muted">
                Showing filtered results.{" "}
                <button onClick={resetFilters} className="font-semibold text-primary underline-offset-2 hover:underline">
                  Clear all
                </button>
              </p>
            )}

            {/* Course grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
                <Search className="mx-auto h-10 w-10 text-muted" />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">No programs matched</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
                  Try a different domain or clear your search.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View All Programs
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Advisor CTA */}
        <section className="border-t border-[#F4F4F5] bg-[#F9FAFB] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#212529] md:text-4xl">
              Need Help Choosing a Program?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#6C757D] md:text-lg">
              Speak with an enrollment advisor to compare programs and find the best fit for your goals.
            </p>
            <a
              href="https://trust-axis-frontend.vercel.app/#contact"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-black px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
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

/* ── Shared filter panel content (used in both sheet + dropdown) ── */
function FilterPanel({
  domainCategories,
  selectedCategories,
  filteredCount,
  onToggle,
  onClear,
  onClose,
}: {
  domainCategories: string[];
  selectedCategories: string[];
  filteredCount: number;
  onToggle: (cat: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <p className="text-sm font-bold uppercase tracking-widest text-foreground">Filter by Domain</p>
        <div className="flex items-center gap-4">
          {selectedCategories.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs font-semibold text-muted hover:text-foreground"
            >
              Clear ({selectedCategories.length})
            </button>
          )}
          <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
        {domainCategories.map((category) => {
          const meta = getCourseCategoryMeta(category);
          const CategoryIcon = meta.icon;
          const isActive = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => onToggle(category)}
              className={cn(
                "flex items-center gap-2 rounded-lg border p-3 text-left text-xs font-semibold transition-all",
                isActive
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
              )}
            >
              <CategoryIcon className="h-4 w-4 shrink-0" />
              <span className="leading-tight">{meta.shortLabel}</span>
              {isActive && <X className="ml-auto h-3 w-3 shrink-0 opacity-70" />}
            </button>
          );
        })}
      </div>

      {/* Footer — view results button */}
      <div className="border-t border-border px-5 py-4">
        <button
          onClick={onClose}
          className="w-full rounded-md bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
        >
          View {filteredCount} {filteredCount === 1 ? "Program" : "Programs"}
        </button>
      </div>
    </div>
  );
}
