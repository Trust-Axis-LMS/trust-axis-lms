"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

// ─── Auth Buttons ─────────────────────────────────────────────────────────────
function AuthSection({ isMobile = false }: { isMobile?: boolean }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isPending) {
    return <div className={cn("w-24 h-9 rounded-sm bg-gray-100 animate-pulse", !isMobile && "bg-white/10")} />;
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
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
            isMobile ? "hover:bg-gray-100" : "hover:bg-white/10"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
            ) : (
              session.user.name?.charAt(0).toUpperCase() ?? "U"
            )}
          </div>
          <ChevronDown size={14} className={isMobile ? "text-gray-500" : "text-slate-300"} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50"
            >
              {/* Click-away backdrop overlay */}
              <div className="fixed inset-0 z-[-1] cursor-default" onClick={() => setMenuOpen(false)} />
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-1">
                <User size={15} /> My Profile
              </Link>
              <button
                onClick={async () => { await signOut(); setMenuOpen(false); router.push("/"); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors mb-1 cursor-pointer"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", isMobile && "w-full")}>
      <Link
        href="/login"
        className={cn(
          "text-[12px] font-semibold uppercase tracking-widest transition-colors",
          isMobile 
            ? "text-gray-500 hover:text-black flex-1 text-center py-3 border border-gray-200 rounded-xl"
            : "text-slate-300 hover:text-white"
        )}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={cn(
          "px-5 h-[38px] text-[12px] font-bold transition-all shadow-md active:scale-95 uppercase tracking-widest flex items-center justify-center shrink-0",
          isMobile 
            ? "flex-1 h-12 rounded-xl text-white bg-black hover:bg-black/90"
            : "rounded-full text-slate-950 bg-white hover:bg-white/90"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

// ─── Domain-based Mega-Menu Data ─────────────────────────────────────────────
interface CourseItem {
  title: string;
  slug: string;
}

interface SubCategory {
  id: string;
  label: string;
  courses: CourseItem[];
}

interface MainCategory {
  id: string;
  label: string;
  subcategories?: SubCategory[];
  allCourses?: CourseItem[]; // For cases where there's no middle column
}

// ─── Dynamic Mega Menu Data Fetching ──────────────────────────────────────────
let cachedMenuData: MainCategory[] | null = null;
const defaultMenuData: MainCategory[] = [
  { id: "vendor", label: "Courses by Vendor", subcategories: [] },
  { id: "domain", label: "Courses by Domain", subcategories: [] }
];

function useMegaMenu() {
  const [data, setData] = useState<MainCategory[]>(cachedMenuData || defaultMenuData);
  useEffect(() => {
    if (!cachedMenuData) {
      fetch("/api/courses/menu")
        .then((r) => r.json())
        .then((d) => {
          cachedMenuData = d;
          setData(d);
        })
        .catch(console.error);
    }
  }, []);
  return data;
}

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
  const megaMenuData = useMegaMenu();
  const [activeMainId, setActiveMainId] = useState(megaMenuData[0]?.id);
  const [activeSubId, setActiveSubId] = useState(megaMenuData[0]?.subcategories?.[0]?.id ?? "");

  // Update active IDs if data loads and IDs are empty
  useEffect(() => {
    if (megaMenuData.length > 0 && !megaMenuData.find(m => m.id === activeMainId)) {
      setActiveMainId(megaMenuData[0].id);
      setActiveSubId(megaMenuData[0].subcategories?.[0]?.id ?? "");
    }
  }, [megaMenuData, activeMainId]);

  const activeMain = megaMenuData.find((m) => m.id === activeMainId) ?? megaMenuData[0];
  const activeSub = activeMain?.subcategories?.find((s) => s.id === activeSubId) ?? activeMain?.subcategories?.[0];

  const handleMainEnter = (id: string) => {
    setActiveMainId(id);
    const mainCat = megaMenuData.find(m => m.id === id);
    if (mainCat?.subcategories?.length) {
      setActiveSubId(mainCat.subcategories[0].id);
    }
  };

  const handleSubEnter = (id: string) => {
    setActiveSubId(id);
  };

  const displayCourses = activeMain?.subcategories ? activeSub?.courses ?? [] : activeMain?.allCourses ?? [];

  return (
    <div className="fixed left-0 right-0 z-50 flex justify-center" style={{ top: '68px' }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm"
        style={{ top: '68px', zIndex: -1 }}
        onClick={onClose}
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1280px] mt-4 relative bg-white/95 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-3xl border border-slate-200/50 overflow-hidden mx-4 ring-1 ring-slate-900/5"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex h-[560px]">

          {/* ── Column 1: Main Categories ── */}
          <div className="w-[300px] bg-slate-50/50 border-r border-slate-200/60 flex-shrink-0 flex flex-col relative z-10">
            <div className="px-8 py-6 border-b border-slate-200/50">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</h4>
            </div>
            <div className="py-4 px-4 flex-1 space-y-1">
              {megaMenuData.map((mainCat) => {
                const isActive = activeMainId === mainCat.id;
                return (
                  <button
                    key={mainCat.id}
                    onMouseEnter={() => handleMainEnter(mainCat.id)}
                    onClick={() => handleMainEnter(mainCat.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-300 relative group overflow-hidden",
                      isActive
                        ? "text-blue-600 bg-blue-50/80 shadow-sm ring-1 ring-blue-500/20"
                        : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                    )}
                    <span className="relative z-10">{mainCat.label}</span>
                    <ArrowRight className={cn(
                      "h-4 w-4 transition-all duration-300 relative z-10",
                      isActive ? "text-blue-600 translate-x-1" : "text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5"
                    )} />
                  </button>
                );
              })}
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 m-4 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer" onClick={onClose}>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              <h5 className="text-white font-bold text-sm mb-1">Need Guidance?</h5>
              <p className="text-blue-100 text-xs mb-3">Talk to our advisors to find the perfect career path.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
                Book a Call <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* ── Column 2: Subcategories ── */}
          <div className="w-[340px] bg-white border-r border-slate-200/60 flex-shrink-0 flex flex-col relative">
            <div className="px-8 py-6 border-b border-slate-200/50 flex justify-between items-center bg-white/50 sticky top-0 backdrop-blur-md z-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                {activeMain?.id === 'vendor' ? 'Official Vendors' : activeMain?.id === 'domain' ? 'Expertise Domains' : 'Select Pathway'}
              </h4>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 custom-scrollbar">
              {activeMain?.subcategories ? (
                activeMain.subcategories.map((subCat) => {
                  const isActive = activeSubId === subCat.id;
                  return (
                    <button
                      key={subCat.id}
                      onMouseEnter={() => handleSubEnter(subCat.id)}
                      onClick={() => handleSubEnter(subCat.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-[14px] transition-all duration-300 group",
                        isActive
                          ? "bg-slate-50 text-blue-600 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ring-1 ring-slate-200/50"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-300",
                          isActive ? "bg-blue-600 scale-125" : "bg-slate-200 group-hover:bg-slate-300"
                        )} />
                        {subCat.label}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-6 py-10 flex flex-col items-center justify-center text-center h-full opacity-60">
                  <GraduationCap className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-sm font-medium text-slate-500">Explore our comprehensive catalog of curated courses.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Column 3: Courses ── */}
          <div className="flex-1 bg-slate-50/30 flex flex-col overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="px-10 py-6 border-b border-slate-200/50 flex items-center justify-between bg-white/40 sticky top-0 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 ring-1 ring-blue-500/20">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                    {activeSub ? activeSub.label : activeMain?.label}
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Featured Programs</p>
                </div>
              </div>

              {activeMain?.subcategories && (
                <a
                  href={`${COURSES_SITE_URL}?category=${encodeURIComponent(activeMain.label)}`}
                  onClick={onClose}
                  className="text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group"
                >
                  View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-10 relative custom-scrollbar">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-8">
                {displayCourses.map((course) => (
                  <a
                    key={course.slug}
                    href={`${COURSES_SITE_URL}/courses/${course.slug}`}
                    onClick={onClose}
                    className="group flex flex-col justify-center p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-[14px] font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-relaxed pr-6">
                      {course.title}
                    </span>
                    <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white/80 border-t border-slate-200/50 backdrop-blur-md flex justify-center sticky bottom-0 z-10">
              <a
                href={COURSES_SITE_URL}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-[13px] font-bold text-white bg-slate-900 rounded-xl hover:bg-blue-600 shadow-md hover:shadow-blue-600/25 transition-all duration-300 active:scale-95"
              >
                Browse Full Course Catalog <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

function CompanyDropdown({ onClose }: { onClose: () => void }) {
  return (
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
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const megaMenuData = useMegaMenu();
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
      <header className="sticky top-0 z-50 w-full border-b bg-slate-950/45 backdrop-blur-md border-white/10">
        <div className="container mx-auto flex h-[68px] items-center justify-between px-4 md:px-6 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group -ml-3 md:-ml-5 flex-shrink-0">
            <img src="/logo.png" alt="Trust Axis Logo" className="h-12 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105" />
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
                  activeMega === "company" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
                onClick={() => setActiveMega(activeMega === "company" ? null : "company")}
              >
                Company
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", activeMega === "company" ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {activeMega === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => handleEnter("company")}
                    onMouseLeave={handleLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-52"
                  >
                    <CompanyDropdown onClose={() => setActiveMega(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
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
                  activeMega === "learning" ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
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
            <Link href="/resources" className="px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap">
              Resources
            </Link>

            {/* Consultancy */}
            <Link href="/#consultancy" className="px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap">
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
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-white/10 text-white transition-colors"
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
      <AnimatePresence>
        {activeMega === "learning" && (
          <LearningMegaMenu
            onClose={() => setActiveMega(null)}
            onMouseEnter={() => handleEnter("learning")}
            onMouseLeave={handleLeave}
          />
        )}
      </AnimatePresence>

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
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 px-2 mb-2">Academy</p>
            {megaMenuData.map((mainCat) => {
              return (
                <a
                  key={mainCat.id}
                  href={`${COURSES_SITE_URL}?category=${encodeURIComponent(mainCat.label)}`}
                  onClick={closeAll}
                  className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#007BFF] transition-colors group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-[#007BFF]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <GraduationCap className="h-3.5 w-3.5 text-gray-500 group-hover:text-[#007BFF] transition-colors" />
                  </div>
                  {mainCat.label}
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
