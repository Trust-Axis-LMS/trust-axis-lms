"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  Brain,
  ShieldAlert,
  Lock,
  Cloud,
  Scale,
  Link as LinkIcon,
  TrendingUp,
  KeyRound,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  HeartHandshake,
  BookOpen,
  ChevronDown,
  UserCircle
} from "lucide-react";
import { consultancies } from "@/lib/consultancy-data";

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  ShieldCheck: Shield,
  Brain,
  ShieldAlert,
  Lock,
  Cloud,
  Scale,
  Link: LinkIcon,
  TrendingUp,
  KeyRound,
};

// ─── Constants ────────────────────────────────────────────────────────────────
const challengesList = [
  "No clear picture of where the biggest cyber and AI risks actually sit",
  "AI and cloud tools adopted without proper risk assessment or governance",
  "Vendor and third-party risks that are under-monitored or not assessed",
  "Leadership lacking confidence to answer regulators or board questions",
  "Compliance frameworks used as box-ticking rather than real protection",
];

const outcomesList = [
  "A clear, prioritized view of your cyber, AI, and digital risk exposure",
  "Practical recommendations that create real improvements, not just reports",
  "Governance structures that make accountability clear across leadership",
  "Readiness for audits, regulatory reviews, and board-level risk conversations",
  "A structured improvement roadmap that builds maturity and resilience over time",
];

const whoWeSupport = [
  { icon: Building2, label: "Enterprises", sub: "Seeking stronger cybersecurity governance", color: "#007BFF" },
  { icon: Briefcase, label: "Small & Medium Businesses", sub: "Practical security guidance", color: "#8B5CF6" },
  { icon: Globe, label: "Banks & Financial Services", sub: "Financial institutions & FinTech", color: "#10B981" },
  { icon: Brain, label: "Technology Companies", sub: "Digital platforms and tech companies", color: "#F59E0B" },
  { icon: GraduationCap, label: "Educational Institutions", sub: "Building cyber and AI awareness", color: "#0EA5E9" },
  { icon: Shield, label: "Government & Public Sector", sub: "Government and public sector teams", color: "#6366F1" },
  { icon: Scale, label: "Risk & Compliance", sub: "Risk, audit, and privacy professionals", color: "#EC4899" },
  { icon: Users, label: "IT & Security Teams", sub: "IT and cybersecurity teams", color: "#14B8A6" },
  { icon: HeartHandshake, label: "Senior Executives", sub: "Business leaders needing risk clarity", color: "#F97316" },
  { icon: BookOpen, label: "Students & Early Career", sub: "Building future-ready digital skills", color: "#84CC16" },
];

const advisorySteps = [
  { step: "01", title: "Assess", color: "#007BFF", description: "Understand the client's current environment, risk exposure, maturity, and business priorities." },
  { step: "02", title: "Prioritize", color: "#8B5CF6", description: "Identify the highest-impact gaps and focus on what matters most." },
  { step: "03", title: "Design", color: "#10B981", description: "Create practical recommendations, control improvements, governance models, or training plans." },
  { step: "04", title: "Enable", color: "#F59E0B", description: "Support implementation through workshops, documentation, advisory sessions, and capability building." },
  { step: "05", title: "Improve", color: "#EC4899", description: "Help clients mature their cybersecurity, AI, privacy, and technology risk practices over time." },
];

const focusAreas = [
  { icon: Shield, label: "Cybersecurity strategy and governance", color: "#007BFF" },
  { icon: Brain, label: "AI governance and responsible AI adoption", color: "#8B5CF6" },
  { icon: Lock, label: "Privacy and data protection advisory", color: "#10B981" },
  { icon: Cloud, label: "Cloud and technology risk review", color: "#0EA5E9" },
  { icon: GraduationCap, label: "Security awareness and training strategy", color: "#F59E0B" },
  { icon: Scale, label: "Compliance and regulatory readiness", color: "#6366F1" },
  { icon: KeyRound, label: "Identity and access risk review", color: "#14B8A6" },
  { icon: LinkIcon, label: "Third-party and vendor risk advisory", color: "#EC4899" },
  { icon: BarChart3, label: "Cybersecurity maturity assessment", color: "#F97316" },
  { icon: Target, label: "Digital risk roadmap development", color: "#84CC16" },
];

