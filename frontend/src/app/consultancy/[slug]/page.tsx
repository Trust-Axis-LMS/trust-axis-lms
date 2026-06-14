import { use } from "react";
import { consultancies } from "@/lib/consultancy-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  ArrowRight,

  ArrowLeft,
  Shield,
  Brain,
  ShieldAlert,
  Lock,
  Cloud,
  Scale,
  Link as LinkIcon,
  TrendingUp,
  KeyRound,
  BarChart3,
  Search,
  Settings,
  FileText,
  Users,
  Presentation,
  Map,
  Siren,
  ClipboardCheck,
  Settings2,
  AlertTriangle,
  FileCheck,
  Database,
  Cpu,
  BarChart2,
  Layout,
  ClipboardList,
  GraduationCap,
  UserCheck,
  GitBranch,
  AlertOctagon,
  Lightbulb,
  Archive,
  Tag,
  Link2,
  Activity,
  RefreshCw,
  Server,
  Monitor,
  Globe,
  CreditCard,
  Scale as ScaleIcon,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

// ─── Icon registry ────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ElementType> = {
  ShieldCheck: Shield, Brain, ShieldAlert, Lock, Cloud, Scale, Link: LinkIcon,
  TrendingUp, KeyRound, BarChart3, Search, Settings, FileText, Users, Presentation,
  Map, Siren, ClipboardCheck, Settings2, AlertTriangle, FileCheck, Database,
  Cpu, BarChart2, Layout, ClipboardList, GraduationCap, UserCheck, GitBranch,
  AlertOctagon, Lightbulb, Archive, Tag, Link2, Activity, RefreshCw, Server,
  Monitor, Globe, CreditCard, ScaleIcon, HelpCircle, MessageSquare,
};

const getIcon = (name: string): React.ElementType => ICONS[name] ?? Shield;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return consultancies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const c = consultancies.find((c) => c.slug === slug);
  if (!c) return { title: "Not Found | Trust Axis" };
  return {
    title: `${c.title} | Trust Axis Consultancy`,
    description: c.excerpt,
  };
}

export default function ConsultancyDetailsPage({ params }: PageProps) {
  const { slug } = use(params);
  return <ConsultancyDetailsView slug={slug} />;
}

