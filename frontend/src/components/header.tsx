"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Menu, X, ChevronDown, LogOut, User, GraduationCap, BookOpen,
  Shield, Brain, Lock, Cloud, Search, FileSearch, Network,
  KeyRound, Crosshair, Building2, ArrowRight, Info, Phone,
  Globe, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { COURSES_SITE_URL } from "@/lib/url";

// ─── Auth Buttons ─────────────────────────────────────────────────────────────
function AuthSection({ isMobile = false }: { isMobile?: boolean }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isPending) {
    return <div className="w-24 h-9 rounded-sm bg-gray-100 animate-pulse" />;
  }

  if (session?.user) {
    if (isMobile) {
      return (
        <div className="flex flex-col space-y-1 w-full pb-2">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase() ?? "U"
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold text-gray-900 truncate">{session.user.name}</span>
              <span className="text-xs text-gray-500 truncate">{session.user.email}</span>
            </div>
          </div>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
            <User size={16} className="text-gray-400" /> My Profile
          </Link>
          <button
            onClick={async () => { await signOut(); router.push("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
            ) : (
              session.user.name?.charAt(0).toUpperCase() ?? "U"
            )}
          </div>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-1">
                <User size={15} /> My Profile
              </Link>
              <button
                onClick={async () => { await signOut(); setMenuOpen(false); router.push("/"); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors mb-1"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", isMobile && "w-full")}>
      <Link href="/login" className={cn("text-[12px] font-semibold text-gray-500 hover:text-black transition-colors uppercase tracking-widest", isMobile && "flex-1 text-center py-3 border border-gray-200 rounded-xl")}>
        Login
      </Link>
      <Link
        href="/signup"
        className={cn(
          "px-5 h-[38px] text-[12px] font-bold text-white bg-black hover:bg-black/90 rounded-full transition-all shadow-md active:scale-95 uppercase tracking-widest flex items-center justify-center shrink-0",
          isMobile && "flex-1 h-12 rounded-xl"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

// ─── Domain-based Mega-Menu Data ─────────────────────────────────────────────
interface DomainCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  courses: { title: string; slug: string }[];
}

const domainCategories: DomainCategory[] = [
  {
    id: "cybersecurity",
    label: "Cybersecurity Management",
    icon: Shield,
    description: "Enterprise security frameworks, certification prep & leadership training",
    courses: [
      { title: "ISC2 – Certified in Cybersecurity (CC)", slug: "cc" },
      { title: "PECB – ISO/IEC 27001 Lead Implementer", slug: "iso-27001-lead-implementer" },
      { title: "ISACA – CISM (Certified Info. Security Manager)", slug: "cism" },
      { title: "ISC2 – CISSP (Certified Info. Systems Security Professional)", slug: "cissp" },
      { title: "ISC2 – SSCP (Systems Security Certified Practitioner)", slug: "sscp" },
    ],
  },
  {
    id: "grc",
    label: "Governance, Risk & Compliance",
    icon: Layers,
    description: "GRC frameworks, risk controls and enterprise compliance standards",
    courses: [
      { title: "ISACA – COBIT 2019 Foundation", slug: "cobit-2019-foundation" },
      { title: "ISACA – CRISC (Certified Risk & IS Control)", slug: "crisc" },
      { title: "ISC2 – CGRC (Governance, Risk, and Compliance)", slug: "cgrc" },
      { title: "ISACA – COBIT 2019 Design & Implementation", slug: "cobit-2019-design" },
      { title: "ISACA – CGEIT (Governance of Enterprise IT)", slug: "cgeit" },
    ],
  },
  {
    id: "data-privacy",
    label: "Data Privacy",
    icon: Lock,
    description: "Privacy engineering, GDPR compliance and data protection management",
    courses: [
      { title: "ISACA – CDPSE (Certified Data Privacy Solutions Engineer)", slug: "cdpse" },
      { title: "IAPP – CIPP/E (Certified Information Privacy Professional)", slug: "cipp-e" },
      { title: "IAPP – CIPT (Certified Information Privacy Technologist)", slug: "cipt" },
      { title: "IAPP – CIPM (Certified Information Privacy Manager)", slug: "cipm" },
    ],
  },
  {
    id: "cloud-security",
    label: "Cloud Security",
    icon: Cloud,
    description: "Cloud security architecture, zero trust, and cloud audit certifications",
    courses: [
      { title: "CSA – CCSK (Certificate of Cloud Security Knowledge)", slug: "ccsk" },
      { title: "ISC2 – CCSP (Certified Cloud Security Professional)", slug: "ccsp" },
      { title: "CSA – CCZT (Certificate of Competence in Zero Trust)", slug: "cczt" },
    ],
  },
  {
    id: "audit",
    label: "IT & Security Audit",
    icon: FileSearch,
    description: "Information systems auditing, cloud audit knowledge and ISO auditor tracks",
    courses: [
      { title: "ISACA – CISA (Certified Information Systems Auditor)", slug: "cisa" },
      { title: "PECB – ISO/IEC 27001 Lead Auditor", slug: "iso-27001-lead-auditor" },
      { title: "ISACA/CSA – CCAK (Certificate of Cloud Auditing Knowledge)", slug: "ccak" },
    ],
  },
  {
    id: "security-ops",
    label: "Security Operations",
    icon: Search,
    description: "SOC operations, incident handling, and network defense practicals",
    courses: [
      { title: "ISACA – CCOA (Certified Cybersecurity Operations Analyst)", slug: "ccoa" },
      { title: "EC-Council – C|ND (Certified Network Defender)", slug: "cnd" },
      { title: "EC-Council – E|CIH (Certified Incident Handler)", slug: "cih" },
    ],
  },
  {
    id: "offensive",
    label: "Offensive Security",
    icon: Crosshair,
    description: "Ethical hacking, penetration testing and red team methodologies",
    courses: [
      { title: "EC-Council – C|EH (Certified Ethical Hacker)", slug: "ceh" },
      { title: "CompTIA – PenTest+ (PT0-002)", slug: "comptia-pentest-plus" },
      { title: "EC-Council – CPENT (Penetration Testing Professional)", slug: "cpent" },
    ],
  },
  {
    id: "network",
    label: "Network Security",
    icon: Network,
    description: "Networking fundamentals, Cisco certifications and enterprise routing",
    courses: [
      { title: "CompTIA – Network+ Certification Training", slug: "comptia-network-plus" },
      { title: "Cisco – CCNA (Cisco Certified Network Associate)", slug: "ccna" },
      { title: "Cisco – CCNP ENCOR 350-401", slug: "ccnp-encor" },
      { title: "Cisco – CCNP ENARSI 300-410", slug: "ccnp-enarsi" },
    ],
  },
  {
    id: "iam",
    label: "Identity & Access Management",
    icon: KeyRound,
    description: "IAM tools, privileged access, and identity governance platforms",
    courses: [
      { title: "SailPoint IdentityIQ (IIQ) v8.4 Exam Prep", slug: "sailpoint-iiq" },
      { title: "CyberArk Implementation Training", slug: "cyberark-implementation" },
    ],
  },
];

// ─── Learning & Development Mega-Menu Component ───────────────────────────────
function LearningMegaMenu({
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [activeId, setActiveId] = useState(domainCategories[0].id);

  const activeDomain = domainCategories.find((d) => d.id === activeId) ?? domainCategories[0];

  const handleCategoryEnter = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="fixed left-0 right-0 z-50" style={{ top: '68px' }}>
      {/* Backdrop — clicking outside closes menu */}
      <div className="fixed inset-0 bg-black/25 backdrop-blur-[2px]" style={{ top: '68px', zIndex: -1 }} onClick={onClose} />

      {/* White panel — mouse events live here */}
      <div
        className="relative bg-white shadow-2xl border-t border-gray-100/80"
        style={{ boxShadow: '0 24px 60px -8px rgba(0,0,0,0.22)' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Top accent bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#007BFF] via-blue-400 to-transparent" />

        <div className="max-w-[1400px] mx-auto flex" style={{ minHeight: '440px' }}>
          {/* ── Left: Domain List ── */}
          <div className="w-[280px] flex-shrink-0 border-r border-gray-100 py-6 overflow-y-auto">
            <div className="px-5 mb-3">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">Browse by Domain</p>
            </div>
            {domainCategories.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeId === domain.id;
              return (
                <button
                  key={domain.id}
                  onMouseEnter={() => handleCategoryEnter(domain.id)}
                  onClick={() => handleCategoryEnter(domain.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-150 group relative",
                    isActive ? "bg-blue-50" : "hover:bg-gray-50"
                  )}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#007BFF] rounded-r-full" />}
                  <div className={cn(
                    "flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center transition-colors",
                    isActive ? "bg-[#007BFF]/15" : "bg-gray-100 group-hover:bg-gray-200"
                  )}>
                    <Icon className={cn("h-3.5 w-3.5", isActive ? "text-[#007BFF]" : "text-gray-500")} />
                  </div>
                  <span className={cn(
                    "text-[12px] font-semibold leading-tight transition-colors",
                    isActive ? "text-[#007BFF]" : "text-gray-700 group-hover:text-gray-900"
                  )}>
                    {domain.label}
                  </span>
                  {isActive && <ChevronDown className="ml-auto h-3.5 w-3.5 text-[#007BFF] -rotate-90" />}
                </button>
              );
            })}
          </div>

          {/* ── Middle: Course List ── */}
          <div className="flex-1 py-6 px-8 border-r border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              {(() => {
                const Icon = activeDomain.icon;
                return (
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-[#007BFF]/10">
                    <Icon className="h-4.5 w-4.5 text-[#007BFF]" />
                  </div>
                );
              })()}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007BFF]">Courses</p>
                <h3 className="text-base font-bold text-gray-900 leading-tight">{activeDomain.label}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">{activeDomain.description}</p>

            <div className="grid grid-cols-1 gap-1.5">
              {activeDomain.courses.map((course) => (
                <a
                  key={course.slug}
                  href={`${COURSES_SITE_URL}/courses/${course.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#007BFF] hover:border-[#007BFF] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-md bg-white border border-gray-200 group-hover:bg-white/20 group-hover:border-white/30 flex items-center justify-center transition-all">
                    <ArrowRight className="h-3 w-3 text-[#007BFF] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[12.5px] font-semibold text-gray-800 group-hover:text-white transition-colors leading-snug flex-1">
                    {course.title}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-white/70 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <a
                href={`${COURSES_SITE_URL}?category=${encodeURIComponent(activeDomain.label)}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#007BFF] hover:text-blue-800 transition-colors"
              >
                View all {activeDomain.label} courses <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* ── Right: CTA Panel ── */}
          <div className="w-[240px] flex-shrink-0 py-6 px-6 bg-gray-50/60 flex flex-col">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 mb-5">Quick Access</p>

            <div className="space-y-2 flex-1">
              <a
                href={COURSES_SITE_URL}
                onClick={onClose}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#007BFF] text-white hover:bg-blue-700 transition-colors group"
              >
                <GraduationCap className="h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest">All Courses</p>
                  <p className="text-[10px] text-white/70">Explore full catalog</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={`${COURSES_SITE_URL}#contact`}
                onClick={onClose}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-[#007BFF]/30 hover:bg-blue-50/50 transition-colors group"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-[#007BFF]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-800">Book Consult</p>
                  <p className="text-[10px] text-gray-400">Talk to an advisor</p>
                </div>
              </a>

              <a
                href="/archive"
                onClick={onClose}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-[#007BFF]/30 hover:bg-blue-50/50 transition-colors group"
              >
                <BookOpen className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-[#007BFF]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-800">Course Archive</p>
                  <p className="text-[10px] text-gray-400">Legacy programs</p>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-lg font-black text-gray-900">35+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Courses</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-gray-900">11</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Domains</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Company Dropdown ─────────────────────────────────────────────────────────
function CompanyDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-52">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
        <Link href="/about" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors group">
          <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50">
            <Info className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#007BFF]" />
          </div>
          About Us
        </Link>
        <Link href="/contact" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors group">
          <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50">
            <Phone className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#007BFF]" />
          </div>
          Contact Us
        </Link>
        <Link href="/value-proposition" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors group">
          <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-50">
            <Globe className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#007BFF]" />
          </div>
          Value Proposition
        </Link>
      </div>
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<"learning" | "company" | null>(null);

  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (key: "learning" | "company") => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setActiveMega(key);
  };

  const handleLeave = () => {
    megaTimerRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  const closeAll = useCallback(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md border-gray-100/60">
        <div className="container mx-auto flex h-[68px] items-center justify-between px-4 md:px-6 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group -ml-3 md:-ml-5 flex-shrink-0">
            <img src="/logo.png" alt="Trust Axis Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation — centred */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("company")}
              onMouseLeave={handleLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-colors",
                  activeMega === "company" ? "text-black bg-gray-100" : "text-gray-500 hover:text-black hover:bg-gray-50"
                )}
                onClick={() => setActiveMega(activeMega === "company" ? null : "company")}
              >
                Company
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", activeMega === "company" ? "rotate-180" : "")} />
              </button>

              {activeMega === "company" && (
                <div onMouseEnter={() => handleEnter("company")} onMouseLeave={handleLeave}>
                  <CompanyDropdown onClose={() => setActiveMega(null)} />
                </div>
              )}
            </div>

            {/* Learning & Development — Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("learning")}
              onMouseLeave={handleLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
                  activeMega === "learning" ? "text-black bg-gray-100" : "text-gray-500 hover:text-black hover:bg-gray-50"
                )}
                onClick={() => setActiveMega(activeMega === "learning" ? null : "learning")}
              >
                Academy
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", activeMega === "learning" ? "rotate-180" : "")} />
              </button>

              {activeMega === "learning" && (
                <div className="absolute inset-0 pointer-events-none" />
              )}
            </div>

            {/* Resources */}
            <Link href="/resources" className="px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors whitespace-nowrap">
              Resources
            </Link>

            {/* Consultancy */}
            <Link href="/#consultancy" className="px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors whitespace-nowrap">
              Consultancy
            </Link>

          </nav>

          {/* Right: Auth + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center">
              <AuthSection />
            </div>
            <button
              type="button"
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Click-away backdrop for dropdowns */}
        {activeMega && (
          <div className="fixed inset-0 z-30" onClick={() => setActiveMega(null)} style={{ top: '68px' }} />
        )}
      </header>

      {/* ── Mega Menu rendered at root level, fixed to viewport ── */}
      {activeMega === "learning" && (
        <LearningMegaMenu
          onClose={() => setActiveMega(null)}
          onMouseEnter={() => handleEnter("learning")}
          onMouseLeave={handleLeave}
        />
      )}

      {/* ── Full-screen Mobile Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 h-[68px] border-b border-gray-100 flex-shrink-0">
            <Link href="/" onClick={closeAll}>
              <img src="/logo.png" alt="Trust Axis Logo" className="h-10 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile nav content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {/* Company links */}
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 px-2 mb-2">Company</p>
            <Link href="/about" onClick={closeAll} className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Info className="h-4 w-4 text-gray-400" /> About Us
            </Link>
            <Link href="/contact" onClick={closeAll} className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Phone className="h-4 w-4 text-gray-400" /> Contact Us
            </Link>

            <div className="h-px bg-gray-100 my-3" />

            {/* Courses by domain */}
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 px-2 mb-2">Academy — Courses by Domain</p>
            {domainCategories.map((domain) => {
              const Icon = domain.icon;
              return (
                <a
                  key={domain.id}
                  href={`${COURSES_SITE_URL}?category=${encodeURIComponent(domain.label)}`}
                  onClick={closeAll}
                  className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#007BFF] transition-colors group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-[#007BFF]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#007BFF] transition-colors" />
                  </div>
                  {domain.label}
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-gray-300 group-hover:text-[#007BFF] transition-colors" />
                </a>
              );
            })}

            <div className="h-px bg-gray-100 my-3" />

            {/* Other nav */}
            <Link href="/resources" onClick={closeAll} className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Building2 className="h-4 w-4 text-gray-400" /> Resources
            </Link>
            <Link href="/#consultancy" onClick={closeAll} className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Shield className="h-4 w-4 text-gray-400" /> Consultancy
            </Link>
          </div>

          {/* Mobile auth footer */}
          <div className="flex-shrink-0 px-5 py-5 border-t border-gray-100">
            <AuthSection isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
}
