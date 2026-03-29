"use client";

import React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, ArrowRight, Clock, Monitor, Calendar, Award, ChevronDown, ChevronUp,
  ShieldCheck, Users, FlaskConical, UserCheck, Briefcase, FolderKanban, Brain,
  Database, Activity, BarChart2, GitBranch, Cloud, Server, Code, LineChart, Rocket,
  Megaphone, GraduationCap, Cpu, Terminal, Zap, Search, Network, Bell, Lock, Wifi,
  Flame, Cog, Box, Table, PieChart, BookOpen, FileText, Layers, CheckSquare,
  LayoutDashboard, Mail, Globe, Link as LinkIcon, Send, Pen, Wind, ScanSearch,
  FolderSearch, FileCode, X, Download, Phone, Twitter, Linkedin, UserCircle, ChevronLeft, ChevronRight,
} from "lucide-react";

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

// ─── Sample Instructors ───────────────────────────────────────────────────────
const instructors = [
  { name: "Dr. James Patterson", title: "Information Security Expert", exp: "20+ Years", certs: ["CISSP", "CEH", "CISM"] },
  { name: "Emily Rodriguez", title: "Cybersecurity Specialist", exp: "15+ Years", certs: ["CompTIA Security+", "OSCP"] },
  { name: "David Kumar", title: "Network Security Architect", exp: "18+ Years", certs: ["CCNA Security", "CCIE"] },
  { name: "Lisa Thompson", title: "Penetration Testing Lead", exp: "12+ Years", certs: ["GPEN", "CEH Master"] },
  { name: "Michael Chen", title: "Cloud Security Specialist", exp: "10+ Years", certs: ["AWS Security", "CCSP"] },
];

import type { Course } from "@/lib/courses-data";

interface CourseDetailsClientProps {
  course: Course;
}

// ─── Brochure Modal ───────────────────────────────────────────────────────────
function BrochureModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#212529] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Download Brochure</h3>
            <p className="text-gray-400 text-xs mt-0.5">Get the full program details sent to you</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              className="w-full h-11 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="john@company.com"
              required
              className="w-full h-11 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              className="w-full h-11 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-2 rounded-md bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/90 transition-colors mt-2"
          >
            <Download className="h-4 w-4" /> Send Brochure
          </button>
          <p className="text-center text-[11px] text-[#6C757D]">
            We&apos;ll email the brochure within a few minutes.
          </p>
        </form>
      </div>
    </div>
  );
}

export function CourseDetailsClient({ course }: CourseDetailsClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [instructorIndex, setInstructorIndex] = useState(0);

  const toggleModule = (num: number) => {
    setExpandedModules((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const showCarousel = instructors.length > 2;
  const maxIndex = instructors.length - 2; // Subtracting 2 because we show 2 at a time

  const nextInstructor = () => {
    setInstructorIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevInstructor = () => {
    setInstructorIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Brochure Modal */}
      {showBrochureModal && <BrochureModal onClose={() => setShowBrochureModal(false)} />}

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
            <button
              onClick={() => setShowBrochureModal(true)}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" /> Download Brochure
            </button>
          </div>
        </div>

        {/* Bottom label */}
        <div className="relative z-20 bg-black/40 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl py-3">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Sample course banner image — will be replaced</p>
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

      {/* SECTION 4: Tabbed Content */}
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
                  <p key={i} className="text-[#4A5568] text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
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
                      {isExpanded && mod.subtopics.length > 0 && (
                        <div className="border-t border-[#F4F4F5] px-5 md:px-6 py-4 bg-[#FAFAFA]">
                          <ul className="space-y-3">
                            {mod.subtopics.map((sub, si) => (
                              <li key={si} className="flex items-center gap-3 text-sm text-[#4A5568]">
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
                          <p className="text-[10px] text-[#6C757D] uppercase tracking-widest font-bold mb-0.5">Pass Score</p>
                          <p className="text-[#212529] font-bold text-sm">{exam.passScore}</p>
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

      {/* SECTION 5: Instructor Carousel */}
      <section className="bg-[#F9FAFB] border-t border-[#F4F4F5] py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
              Your Instructors
            </h2>
            <p className="text-[#6C757D] text-sm md:text-base">
              Learn from certified practitioners with real-world expertise
            </p>
          </div>

          <div className="relative">
            {/* Navigation Controls — Only show if more than 2 instructors */}
            {showCarousel && (
              <>
                <button
                  onClick={prevInstructor}
                  className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 text-[#212529] transition-all"
                  aria-label="Previous instructors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextInstructor}
                  className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 text-[#212529] transition-all"
                  aria-label="Next instructors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="mx-0 md:mx-4 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${instructorIndex * (100 / (showCarousel ? 2 : instructors.length))}%)` }}
              >
                {instructors.map((instructor, i) => (
                  <div key={i} className="w-full md:w-1/2 flex-shrink-0 px-2 md:px-4">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col h-full">
                      <div className="aspect-[16/9] bg-gradient-to-b from-[#5c5c5c] to-[#2a2a2a] flex items-center justify-center">
                        <UserCircle className="w-16 h-16 text-white/10" strokeWidth={0.5} />
                      </div>
                      <div className="p-5 text-center flex flex-col items-center flex-1">
                        <h3 className="font-bold text-[#212529] text-base mb-1">{instructor.name}</h3>
                        <p className="text-xs text-[#6C757D] mb-2">{instructor.title}</p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#4A5568] mb-3">
                          <Briefcase className="h-3 w-3 text-[#6C757D]" /> {instructor.exp}
                        </div>
                        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                          {instructor.certs.map((cert, j) => (
                            <span key={j} className="inline-flex items-center gap-1 rounded-sm bg-[#F4F4F5] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#212529]">
                              <Award className="h-2 w-2" /> {cert}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-center gap-4 text-[#8C8C8C] mt-auto">
                          <Linkedin className="h-4 w-4 hover:text-[#0a66c2] cursor-pointer transition-colors" />
                          <Twitter className="h-4 w-4 hover:text-black cursor-pointer transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots — Only show if carousel is active */}
          {showCarousel && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: instructors.length - 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setInstructorIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === instructorIndex ? "w-6 bg-[#212529]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                  aria-label={`View set ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: Enroll CTA */}
      <section id="contact" className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join {course.students}+ students already enrolled in {course.title}. The next cohort starts soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/courses/${course.slug}/checkout`}
              className="inline-flex items-center justify-center gap-2 px-10 h-14 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setShowBrochureModal(true)}
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" /> Download Brochure
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
