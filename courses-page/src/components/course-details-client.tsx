"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Download,
  ArrowRight,
  Clock,
  Monitor,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Users,
  FlaskConical,
  UserCheck,
  Briefcase,
  FolderKanban,
  Brain,
  Database,
  Activity,
  BarChart2,
  GitBranch,
  Cloud,
  Server,
  Code,
  LineChart,
  Rocket,
  Megaphone,
  GraduationCap,
  Cpu,
  Terminal,
  Zap,
  Search,
  Network,
  Bell,
  Lock,
  Wifi,
  Flame,
  Cog,
  Box,
  Table,
  PieChart,
  BookOpen,
  FileText,
  Layers,
  CheckSquare,
  LayoutDashboard,
  Mail,
  Globe,
  Link as LinkIcon,
  Send,
  Pen,
  Wind,
  ScanSearch,
  FolderSearch,
  FileCode,
} from "lucide-react";

// Map icon string names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Shield: ShieldCheck,
  FlaskConical,
  UserCheck,
  Award,
  Briefcase,
  FolderKanban,
  Users,
  Brain,
  Database,
  Activity,
  BarChart2,
  GitBranch,
  Cloud,
  Server,
  Code,
  LineChart,
  Rocket,
  Megaphone,
  GraduationCap,
  Cpu,
  Terminal,
  Zap,
  Search,
  Network,
  Bell,
  Lock,
  Wifi,
  Flame,
  Cog,
  Box,
  Table,
  PieChart,
  BookOpen,
  FileText,
  Layers,
  CheckSquare,
  LayoutDashboard,
  Mail,
  Globe,
  Link: LinkIcon,
  Send,
  Pen,
  Wind,
  ScanSearch,
  FolderSearch,
  FileCode,
  Clock,
  Monitor,
};

function getIcon(name: string, className?: string) {
  const IconComp = iconMap[name] || ShieldCheck;
  return <IconComp className={className ?? "h-6 w-6"} />;
}

type TabKey = "about" | "objectives" | "curriculum" | "audience" | "exam" | "tools";

const tabs: { key: TabKey; label: string }[] = [
  { key: "about", label: "About Course" },
  { key: "objectives", label: "Course Objectives" },
  { key: "curriculum", label: "Course Curriculum" },
  { key: "audience", label: "Target Audience" },
  { key: "exam", label: "Exam Details" },
  { key: "tools", label: "Tools Covered" },
];

import type { Course } from "@/lib/courses-data";

interface CourseDetailsClientProps {
  course: Course;
}