const statsData = [
  { value: 100, suffix: "+", label: "Transformations Led", subtext: "Organizations guided through digital risk programmes", accent: "#007BFF", ringPct: 85 },
  { value: 0, suffix: "", label: "Compliance Breaches", subtext: "Zero client compliance incidents across all engagements", accent: "#10B981", ringPct: 100 },
  { value: 2.5, suffix: "×", label: "Average Advisory ROI", subtext: "Return on advisory investment over a 3-year period", accent: "#8B5CF6", ringPct: 75 },
  { value: 50, suffix: "+", label: "Organizations Supported", subtext: "Clients across industries, sectors, and geographies", accent: "#F59E0B", ringPct: 65 },
];

// ─── SVG Ring Chart ───────────────────────────────────────────────────────────
function RingChart({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
    </svg>
  );
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeGraph, setActiveGraph] = useState<"maturity" | "risk">("maturity");

  // For the modular consulting offerings section
  const [activeConsultancyId, setActiveConsultancyId] = useState(consultancies[0].id);
  const activeConsultancy = consultancies.find((c) => c.id === activeConsultancyId) || consultancies[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">

        {/* ════════════════════════════════════════════════════════════════════
            1. HERO SECTION (Spaceship Manual / Technical Blueprint)
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[85vh] bg-[#f8fafc] font-sans pt-16 pb-12 md:pt-20 md:pb-16 flex items-center border-b border-slate-200">
          
          {/* ─── Blueprint Grid Background ─── */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" 
               style={{ backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="container relative z-10 px-0 md:px-6 max-w-[1400px] mx-auto w-full h-full -mt-6 md:-mt-10 lg:-mt-14">
            
            {/* ─── Technical Frame ─── */}
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm flex flex-col lg:flex-row min-h-[560px]">
              
              {/* ─── LEFT PANEL: Main Display ─── */}
              <div className="flex-1 p-8 md:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
                
                <div className="space-y-8 lg:space-y-10">
                  {/* Tag */}
	                  <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs text-blue-600 uppercase tracking-widest">
	                    <span className="w-2 h-2 bg-blue-600 rounded-none animate-pulse"></span>
	                    <span>{"// SYS_MODULE: TRUST_AXIS_ADVISORY"}</span>
	                  </div>
                  
                  {/* Headline */}
                  <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 tracking-tight leading-[1.05]">
                    Building Digital Trust <br className="hidden xl:block" /> Through Cybersecurity, AI, <br className="hidden xl:block" /> & Practical Learning
                  </h1>

                  {/* Primary Statement */}
                  <div className="pl-6 border-l-2 border-blue-600 max-w-2xl">
                    <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                      Digital trust is becoming one of the most important assets for modern organizations. Customers, employees, regulators, partners, and investors expect businesses to protect data, manage cyber threats, use technology responsibly, and demonstrate strong governance.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 h-12 bg-slate-900 text-white font-mono text-[11px] md:text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors overflow-hidden"
                  >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-blue-400 group-hover:bg-white transition-colors"></span>
                    Start Building Trust <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 px-8 h-12 bg-transparent border border-slate-300 text-slate-700 font-mono text-[11px] md:text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                  >
                    Explore Advisory
                  </Link>
                </div>
              </div>

              {/* ─── RIGHT PANEL: Technical Specs ─── */}
              <div className="w-full lg:w-[400px] xl:w-[450px] bg-slate-50/50 flex flex-col shrink-0">
                
                {/* Quote / Directive */}
                <div className="p-8 md:p-10 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{">"} CORE_DIRECTIVE</span>
                    <Shield className="w-4 h-4 text-slate-300" />
                  </div>
                  <p className="font-serif text-slate-700 text-sm md:text-base italic leading-relaxed">
	                    &ldquo;Digital trust is not built by technology alone. It is built through the right combination of governance, awareness, controls, accountability, and continuous learning.&rdquo;
	                  </p>
                </div>

                {/* Risk Spec */}
                <div className="p-8 md:p-10 border-b border-slate-200 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="font-mono text-[11px] md:text-xs font-bold text-slate-900 uppercase tracking-widest">Emerging Risk</h3>
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed">
                    Organizations are adopting AI, cloud services, and data-driven models at increasing speed. These technologies bring new possibilities, but also new questions: Is the data protected? Are AI tools used responsibly? Are controls strong enough?
                  </p>
                </div>

                {/* Approach Spec */}
                <div className="p-8 md:p-10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-mono text-[11px] md:text-xs font-bold text-slate-900 uppercase tracking-widest">Our Approach</h3>
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed">
                    We exist to help organizations answer these questions with confidence. We bring together cybersecurity, AI governance, privacy, and training to build stronger security awareness and future-ready capability.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            2. STATS SECTION WITH RING CHARTS & DYNAMIC VISUALS
        ════════════════════════════════════════════════════════════════════ */}
        <section ref={statsRef} className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Proven Track Record</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Real Impact. Measurable Results.</h2>
              <p className="mt-3 text-[#6C757D] text-sm md:text-base max-w-xl mx-auto">
                Our advisory engagements deliver outcomes that go beyond recommendations — they create lasting improvements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Number Metrics */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {statsData.map((stat, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center text-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="relative flex items-center justify-center">
                      {statsVisible && <RingChart pct={stat.ringPct} color={stat.accent} size={80} />}
                      {!statsVisible && <div className="w-20 h-20 rounded-full border-[6px] border-[#E5E7EB]" />}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold" style={{ color: stat.accent }}>
                          {stat.suffix === "×" ? `${stat.value}×` : stat.suffix === "0" ? "0" : ""}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#212529]">
                        {statsVisible && stat.value !== 0 && stat.suffix !== "×" ? (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        ) : stat.suffix === "×" ? (
                          "2.5×"
                        ) : stat.value === 0 ? (
                          "Zero"
                        ) : (
                          `${stat.value}${stat.suffix}`
                        )}
                      </h3>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#212529]">{stat.label}</p>
                      <p className="mt-1 text-[11px] text-[#6C757D] leading-snug">{stat.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Visual Dashboard */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex-grow rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-[#F9FAFB] to-white p-6 md:p-8 flex flex-col shadow-sm">
                  {/* Dashboard Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-[#E5E7EB]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#007BFF]">Real-Life Proof of Work</span>
                      <h3 className="text-lg font-bold text-[#212529] mt-0.5">Advisory Impact Dashboard</h3>
                    </div>
                    
                    {/* Tab Switcher */}
                    <div className="flex bg-[#F4F4F5] p-1 rounded-lg border border-[#E5E7EB] self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setActiveGraph("maturity")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeGraph === "maturity"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        Maturity Growth
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveGraph("risk")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeGraph === "risk"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        Risk Reduction
                      </button>
                    </div>
                  </div>

                  {/* Chart Rendering */}
                  <div className="flex-1 flex items-center justify-center min-h-[220px]">
                    {activeGraph === "maturity" ? (
                      <div className="w-full">
                        {/* Maturity Line Chart */}
                        <svg className="w-full h-52 overflow-visible" viewBox="0 0 500 200">
                          <line x1="50" y1="30" x2="450" y2="30" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="70" x2="450" y2="70" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="110" x2="450" y2="110" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="150" x2="450" y2="150" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="170" x2="450" y2="170" stroke="#9CA3AF" strokeWidth="1.5" />
                          
                          <text x="35" y="34" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">5.0 (Optimized)</text>
                          <text x="35" y="74" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">3.0 (Defined)</text>
                          <text x="35" y="114" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">2.0 (Repeatable)</text>
                          <text x="35" y="154" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">1.0 (Initial)</text>
                          
                          <text x="50" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q1</text>
                          <text x="150" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q2</text>
                          <text x="250" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q3</text>
                          <text x="350" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q4</text>
                          <text x="450" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q5 (Active)</text>
                          
                          <path
                            d="M 50 170 L 50 150 L 150 130 L 250 90 L 350 60 L 450 40 L 450 170 Z"
                            fill="url(#maturity-gradient-area)"
                            opacity="0.06"
                          />

                          <path
                            d="M 50 150 L 150 130 L 250 90 L 350 60 L 450 40"
                            fill="none"
                            stroke="url(#maturity-gradient-line)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 500,
                              strokeDashoffset: statsVisible ? 0 : 500,
                              transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                          />
                          
                          <defs>
                            <linearGradient id="maturity-gradient-line" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#007BFF" />
                              <stop offset="50%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                            <linearGradient id="maturity-gradient-area" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#007BFF" />
                            </linearGradient>
                          </defs>

                          <circle cx="50" cy="150" r="4" fill="#007BFF" stroke="#FFFFFF" strokeWidth="1.5" />
                          <circle cx="150" cy="130" r="4" fill="#007BFF" stroke="#FFFFFF" strokeWidth="1.5" />
                          <circle cx="250" cy="90" r="4" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
                          <circle cx="350" cy="60" r="4" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
                          <circle cx="450" cy="40" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" className="animate-pulse" />
                          <circle cx="450" cy="40" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* Risk Bar Chart */}
                        <svg className="w-full h-52 overflow-visible" viewBox="0 0 500 200">
                          <line x1="50" y1="35" x2="450" y2="35" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="80" x2="450" y2="80" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="125" x2="450" y2="125" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4" />
                          <line x1="50" y1="170" x2="450" y2="170" stroke="#9CA3AF" strokeWidth="1.5" />

                          <text x="35" y="39" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">90 Days</text>
                          <text x="35" y="84" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">60 Days</text>
                          <text x="35" y="129" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">30 Days</text>
                          <text x="35" y="174" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">0 Days</text>

                          <text x="115" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Prior to Advisory</text>
                          <text x="250" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">After 6 Months</text>
                          <text x="385" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">After 12 Months</text>

                          <rect
                            x="90"
                            y={statsVisible ? "35" : "170"}
                            width="50"
                            height={statsVisible ? "135" : "0"}
                            rx="5"
                            fill="#EF4444"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <text x="115" y={statsVisible ? "60" : "165"} fill="#FFFFFF" className="text-[10px] font-bold" textAnchor="middle">90 Days</text>

                          <rect
                            x="225"
                            y={statsVisible ? "117.5" : "170"}
                            width="50"
                            height={statsVisible ? "52.5" : "0"}
                            rx="5"
                            fill="#F59E0B"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "0.15s" }}
                          />
                          <text x="250" y={statsVisible ? "140" : "165"} fill="#FFFFFF" className="text-[10px] font-bold" textAnchor="middle">35 Days</text>

                          <rect
                            x="360"
                            y={statsVisible ? "152" : "170"}
                            width="50"
                            height={statsVisible ? "18" : "0"}
                            rx="5"
                            fill="#10B981"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "0.3s" }}
                          />
                          <text x="385" y={statsVisible ? "145" : "165"} fill={statsVisible ? "#FFFFFF" : "transparent"} className="text-[9px] font-bold" textAnchor="middle">12 Days</text>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Summary Text */}
                  <div className="mt-4 bg-white/50 border border-[#E5E7EB] rounded-xl p-4 text-xs text-[#6C757D] leading-relaxed">
                    {activeGraph === "maturity" ? (
                      <p>
                        <strong>Maturity Optimization:</strong> Clients show an average increase of <strong>180%</strong> in security and compliance process repeatability and control maturity within five quarters of structured risk advisory.
                      </p>
                    ) : (
                      <p>
                        <strong>Response Time Drop:</strong> Average days to identify and fully patch high-severity system vulnerabilities dropped from <strong>90 days to just 12 days</strong> (an 86% response speed optimization).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            3. WHAT WE DO — Advisory Focus Areas
        ════════════════════════════════════════════════════════════════════ */}
        <section id="services" className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-6">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF]">Our Advisory Focus</p>
                <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight leading-[1.15]">
                  Cybersecurity, AI & Digital Risk Advisory Services
                </h2>
                <div className="space-y-3 text-[#6C757D] leading-relaxed text-sm md:text-base">
                  <p>
                    In today's connected world, cybersecurity, AI, privacy, and cloud risks are deeply intertwined. A single weak point — a misconfigured cloud service, ungoverned AI tool, or unassessed vendor — can cascade into a serious business disruption.
                  </p>
                  <p className="font-medium text-[#212529]">
                    We help organizations connect these dots: turning fragmented digital risk concerns into a structured, practical, and business-aligned action plan.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 h-12 rounded-sm bg-[#212529] text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    SPEAK TO A DIGITAL RISK ADVISOR <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {focusAreas.map(({ icon: Icon, label, color }, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-white border-l-4 border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ borderLeftColor: color }}
                  >
                    <div
                      className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg mt-0.5"
                      style={{ backgroundColor: `${color}18` }}
                    >
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <span className="text-xs font-semibold text-[#212529] leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* ════════════════════════════════════════════════════════════════════
            4. MODULAR CONSULTING OFFERINGS SECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section id="offerings" className="py-16 md:py-24 border-b border-blue-100 relative overflow-hidden scroll-mt-[90px]" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f7ff 50%, #e8f2ff 100%)' }}>
          {/* Subtle grid texture */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
               style={{ backgroundImage: 'linear-gradient(to right, #bfdbfe 1px, transparent 1px), linear-gradient(to bottom, #bfdbfe 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          {/* Soft blue glow orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Service Capabilities</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a2744] tracking-tight">Our Consulting Offerings</h2>
              <p className="mt-3 text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
                Explore the specific modular offerings we provide across our diverse practice areas to help you build resilience and trust.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-blue-200/60 shadow-lg shadow-blue-100/50">
              {/* Left Sidebar: Category Navigator */}
              <div className="lg:w-[280px] flex-shrink-0 bg-white/80 backdrop-blur-sm border-r border-blue-100">
                <div className="p-4 border-b border-blue-100">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Practice Areas</p>
                </div>
                {consultancies.map((c, idx) => {
                  const CIcon = iconMap[c.icon] ?? Shield;
                  const isActive = activeConsultancyId === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setActiveConsultancyId(c.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 relative group ${
                        isActive ? 'bg-blue-50/80' : 'hover:bg-blue-50/40'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                          style={{ background: c.color }}
                        />
                      )}
                      <div
                        className="flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: isActive ? `${c.color}22` : 'transparent' }}
                      >
                        <CIcon
                          className="h-3.5 w-3.5 transition-colors"
                          style={{ color: isActive ? c.color : '#94a3b8' }}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-semibold leading-snug transition-colors ${
                          isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      >
                        {c.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Panel: Offering Spotlight */}
              <div className="flex-1 bg-white/60 backdrop-blur-sm flex flex-col">
                {/* Category Hero Strip */}
                <div
                  className="px-8 py-7 border-b border-blue-100 flex items-center justify-between"
                  style={{ background: `linear-gradient(90deg, ${activeConsultancy.color}08 0%, transparent 60%)` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${activeConsultancy.color}15`, border: `1px solid ${activeConsultancy.color}30` }}
                    >
                      {(() => {
                        const Icon = iconMap[activeConsultancy.icon] ?? Shield;
                        return <Icon className="h-6 w-6" style={{ color: activeConsultancy.color }} />;
                      })()}
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                        style={{ color: activeConsultancy.color }}
                      >
                        {activeConsultancy.category}
                      </p>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{activeConsultancy.title}</h3>
                    </div>
                  </div>
                  <Link
                    href={`/consultancy/${activeConsultancy.slug}`}
                    className="hidden md:inline-flex items-center gap-2 px-5 h-10 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 flex-shrink-0"
                    style={{ background: activeConsultancy.color, color: '#fff' }}
                  >
                    Explore Full Service <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Offering Rows */}
                <div className="flex-1 divide-y divide-blue-100/60">
                  {activeConsultancy.offerings.slice(0, 3).map((offering, i) => {
                    const OfferingIcon = iconMap[offering.icon] ?? Shield;
                    return (
                      <div
                        key={i}
                        className="group flex items-start gap-5 px-8 py-6 hover:bg-blue-50/40 transition-all duration-200 cursor-default"
                      >
                        {/* Number */}
                        <span
                          className="flex-shrink-0 text-2xl font-black tabular-nums leading-none mt-1 w-7 text-right"
                          style={{ color: `${activeConsultancy.color}40` }}
                        >
                          {i + 1}
                        </span>
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: `${activeConsultancy.color}12`, border: `1px solid ${activeConsultancy.color}25` }}
                        >
                          <OfferingIcon className="h-4 w-4" style={{ color: activeConsultancy.color }} />
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 mb-1 leading-snug group-hover:text-slate-900 transition-colors">
                            {offering.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                            {offering.description}
                          </p>
                        </div>
                        {/* Hover arrow */}
                        <ArrowRight
                          className="flex-shrink-0 h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                          style={{ color: activeConsultancy.color }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Footer strip */}
                <div className="px-8 py-4 border-t border-blue-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">
                    {activeConsultancy.offerings.length} total offerings in this practice
                  </p>
                  <Link
                    href={`/consultancy/${activeConsultancy.slug}`}
                    className="md:hidden inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: activeConsultancy.color }}
                  >
                    Explore Service <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            5. CHALLENGES & OUTCOMES — Light Split
        ════════════════════════════════════════════════════════════════════ */}
        <section id="challenges" className="relative overflow-hidden scroll-mt-[90px]" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f3ff 40%, #eef5ff 100%)' }}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
          {/* Moving symmetric diagonal lines — very subtle */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-moving-lines" />
          {/* Soft directional glow blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-blue-200/25 blur-[140px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24">
            {/* Header */}
            <div className="text-center mb-14 md:mb-20">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-8 bg-[#007BFF]/50" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#007BFF]">From Risk to Resilience</p>
                <div className="h-px w-8 bg-[#007BFF]/50" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1a2744] tracking-tight">Challenges <span className="text-slate-300">&</span> Outcomes</h2>
              <p className="mt-4 text-slate-500 text-sm md:text-base max-w-lg mx-auto">
                What we typically see — and what we help change.
              </p>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-100/40">

              {/* LEFT — Challenges (emphatic but not dominant) */}
              <div className="relative p-8 md:p-10 bg-white">
                {/* Subtle red left-edge glow */}
                <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-red-300/0 via-red-400/50 to-red-300/0" />

                {/* Column header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-200/70 flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-100/60">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-500 mb-0.5">Before Advisory</p>
                    <h3 className="text-lg font-bold text-slate-800">Common Challenges</h3>
                  </div>
                  <span className="flex-shrink-0 text-[10px] font-black tracking-[0.15em] text-red-400 border border-red-200 rounded-full px-2.5 py-1 select-none bg-red-50">01</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-red-100 mb-6" />

                {/* Items */}
                <ul className="space-y-0 divide-y divide-slate-100">
                  {challengesList.map((item, i) => (
                    <li key={i} className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-md bg-red-50 border border-red-200/60 flex items-center justify-center">
                        <span className="text-red-500 text-[10px] font-black">✕</span>
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>


              {/* CENTER DIVIDER — Arrow */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent" />
                  <div className="h-9 w-9 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200/60" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent" />
                </div>
              </div>

              {/* RIGHT — Outcomes (prominent, clean white with emerald accents) */}
              <div
                className="relative p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-emerald-100 bg-white"
              >
                {/* Subtle emerald left-edge glow */}
                <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-emerald-300/0 via-emerald-400/60 to-emerald-300/0" />

                {/* Column header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200/60" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-0.5">After Advisory</p>
                    <h3 className="text-lg font-bold text-slate-800">What You Gain</h3>
                  </div>
                  <span className="flex-shrink-0 text-[10px] font-black tracking-[0.15em] text-emerald-600 border border-emerald-200 rounded-full px-2.5 py-1 select-none bg-emerald-50">02</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-emerald-100 mb-6" />

                {/* Items */}
                <ul className="space-y-0 divide-y divide-emerald-50">
                  {outcomesList.map((item, i) => (
                    <li key={i} className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-md bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>


              </div>
            </div>
          </div>
        </section>



        {/* ════════════════════════════════════════════════════════════════════
            6. CORE CONSULTING — Practice Areas Grid
        ════════════════════════════════════════════════════════════════════ */}
        <section id="consultancy" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Our Practice Areas</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Core Consulting Services</h2>
              <p className="mt-3 text-[#6C757D] text-sm md:text-base max-w-2xl mx-auto">
                Explore our specialist advisory areas to find the right fit for your organization's cybersecurity, AI, and digital risk priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {consultancies.map((c) => {
                const Icon = iconMap[c.icon] ?? Shield;
                return (
                  <Link
                    key={c.slug}
                    href={`/consultancy/${c.slug}`}
                    className="group relative flex flex-col bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 md:p-7 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                      style={{ background: c.color }}
                    />

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Icon className="h-6 w-6" style={{ color: c.color }} />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ color: c.color, backgroundColor: `${c.color}15` }}
                      >
                        {c.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#212529] leading-tight mb-3 group-hover:text-[#007BFF] transition-colors">
                      {c.heading || c.title}
                    </h3>
                    <p className="text-sm text-[#6C757D] leading-relaxed flex-1">{c.excerpt}</p>

                    <div
                      className="mt-5 inline-flex items-center justify-center gap-2 px-5 h-10 rounded-full text-xs font-bold uppercase tracking-widest transition-all group-hover:opacity-90 self-start"
                      style={{ background: c.color, color: '#fff' }}
                    >
                      Explore Services
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            7. ADVISORY APPROACH — 5-Step Stepper
        ════════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">How We Work</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Practical Advisory for Modern Digital Risk</h2>
              <div className="mt-4 text-[#6C757D] text-sm md:text-base max-w-2xl mx-auto">
                <p>
                  Our advisory approach brings clarity to complex digital risk. We help clients identify the most critical gaps, prioritize what matters most, and define practical steps that create real improvements — not just reports.
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-start gap-0 relative">
              <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent z-0" />
              {advisorySteps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center z-10 px-4">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-white font-bold text-xl mb-5 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#212529] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#6C757D] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="md:hidden space-y-4">
              {advisorySteps.map((step, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-white">
                  <div
                    className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-base shadow-md"
                    style={{ background: step.color }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#212529] mb-1">{step.title}</h3>
                    <p className="text-sm text-[#6C757D] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-14 text-center">
              <p className="text-sm text-[#6C757D] italic max-w-2xl mx-auto font-medium">
                We provide advisory that is structured enough for leadership, practical enough for teams, and relevant enough for real-world execution.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-sm border border-[#212529] text-[#212529] font-bold text-xs uppercase tracking-widest hover:bg-[#212529] hover:text-white transition-all">
                REQUEST A DIGITAL RISK REVIEW <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            8. WHO WE SUPPORT
        ════════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Our Clients</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">
                Built for Organizations, Professionals, and Decision-Makers Across Industries
              </h2>
              <p className="mt-4 text-[#6C757D] text-sm md:text-base max-w-xl mx-auto">
                From enterprises and financial institutions to government bodies, tech companies, and early-career professionals — our advisory and training services adapt to your maturity level and priorities.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {whoWeSupport.map(({ icon: Icon, label, sub, color }, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center gap-3 p-5 rounded-xl border bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  style={{ borderColor: `${color}30` }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-5 w-5 transition-colors" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#212529]">{label}</p>
                    <p className="text-[11px] text-[#6C757D] mt-0.5 leading-tight">{sub}</p>
                  </div>
                  <div
                    className="h-0.5 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[#212529] font-semibold italic max-w-2xl mx-auto mb-6">
                Whether the need is awareness, advisory, capability building, or transformation, our focus remains the same: practical outcomes, clearer decisions, and stronger digital confidence.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 h-12 rounded-sm bg-[#007BFF] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#0056b3] transition-colors">
                FIND THE RIGHT SOLUTION FOR YOUR ORGANIZATION <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            9. DIGITAL TRUST CTA STRIP
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-blue-200/60 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #dbeafe 0%, #eff6ff 30%, #f8faff 60%, #edf4ff 100%)' }}>
          {/* Layered blue gradient orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-blue-300/25 blur-[110px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px]" />
            <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-indigo-300/15 blur-[90px]" />
          </div>
          {/* Diagonal shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent" />

          <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-6">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF]">Why It Matters</p>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a2744] tracking-tight leading-[1.15]">
                  Cybersecurity and Privacy Are Business Trust Enablers
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Trust is now a business differentiator. Customers, regulators, partners, and leadership all expect responsible handling of data, secure digital systems, and clear governance — before risks become disruptions.
                </p>
                <div className="pt-2">
                  <p className="text-slate-700 font-semibold italic border-l-2 border-[#007BFF] pl-4">
                    Cybersecurity protects the business. Privacy protects trust. Together, they create the foundation for responsible digital growth.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 h-13 py-4 rounded-full bg-[#007BFF] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#0062cc] transition-all shadow-lg shadow-blue-300/40 hover:shadow-blue-400/50"
                >
                  STRENGTHEN YOUR CYBERSECURITY AND PRIVACY PROGRAM <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Greater customer and stakeholder confidence",
                  "Reduced cyber and data protection risk",
                  "Stronger readiness for audits and regulatory reviews",
                  "Better protection of sensitive business and personal data",
                  "Improved employee awareness and accountability",
                  "Safer use of cloud, AI, and digital platforms",
                  "Stronger third-party and vendor risk management",
                  "More resilient business operations",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/70 border border-blue-200/60 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200">
                    <CheckCircle className="h-4 w-4 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            10. CONTACT FORM
        ════════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="relative py-16 md:py-24 scroll-mt-[90px] overflow-hidden">
          {/* Darkened gradient background */}
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(135deg, #0A0A0F 0%, #0d1b2a 40%, #0f2044 100%)' }}
          />
          {/* Gradient orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-700/15 blur-[100px]" />
            <div className="absolute top-1/2 right-0 w-[200px] h-[200px] rounded-full bg-blue-500/10 blur-[80px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-blue-400">Get In Touch</p>
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Ready to Start the Conversation?</h2>
              <p className="text-white/60 text-sm md:text-lg">Tell us about your organization and how we can help. We&apos;ll get back to you promptly.</p>
            </div>

            <Card className="rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-md p-6 md:p-12">
              <form className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="fullName" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-1 ml-1">Full Name</Label>
                    <Input id="fullName" placeholder="Your full name" className="h-12 md:h-14 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-md shadow-sm focus-visible:ring-blue-400" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-1 ml-1">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="h-12 md:h-14 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-md shadow-sm focus-visible:ring-blue-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="phone" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-1 ml-1">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12 md:h-14 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-md shadow-sm focus-visible:ring-blue-400" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="organization" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-1 ml-1">Organization</Label>
                    <Input id="organization" placeholder="Your organization name" className="h-12 md:h-14 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-md shadow-sm focus-visible:ring-blue-400" />
                  </div>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/60 mb-1 ml-1">How Can We Help?</Label>
                  <Textarea id="message" placeholder="Tell us about your cybersecurity, AI, or digital risk challenges..." className="min-h-[140px] md:min-h-[180px] bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-md shadow-sm resize-y focus-visible:ring-blue-400 p-4 text-sm" />
                </div>
                <Button className="w-full h-12 md:h-14 text-xs md:text-sm uppercase tracking-widest font-bold rounded-md bg-blue-600 text-white hover:bg-blue-700 mt-2 shadow-md transition-all">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