function ConsultancyDetailsView({ slug }: { slug: string }) {
  const c = consultancies.find((item) => item.slug === slug);
  if (!c) notFound();

  const CategoryIcon = ICONS[c.icon] ?? Shield;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0A0A0F] py-20 md:py-28 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
            style={{ background: c.color }}
          />
          <div className="absolute bottom-[-20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="mb-6 md:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Advisory Services
            </Link>
          </div>

          {c.slug === "esg-consulting-advisory" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
                  style={{ backgroundColor: `${c.color}20`, color: c.color }}
                >
                  {c.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
                  {c.title}
                </h1>
                <p className="max-w-[650px] text-base md:text-lg lg:text-xl text-white/60 leading-relaxed mb-8">
                  {c.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 h-12 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: c.color }}
                  >
                    Schedule an ESG Advisory Session
                  </Link>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center px-6 h-12 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/10 transition-all"
                  >
                    View ESG Services
                  </a>
                </div>
              </div>

              {/* Right Column - ESG Readiness Snapshot Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-[30px] p-8 border border-[#E2E8F0] shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
                  <h3 className="text-xl font-bold text-[#071226] mb-2">ESG Readiness Snapshot</h3>
                  <p className="text-sm text-[#536174] mb-6 leading-relaxed">
                    Build visibility across sustainability strategy, governance, risk, reporting, and stakeholder expectations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 flex flex-col">
                      <span className="text-[#157F3B] text-[34px] font-bold mb-2 leading-none">E</span>
                      <span className="text-sm font-semibold text-[#334155] leading-snug">
                        Environment & climate
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 flex flex-col">
                      <span className="text-[#157F3B] text-[34px] font-bold mb-2 leading-none">S</span>
                      <span className="text-sm font-semibold text-[#334155] leading-snug">
                        People & communities
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 flex flex-col">
                      <span className="text-[#157F3B] text-[34px] font-bold mb-2 leading-none">G</span>
                      <span className="text-sm font-semibold text-[#334155] leading-snug">
                        Governance & ethics
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 flex flex-col">
                      <span className="text-[#157F3B] text-[34px] font-bold mb-2 leading-none">R</span>
                      <span className="text-sm font-semibold text-[#334155] leading-snug">
                        Reporting readiness
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              {/* Icon */}
              <div
                className="flex-shrink-0 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${c.color}20`, border: `1px solid ${c.color}30` }}
              >
                <CategoryIcon className="h-10 w-10 md:h-12 md:w-12" style={{ color: c.color }} />
              </div>

              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: `${c.color}20`, color: c.color }}
                >
                  {c.category}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
                  {c.heading || c.title}
                </h1>
                <p className="max-w-[700px] text-base md:text-lg lg:text-xl text-white/60 leading-relaxed">
                  {c.excerpt}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY IT MATTERS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20 border-b border-[#F4F4F5]">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            <div className="flex-shrink-0">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${c.color}15` }}
              >
                <HelpCircle className="h-7 w-7" style={{ color: c.color }} />
              </div>
            </div>
            <div className="flex-1">
              <p
                className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ color: c.color }}
              >
                Why It Matters
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-5">
                Understanding the Stakes
              </h2>
              <div className="space-y-4 text-[#4A5568] leading-relaxed text-base md:text-lg">
                {c.whyItMatters.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SPECIFIC OFFERINGS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F9FAFB] py-14 md:py-20 border-b border-[#F4F4F5]">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-10 md:mb-14">
            <p
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: c.color }}
            >
              What We Deliver
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">
              What This Includes
            </h2>
            <p className="mt-3 text-[#6C757D] text-sm md:text-base max-w-xl mx-auto">
              Structured advisory capabilities designed to address your most important {c.category.toLowerCase()} risks and priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {c.offerings.map((offering, i) => {
              const OfferingIcon = getIcon(offering.icon);
              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-transparent hover:shadow-lg transition-all duration-200"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${c.color}12` }}
                  >
                    <OfferingIcon className="h-5 w-5" style={{ color: c.color }} />
                  </div>
                  <h3 className="text-base font-bold text-[#212529] mb-2 leading-snug">{offering.title}</h3>
                  <p className="text-sm text-[#6C757D] leading-relaxed">{offering.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          KEY QUESTIONS (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {c.keyQuestions && c.keyQuestions.length > 0 && (
        <section className="bg-white py-14 md:py-20 border-b border-[#F4F4F5]">
          <div className="container px-4 md:px-8 mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                <p
                  className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: c.color }}
                >
                  Key Questions
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight mb-5">
                  Questions We Help You Answer
                </h2>
                <p className="text-[#6C757D] leading-relaxed text-sm md:text-base">
                  These are the critical questions that many organizations struggle to answer confidently. Our advisory work is designed to help you address each one with clarity and evidence.
                </p>
              </div>
              <div className="space-y-3">
                {c.keyQuestions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: c.color }} />
                    <span className="text-sm text-[#4A5568] font-medium leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          BUSINESS OUTCOMES — Premium Dark Design
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ background: '#06060A' }}
      >
        {/* Geometric decorative elements — category-colored */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large quarter-circle top-right */}
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: c.color }}
          />
          {/* Small accent dot bottom-left */}
          <div
            className="absolute bottom-12 left-12 w-32 h-32 rounded-full opacity-[0.12]"
            style={{ background: c.color }}
          />
          {/* Thin horizontal rule accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-30"
            style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }}
          />
          {/* Grid dot pattern */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl">
          {/* Section label + heading */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: c.color }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: c.color }}
              >
                What You Gain
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-2xl">
              Business <span style={{ color: c.color }}>Outcomes</span>
            </h2>
            <p className="mt-4 text-white/40 text-sm md:text-base max-w-xl">
              Tangible, measurable improvements that result from structured advisory engagement.
            </p>
          </div>

          {/* Outcome statement — bold feature block */}
          {c.outcomeStatement && (
            <div
              className="mb-10 md:mb-14 p-7 md:p-10 rounded-2xl relative overflow-hidden"
              style={{ background: `${c.color}12`, border: `1px solid ${c.color}30` }}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl"
                style={{ background: c.color }}
              />
              <p className="text-lg md:text-2xl text-white font-semibold leading-relaxed max-w-3xl">
                &ldquo;{c.outcomeStatement}&rdquo;
              </p>
            </div>
          )}

          {/* Outcomes grid — numbered premium cards */}
          {c.businessOutcomes && c.businessOutcomes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {c.businessOutcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ background: '#0F0F15', border: `1px solid ${c.color}20` }}
                >
                  {/* Hover background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${c.color}08` }}
                  />
                  {/* Number badge */}
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="flex-shrink-0 text-xl font-black tabular-nums leading-none mt-0.5"
                      style={{ color: `${c.color}60` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div
                        className="w-8 h-0.5 mb-3 rounded-full"
                        style={{ background: c.color }}
                      />
                      <p className="text-sm text-white/80 leading-relaxed group-hover:text-white transition-colors">
                        {outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GET IN TOUCH WITH OUR EXPERT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
          <div
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 mx-auto"
            style={{ backgroundColor: `${c.color}15` }}
          >
            <CategoryIcon className="h-8 w-8" style={{ color: c.color }} />
          </div>
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{ color: c.color }}
          >
            Take the Next Step
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-4">
            Get In Touch With Our Expert
          </h2>
          <p className="text-[#6C757D] text-sm md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Our advisors are ready to engage with your team, understand your specific challenges, and provide a practical roadmap tailored to your organization. Start the conversation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
              style={{ background: c.color }}
            >
              {c.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full border border-[#E5E7EB] text-[#212529] font-bold text-sm uppercase tracking-widest hover:bg-[#F4F4F5] transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
