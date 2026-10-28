"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle, ArrowRight, Clock, Monitor, Calendar, Award, ChevronDown, ChevronUp,
  ShieldCheck, Users, FlaskConical, UserCheck, Briefcase, FolderKanban, Brain,
  Database, Activity, BarChart2, GitBranch, Cloud, Server, Code, LineChart, Rocket,
  Megaphone, GraduationCap, Cpu, Terminal, Zap, Search, Network, Bell, Lock, Wifi,
  Flame, Cog, Box, Table, PieChart, BookOpen, FileText, Layers, CheckSquare,
  LayoutDashboard, Mail, Globe, Link as LinkIcon, Send, Pen, Wind, ScanSearch,
  FolderSearch, FileCode, Download,
} from "lucide-react";
import { MAIN_SITE_URL } from "@/lib/url";
import { contactHref } from "@/lib/site";

import { motion, AnimatePresence } from "framer-motion";

// ─── Icon Map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Shield: ShieldCheck, FlaskConical, UserCheck, Award, Briefcase, FolderKanban, Users,
  Brain, Database, Activity, BarChart2, GitBranch, Cloud, Server, Code, LineChart,
  Rocket, Megaphone, GraduationCap, Cpu, Terminal, Zap, Search, Network, Bell, Lock,
  Wifi, Flame, Cog, Box, Table, PieChart, BookOpen, FileText, Layers, CheckSquare,
  LayoutDashboard, Mail, Globe, Link: LinkIcon, Send, Pen, Wind, ScanSearch,
  FolderSearch, FileCode, Clock, Monitor,
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

function groupSubtopics(subtopics: {title: string}[]) {
  const parentRegex = /^(\d+\.\d+)/;
  const groups: { parent: string, children: string[] }[] = [];
  let currentGroup: { parent: string, children: string[] } | null = null;
  
  const hasNumberedParents = subtopics.some(sub => parentRegex.test(sub.title));
  
  if (!hasNumberedParents) {
    return subtopics.map(sub => ({ parent: sub.title, children: [] }));
  }
  
  subtopics.forEach(sub => {
    if (parentRegex.test(sub.title)) {
      currentGroup = { parent: sub.title, children: [] };
      groups.push(currentGroup);
    } else {
      if (currentGroup) {
        currentGroup.children.push(sub.title);
      } else {
        groups.push({ parent: sub.title, children: [] });
      }
    }
  });
  
  return groups;
}

