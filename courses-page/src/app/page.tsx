"use client";

import { useState, useMemo } from "react";
import { Search, BookOpen, Download } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { courses, categories } from "@/lib/courses-data";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-[#F4F4F5] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 bg-[#F4F4F5] text-[#212529] rounded-sm px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Course Catalog
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#212529] tracking-tight leading-tight mb-6">
              Explore Our Programs
            </h1>
            <p className="text-[#6C757D] text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Industry-aligned programs designed to transform your career.
              Download brochures, explore curricula, and find your perfect program.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses, categories, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-14 rounded-sm border border-gray-200 bg-white text-[#212529] text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Category Filters + Courses Grid */}
        <section className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-sm text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-black text-white"
                      : "bg-[#F4F4F5] text-[#6C757D] hover:bg-gray-200 hover:text-[#212529]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="mb-6 md:mb-8 flex items-center justify-between">
              <p className="text-sm text-[#6C757D] font-medium">
                {filteredCourses.length === 0
                  ? "No courses found"
                  : `${filteredCourses.length} program${filteredCourses.length !== 1 ? "s" : ""} found`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-xs font-bold text-[#6C757D] hover:text-[#212529] uppercase tracking-widest transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#212529] mb-2">
                  No courses found
                </h3>
                <p className="text-[#6C757D] mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 h-11 rounded-sm bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
                >
                  View All Courses
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Download All Brochures CTA */}
        <section className="bg-[#F9FAFB] border-t border-[#F4F4F5] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-4">
              Not Sure Which Program?
            </h2>
            <p className="text-[#6C757D] text-base md:text-lg mb-8 leading-relaxed">
              Download our complete course catalog brochure and let our
              enrollment advisors help you pick the right program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => alert("Complete course catalog brochure coming soon!")}
                className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/80 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Course Catalog
              </button>
              <a
                href="https://trust-axis-frontend.vercel.app/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-gray-300 text-[#212529] font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                Speak to an Advisor
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
