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
  UserCircle,
  ShieldCheck,
  Cpu,
  Landmark,
  Leaf
} from "lucide-react";


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
  Globe,
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
        <section className="relative w-full min-h-screen bg-slate-950 font-sans -mt-[68px] pt-[68px] pb-16 flex items-center border-b border-slate-800">
          
          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              src="/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Darken overlay to make text box pop and ensure proper contrast */}
            <div className="absolute inset-0 bg-slate-950/40"></div>
          </div>

          <div className="container relative z-10 px-0 md:px-6 max-w-[1400px] mx-auto w-full h-full pt-6 md:pt-8">
            
            {/* ─── Technical Frame ─── */}
            <div className="relative bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col lg:flex-row min-h-[560px]">
              
              {/* ─── LEFT PANEL: Main Display ─── */}
              <div className="flex-1 p-8 md:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                
                <div className="space-y-8 lg:space-y-10">

                  {/* Headline */}
                  <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tight leading-[1.05]">
                    Trusted Advisors <br className="hidden xl:block" /> for a Complex <br className="hidden xl:block" /> Digital World
                  </h1>

                  {/* Primary Statement */}
                  <div className="pl-6 border-l-2 border-blue-500 max-w-2xl">
                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                      Digital trust is becoming one of the most important assets for modern organizations. Customers, employees, regulators, partners, and investors expect businesses to protect data, manage cyber threats, use technology responsibly, and demonstrate strong governance.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-white/10">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 h-12 bg-white text-slate-950 font-mono text-[11px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors overflow-hidden"
                  >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-blue-400 group-hover:bg-white transition-colors"></span>
                    Start Building Trust <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 px-8 h-12 bg-transparent border border-white/20 text-white font-mono text-[11px] md:text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Explore Advisory
                  </Link>
                </div>
              </div>

              {/* ─── RIGHT PANEL: Technical Specs ─── */}
              <div className="w-full lg:w-[400px] xl:w-[450px] bg-black/20 flex flex-col shrink-0">
                
                {/* Quote / Directive */}
                <div className="p-8 md:p-10 border-b border-white/10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{">"} CORE_DIRECTIVE</span>
                    <Shield className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="font-serif text-slate-300 text-sm md:text-base italic leading-relaxed">
	                    &ldquo;Digital trust is not built by technology alone. It is built through the right combination of governance, awareness, controls, accountability, and continuous learning.&rdquo;
	                  </p>
                </div>

                {/* Risk Spec */}
                <div className="p-8 md:p-10 border-b border-white/10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="font-mono text-[11px] md:text-xs font-bold text-white uppercase tracking-widest">Emerging Risk</h3>
                  </div>
                  <p className="text-slate-300 text-[13px] leading-relaxed">
                    Organizations are adopting AI, cloud services, and data-driven models at increasing speed. These technologies bring new possibilities, but also new questions: Is the data protected? Are AI tools used responsibly? Are controls strong enough?
                  </p>
                </div>

                {/* Approach Spec */}
                <div className="p-8 md:p-10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <h3 className="font-mono text-[11px] md:text-xs font-bold text-white uppercase tracking-widest">Our Approach</h3>
                  </div>
                  <p className="text-slate-300 text-[13px] leading-relaxed">
                    We exist to help organizations answer these questions with confidence. We bring together cybersecurity, AI governance, privacy, and training to build stronger security awareness and future-ready capability.
                  </p>
                </div>

              </div>

              {/* Scroll Down — sits at bottom-centre of the frame, half overhanging */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
                <button
                  onClick={() => statsRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="animate-glow-border px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md text-[10px] uppercase tracking-widest font-mono text-white/70 hover:text-white transition-all cursor-pointer"
                  aria-label="Scroll down to stats"
                >
                  <span>Scroll Down</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes border-glow {
                    0%, 100% {
                      box-shadow: 0 0 4px rgba(255, 255, 255, 0.05);
                      border-color: rgba(255, 255, 255, 0.15);
                    }
                    50% {
                      box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
                      border-color: rgba(59, 130, 246, 0.4);
                    }
                  }
                  .animate-glow-border {
                    animation: border-glow 4s infinite ease-in-out;
                  }
                `}} />
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
                          
                          <text x="35" y="34" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">5.0 (Optimized)</tspan>
                            <tspan className="inline sm:hidden">5.0</tspan>
                          </text>
                          <text x="35" y="74" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">3.0 (Defined)</tspan>
                            <tspan className="inline sm:hidden">3.0</tspan>
                          </text>
                          <text x="35" y="114" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">2.0 (Repeatable)</tspan>
                            <tspan className="inline sm:hidden">2.0</tspan>
                          </text>
                          <text x="35" y="154" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">1.0 (Initial)</tspan>
                            <tspan className="inline sm:hidden">1.0</tspan>
                          </text>
                          
                          <text x="50" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q1</text>
                          <text x="150" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q2</text>
                          <text x="250" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q3</text>
                          <text x="350" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">Q4</text>
                          <text x="450" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">
                            <tspan className="hidden sm:inline">Q5 (Active)</tspan>
                            <tspan className="inline sm:hidden">Q5</tspan>
                          </text>
                          
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

                          <text x="35" y="39" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">90 Days</tspan>
                            <tspan className="inline sm:hidden">90d</tspan>
                          </text>
                          <text x="35" y="84" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">60 Days</tspan>
                            <tspan className="inline sm:hidden">60d</tspan>
                          </text>
                          <text x="35" y="129" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">30 Days</tspan>
                            <tspan className="inline sm:hidden">30d</tspan>
                          </text>
                          <text x="35" y="174" fill="#6C757D" className="text-[9px] font-bold" textAnchor="end">
                            <tspan className="hidden sm:inline">0 Days</tspan>
                            <tspan className="inline sm:hidden">0d</tspan>
                          </text>

                          <text x="115" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">
                            <tspan className="hidden sm:inline">Prior to Advisory</tspan>
                            <tspan className="inline sm:hidden">Before</tspan>
                          </text>
                          <text x="250" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">
                            <tspan className="hidden sm:inline">After 6 Months</tspan>
                            <tspan className="inline sm:hidden">6 Months</tspan>
                          </text>
                          <text x="385" y="190" fill="#6C757D" className="text-[9px] font-bold uppercase tracking-wider" textAnchor="middle">
                            <tspan className="hidden sm:inline">After 12 Months</tspan>
                            <tspan className="inline sm:hidden">12 Months</tspan>
                          </text>

                          <rect
                            x="90"
                            y={statsVisible ? "35" : "170"}
                            width="50"
                            height={statsVisible ? "135" : "0"}
                            rx="5"
                            fill="#EF4444"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <text x="115" y={statsVisible ? "60" : "165"} fill="#FFFFFF" className="text-[10px] font-bold" textAnchor="middle">
                            <tspan className="hidden sm:inline">90 Days</tspan>
                            <tspan className="inline sm:hidden">90d</tspan>
                          </text>

                          <rect
                            x="225"
                            y={statsVisible ? "117.5" : "170"}
                            width="50"
                            height={statsVisible ? "52.5" : "0"}
                            rx="5"
                            fill="#F59E0B"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "0.15s" }}
                          />
                          <text x="250" y={statsVisible ? "140" : "165"} fill="#FFFFFF" className="text-[10px] font-bold" textAnchor="middle">
                            <tspan className="hidden sm:inline">35 Days</tspan>
                            <tspan className="inline sm:hidden">35d</tspan>
                          </text>

                          <rect
                            x="360"
                            y={statsVisible ? "152" : "170"}
                            width="50"
                            height={statsVisible ? "18" : "0"}
                            rx="5"
                            fill="#10B981"
                            style={{ transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: "0.3s" }}
                          />
                          <text x="385" y={statsVisible ? "145" : "165"} fill={statsVisible ? "#FFFFFF" : "transparent"} className="text-[9px] font-bold" textAnchor="middle">
                            <tspan className="hidden sm:inline">12 Days</tspan>
                            <tspan className="inline sm:hidden">12d</tspan>
                          </text>
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
            advisory / consulting sections removed per request
        ════════════════════════════════════════════════════════════════════ */}
        <div id="services" className="scroll-mt-[90px]" />


        {/* ════════════════════════════════════════════════════════════════════
            5. CORE CONSULTING — Practice Areas Grid (4 Light Gradient Tiles)
        ════════════════════════════════════════════════════════════════════ */}
        <section id="consultancy" className="bg-white py-14 md:py-20 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#007BFF] mb-3">Our Practice Areas</p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Core Consulting Services</h2>
              <p className="mt-3 text-[#6C757D] text-sm md:text-base max-w-2xl mx-auto">
                Explore our specialist advisory areas to find the right fit for your organisation&apos;s needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Tile 1: Cybersecurity & Data Privacy */}
              <Link
                href="/consultancy/cybersecurity-advisory"
                className="group flex flex-col p-4 bg-white border border-slate-200 hover:border-blue-300 rounded-[2rem] hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 md:h-56 rounded-[1.5rem] overflow-hidden mb-6">
                  <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="Cybersecurity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-4 left-4 h-12 w-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="px-2 md:px-4 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                    Cybersecurity & Data Privacy
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-8 flex-1">
                    Cyber governance, risk management, controls assessment, AI risk, privacy, and GRC advisory.
                  </p>
                  
                  <div className="mt-auto w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px] font-bold tracking-widest uppercase">Explore Practice</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Tile 2: Digital Transformation */}
              <Link
                href="/consultancy/cloud-technology-risk"
                className="group flex flex-col p-4 bg-white border border-slate-200 hover:border-sky-300 rounded-[2rem] hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 md:h-56 rounded-[1.5rem] overflow-hidden mb-6">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Digital Transformation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0ea5e9]/40 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-4 left-4 h-12 w-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Cpu className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="px-2 md:px-4 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-sky-600 transition-colors duration-300">
                    Digital Transformation
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-8 flex-1">
                    Cloud migration, platform modernisation, technology risk, third-party risk management, and digital strategy advisory.
                  </p>
                  
                  <div className="mt-auto w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px] font-bold tracking-widest uppercase">Explore Practice</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Tile 3: Banking & Credit Card Services */}
              <Link
                href="/consultancy/fintech-strategic-services"
                className="group flex flex-col p-4 bg-white border border-slate-200 hover:border-orange-300 rounded-[2rem] hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 md:h-56 rounded-[1.5rem] overflow-hidden mb-6">
                  <img src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80" alt="Banking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f97316]/40 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-4 left-4 h-12 w-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Landmark className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="px-2 md:px-4 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-orange-600 transition-colors duration-300">
                    Banking & Credit Card Services
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-8 flex-1">
                    Strategic advisory across payments, open banking, digital transformation, lending, compliance, and credit card services.
                  </p>
                  
                  <div className="mt-auto w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px] font-bold tracking-widest uppercase">Explore Practice</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              {/* Tile 4: ESG Advisory */}
              <Link
                href="/consultancy/esg-consulting-advisory"
                className="group flex flex-col p-4 bg-white border border-slate-200 hover:border-emerald-300 rounded-[2rem] hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 md:h-56 rounded-[1.5rem] overflow-hidden mb-6">
                  <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80" alt="ESG" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10b981]/40 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-4 left-4 h-12 w-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Leaf className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="px-2 md:px-4 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                    ESG Advisory
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-8 flex-1">
                    Environmental, social, and governance strategies, measurable actions, and credible reporting frameworks for responsible growth.
                  </p>
                  
                  <div className="mt-auto w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px] font-bold tracking-widest uppercase">Explore Practice</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

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