export function CourseDetailsClient({ course }: CourseDetailsClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

  const toggleModule = (num: number) => {
    setExpandedModules((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION 1: Hero */}
      <section className="bg-white border-b border-[#F4F4F5] py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Category Badge */}
          <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
            {course.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#212529] tracking-tight leading-tight mb-8 max-w-4xl">
            {course.title}
          </h1>

          {/* Highlights */}
          <ul className="space-y-4 mb-10 max-w-3xl">
            {course.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#212529] mt-0.5 shrink-0 fill-black text-white" />
                <span className="text-[#6C757D] text-sm md:text-base leading-relaxed">
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/80 transition-colors"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => alert("Brochure PDF coming soon!")}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border-2 border-[#212529] text-[#212529] font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10 border-t border-[#F4F4F5]">
            <div>
              <div className="flex items-center gap-2 text-[#212529] mb-1">
                <Clock className="h-5 w-5 text-[#6C757D]" />
                <span className="text-2xl md:text-3xl font-bold">
                  {course.duration}
                </span>
              </div>
              <p className="text-[11px] text-[#6C757D] font-medium uppercase tracking-widest">
                Program Duration
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#212529] mb-1">
                <Monitor className="h-5 w-5 text-[#6C757D]" />
                <span className="text-2xl md:text-3xl font-bold">
                  {course.mode}
                </span>
              </div>
              <p className="text-[11px] text-[#6C757D] font-medium uppercase tracking-widest">
                Learning Mode
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#212529] mb-1">
                <Calendar className="h-5 w-5 text-[#6C757D]" />
                <span className="text-2xl md:text-3xl font-bold">
                  {course.weeklyHours}
                </span>
              </div>
              <p className="text-[11px] text-[#6C757D] font-medium uppercase tracking-widest">
                Weekly Commitment
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#212529] mb-1">
                <Award className="h-5 w-5 text-[#6C757D]" />
                <span className="text-2xl md:text-3xl font-bold">
                  {course.certificate}
                </span>
              </div>
              <p className="text-[11px] text-[#6C757D] font-medium uppercase tracking-widest">
                Certificate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Program Highlights */}
      <section className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
              Program Highlights
            </h2>
            <p className="text-[#6C757D] text-sm md:text-base">
              Key features that make this program stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {course.programHighlights.map((highlight, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E5E7EB] p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white mb-5">
                  {getIcon(highlight.icon, "h-6 w-6")}
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#212529] mb-2 tracking-tight">
                  {highlight.title}
                </h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Tabbed Content */}
      <section className="bg-white">
        {/* Sticky Tab Bar */}
        <div className="sticky top-[90px] z-30 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex overflow-x-auto scrollbar-hide gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-4 md:px-6 py-4 md:py-5 text-[11px] md:text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-black text-black"
                      : "border-transparent text-[#6C757D] hover:text-[#212529]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12 md:py-16">
          {/* About Course */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-8">
                About This Course
              </h2>
              <div className="space-y-5">
                {course.aboutCourse.map((para, i) => (
                  <p
                    key={i}
                    className="text-[#4A5568] text-sm md:text-base leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
              {/* Director Quote */}
              <blockquote className="mt-10 border-l-4 border-[#212529] pl-6 py-4 bg-[#F9FAFB] rounded-r-lg">
                <p className="text-[#212529] text-sm md:text-base italic leading-relaxed mb-3">
                  &ldquo;{course.directorQuote.text}&rdquo;
                </p>
                <cite className="text-[#6C757D] text-xs md:text-sm font-bold not-italic uppercase tracking-widest">
                  — {course.directorQuote.author}
                </cite>
              </blockquote>
            </div>
          )}

          {/* Course Objectives */}
          {activeTab === "objectives" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                Course Objectives
              </h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                Upon completion of this program, you will be able to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {course.objectives.map((obj) => (
                  <div
                    key={obj.number}
                    className="border border-[#E5E7EB] rounded-xl p-5 md:p-6 flex gap-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="h-8 w-8 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold shrink-0">
                      {obj.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#212529] text-sm md:text-base mb-1.5">
                        {obj.title}
                      </h3>
                      <p className="text-[#6C757D] text-xs md:text-sm leading-relaxed">
                        {obj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Curriculum */}
          {activeTab === "curriculum" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                Course Curriculum
              </h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                A comprehensive curriculum covering all aspects of{" "}
                {course.category.toLowerCase()}
              </p>
              <div className="space-y-3">
                {course.curriculum.map((mod) => {
                  const isExpanded = expandedModules.includes(mod.number);
                  return (
                    <div
                      key={mod.number}
                      className="border border-[#E5E7EB] rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(mod.number)}
                        className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-[#F9FAFB] transition-colors"
                      >
                        <div className="h-9 w-9 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold shrink-0">
                          {mod.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#212529] text-sm md:text-base truncate">
                            {mod.title}
                          </h3>
                          <p className="text-[#6C757D] text-xs mt-0.5">
                            {mod.duration}
                            {mod.modules > 0 && ` · ${mod.modules} modules`}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-[#6C757D] shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#6C757D] shrink-0" />
                        )}
                      </button>
                      {isExpanded && mod.subtopics.length > 0 && (
                        <div className="border-t border-[#F4F4F5] px-5 md:px-6 py-4 bg-[#FAFAFA]">
                          <ul className="space-y-3">
                            {mod.subtopics.map((sub, si) => (
                              <li
                                key={si}
                                className="flex items-center gap-3 text-sm text-[#4A5568]"
                              >
                                <CheckCircle className="h-4 w-4 text-[#212529] fill-black text-white shrink-0" />
                                {sub.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Target Audience */}
          {activeTab === "audience" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                Who Is This For?
              </h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                This program is designed for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {course.targetAudience.map((item, i) => (
                  <div
                    key={i}
                    className="border border-[#E5E7EB] rounded-xl p-6 flex gap-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                      {getIcon(item.icon, "h-6 w-6")}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#212529] text-sm md:text-base mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-[#6C757D] text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Details */}
          {activeTab === "exam" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                Exam Details
              </h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                Certifications included in this program
              </p>
              <div className="space-y-4">
                {course.examDetails.map((exam, i) => (
                  <div
                    key={i}
                    className="border border-[#E5E7EB] rounded-xl p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-[#212529]" />
                          <h3 className="font-bold text-[#212529] text-base md:text-lg">
                            {exam.name}
                          </h3>
                        </div>
                        <p className="text-[#6C757D] text-sm ml-8">
                          Provider: {exam.provider}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-[#F4F4F5] rounded-sm px-4 py-2">
                          <p className="text-[10px] text-[#6C757D] uppercase tracking-widest font-bold mb-0.5">
                            Pass Score
                          </p>
                          <p className="text-[#212529] font-bold text-sm">
                            {exam.passScore}
                          </p>
                        </div>
                        <div
                          className={`rounded-sm px-4 py-2 ${
                            exam.prepIncluded
                              ? "bg-black text-white"
                              : "bg-[#F4F4F5]"
                          }`}
                        >
                          <p
                            className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${
                              exam.prepIncluded
                                ? "text-white/70"
                                : "text-[#6C757D]"
                            }`}
                          >
                            Exam Prep
                          </p>
                          <p
                            className={`font-bold text-sm ${
                              exam.prepIncluded ? "text-white" : "text-[#212529]"
                            }`}
                          >
                            {exam.prepIncluded ? "✓ Included" : "Not included"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools Covered */}
          {activeTab === "tools" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                Tools Covered
              </h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                Industry-standard tools and technologies you&apos;ll master in
                this program
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {course.toolsCovered.map((tool, i) => (
                  <div
                    key={i}
                    className="border border-[#E5E7EB] rounded-xl p-4 md:p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow group"
                  >
                    <div className="h-12 w-12 bg-[#F4F4F5] group-hover:bg-black rounded-lg flex items-center justify-center mb-3 transition-colors duration-300">
                      <span className="text-[#212529] group-hover:text-white transition-colors duration-300">
                        {getIcon(tool.icon, "h-6 w-6")}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#212529] text-sm mb-1">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] text-[#6C757D] font-bold uppercase tracking-widest">
                      {tool.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enroll CTA */}
      <section id="contact" className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join {course.students}+ students already enrolled in{" "}
            {course.title}. The next cohort starts soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://trust-axis-frontend.vercel.app/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 h-14 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => alert("Brochure PDF coming soon!")}
              className="inline-flex items-center justify-center gap-2 px-10 h-14 rounded-sm border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </button>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              ← Back to All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