export function CourseDetailsClient({ course }: CourseDetailsClientProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Only show tabs that have real content for this course
  const tabHasContent: Record<TabKey, boolean> = {
    about: course.aboutCourse.length > 0,
    objectives: course.objectives.length > 0,
    curriculum: course.curriculum.length > 0,
    audience: course.targetAudience.length > 0,
    exam: course.examDetails.length > 0,
    tools: course.toolsCovered.length > 0,
  };
  const visibleTabs = tabs.filter((tab) => tabHasContent[tab.key]);

  const [activeTab, setActiveTab] = useState<TabKey>(visibleTabs[0]?.key ?? "about");
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const brochureHref = contactHref(MAIN_SITE_URL, "brochure", course.title);

  const toggleModule = (num: number) => {
    setExpandedModules((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };


  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION 1: Banner Hero */}
      <section className="relative overflow-hidden bg-[#18181B] border-b border-[#F4F4F5]">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 z-10" />
        {course.thumbnailUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={course.thumbnailUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
        ) : (
          <>
            {/* Placeholder visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <GraduationCap className="h-64 w-64 text-white" strokeWidth={0.5} />
            </div>
          </>
        )}

        <div className="relative z-20 container mx-auto px-4 md:px-8 max-w-5xl py-16 md:py-24">
          {/* Category Badge */}
          <div className="inline-block bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
            {course.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-8 max-w-4xl">
            {course.title}
          </h1>

          {/* Highlights */}
          <ul className="space-y-3 mb-10 max-w-3xl">
            {course.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-white mt-0.5 shrink-0 fill-white/20" />
                <span className="text-gray-300 text-sm md:text-base leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={brochureHref}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" /> Request Brochure
            </a>
          </div>
        </div>

      </section>

      {/* SECTION 2: Course Info Stats */}
      <section className="bg-white border-b border-[#F4F4F5] py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Clock, value: course.duration, label: "Program Duration", color: "#007BFF" },
              { icon: Monitor, value: course.mode, label: "Learning Mode", color: "#10B981" },
              { icon: Calendar, value: course.weeklyHours, label: "Weekly Commitment", color: "#F59E0B" },
              { icon: Award, value: course.certificate, label: "Certificate", color: "#8B5CF6" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-[#212529] text-base md:text-lg">{stat.value}</p>
                    <p className="text-[10px] text-[#6C757D] font-bold uppercase tracking-widest mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: Program Highlights */}
      {course.programHighlights.length > 0 && (
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
      )}

      {/* SECTION 4: Tabbed Content */}
      {visibleTabs.length > 0 && (
      <section className="bg-white">
        {/* Sticky Tab Bar */}
        <div className="sticky top-[90px] z-30 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex overflow-x-auto scrollbar-hide gap-0 relative">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative shrink-0 px-4 md:px-6 py-4 md:py-5 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "text-black font-extrabold"
                      : "text-[#6C757D] hover:text-[#212529]"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
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
                  <p key={i} className="text-[#4A5568] text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {course.directorQuote.text && (
              <blockquote className="mt-10 border-l-4 border-[#212529] pl-6 py-4 bg-[#F9FAFB] rounded-r-lg">
                <p className="text-[#212529] text-sm md:text-base italic leading-relaxed mb-3">
                  &ldquo;{course.directorQuote.text}&rdquo;
                </p>
                <cite className="text-[#6C757D] text-xs md:text-sm font-bold not-italic uppercase tracking-widest">
                  — {course.directorQuote.author}
                </cite>
              </blockquote>
              )}
            </div>
          )}

          {/* Course Objectives */}
          {activeTab === "objectives" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">Course Objectives</h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">Upon completion of this program, you will be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {course.objectives.map((obj) => (
                  <div key={obj.number} className="border border-[#E5E7EB] rounded-xl p-5 md:p-6 flex gap-4 hover:shadow-sm transition-shadow">
                    <div className="h-8 w-8 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold shrink-0">{obj.number}</div>
                    <div>
                      <h3 className="font-bold text-[#212529] text-sm md:text-base mb-1.5">{obj.title}</h3>
                      <p className="text-[#6C757D] text-xs md:text-sm leading-relaxed">{obj.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Curriculum */}
          {activeTab === "curriculum" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">Course Curriculum</h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                A comprehensive curriculum covering all aspects of {course.category.toLowerCase()}
              </p>
              <div className="space-y-3">
                {course.curriculum.map((mod) => {
                  const isExpanded = expandedModules.includes(mod.number);
                  return (
                    <div key={mod.number} className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(mod.number)}
                        className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-[#F9FAFB] transition-colors"
                      >
                        <div className="h-9 w-9 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold shrink-0">{mod.number}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#212529] text-sm md:text-base truncate">{mod.title}</h3>
                          <p className="text-[#6C757D] text-xs mt-0.5">{mod.duration}{mod.modules > 0 && ` · ${mod.modules} modules`}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-[#6C757D] shrink-0" /> : <ChevronDown className="h-5 w-5 text-[#6C757D] shrink-0" />}
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && mod.subtopics.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden border-t border-[#F4F4F5]"
                          >
                            <div className="px-5 md:px-6 py-4 bg-[#FAFAFA]">
                              <ul className="space-y-4">
                                {groupSubtopics(mod.subtopics).map((group, gi) => (
                                  <li key={gi} className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3 text-sm text-[#212529] font-medium">
                                      <CheckCircle className="h-4 w-4 text-[#212529] fill-black text-white shrink-0 mt-0.5" />
                                      <span>{group.parent}</span>
                                    </div>
                                    {group.children.length > 0 && (
                                      <ul className="pl-7 space-y-3">
                                        {group.children.map((child, ci) => (
                                          <li key={ci} className="flex items-start gap-3 text-sm text-[#4A5568]">
                                            <CheckCircle className="h-4 w-4 text-[#212529] fill-black text-white shrink-0 mt-0.5" />
                                            <span>{child}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Target Audience */}
          {activeTab === "audience" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">Who Is This For?</h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">This program is designed for:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {course.targetAudience.map((item, i) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-6 flex gap-4 hover:shadow-sm transition-shadow">
                    <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                      {getIcon(item.icon, "h-6 w-6")}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#212529] text-sm md:text-base mb-1.5">{item.title}</h3>
                      <p className="text-[#6C757D] text-xs md:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Details */}
          {activeTab === "exam" && (
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">Exam Details</h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">Certifications included in this program</p>
              <div className="space-y-4">
                {course.examDetails.map((exam, i) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-[#212529]" />
                          <h3 className="font-bold text-[#212529] text-base md:text-lg">{exam.name}</h3>
                        </div>
                        <p className="text-[#6C757D] text-sm ml-8">Provider: {exam.provider}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-[#F4F4F5] rounded-sm px-4 py-2">
                          <p className="text-[10px] text-[#6C757D] uppercase tracking-widest font-bold mb-0.5">Duration</p>
                          <p className="text-[#212529] font-bold text-sm">{exam.duration || "N/A"}</p>
                        </div>
                        <div className="bg-[#F4F4F5] rounded-sm px-4 py-2">
                          <p className="text-[10px] text-[#6C757D] uppercase tracking-widest font-bold mb-0.5">Format</p>
                          <p className="text-[#212529] font-bold text-sm">{exam.format || "N/A"}</p>
                        </div>
                        <div className="bg-[#F4F4F5] rounded-sm px-4 py-2">
                          <p className="text-[10px] text-[#6C757D] uppercase tracking-widest font-bold mb-0.5">Pass Score</p>
                          <p className="text-[#212529] font-bold text-sm">{exam.passScore || "N/A"}</p>
                        </div>
                        <div className={`rounded-sm px-4 py-2 ${exam.prepIncluded ? "bg-black text-white" : "bg-[#F4F4F5]"}`}>
                          <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${exam.prepIncluded ? "text-white/70" : "text-[#6C757D]"}`}>Exam Prep</p>
                          <p className={`font-bold text-sm ${exam.prepIncluded ? "text-white" : "text-[#212529]"}`}>
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
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">Tools Covered</h2>
              <p className="text-[#6C757D] mb-10 text-sm md:text-base">
                Industry-standard tools and technologies you&apos;ll master in this program
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {course.toolsCovered.map((tool, i) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-4 md:p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
                    <div className="h-12 w-12 bg-[#F4F4F5] group-hover:bg-black rounded-lg flex items-center justify-center mb-3 transition-colors duration-300">
                      <span className="text-[#212529] group-hover:text-white transition-colors duration-300">
                        {getIcon(tool.icon, "h-6 w-6")}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#212529] text-sm mb-1">{tool.name}</h3>
                    <span className="text-[10px] text-[#6C757D] font-bold uppercase tracking-widest">{tool.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* SECTION 6: Enroll CTA */}
      <section id="contact" className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Speak with an advisor about upcoming {course.title} cohorts, schedules and corporate options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="inline-flex items-center justify-center gap-2 px-10 h-14 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={brochureHref}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" /> Request Brochure
            </a>
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
