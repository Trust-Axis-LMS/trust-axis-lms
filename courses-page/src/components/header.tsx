"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import { MAIN_SITE_URL } from "@/lib/url";

// ─── Auth Buttons (Copied from frontend) ───────────────────────────────────────
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
          <div className="flex items-center gap-3 px-2 py-3 mb-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
              {session.user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase() ?? "U"
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold text-[#212529] truncate">{session.user.name}</span>
              <span className="text-xs font-medium text-[#6C757D] truncate">{session.user.email}</span>
            </div>
          </div>
          
          <Link
            href={`${MAIN_SITE_URL}/profile`}
            className="flex items-center gap-2 px-2 py-3 text-sm font-bold uppercase tracking-widest text-[#4A5568] hover:text-[#212529] transition-colors"
          >
            <User size={16} /> My Profile
          </Link>
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="w-full flex items-center gap-2 px-2 py-3 text-sm font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
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
          className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
            {session.user.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
            ) : (
              session.user.name?.charAt(0).toUpperCase() ?? "U"
            )}
          </div>
          <span className="text-sm font-semibold text-gray-900 hidden sm:inline max-w-[100px] truncate">
            {session.user.name}
          </span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
              <div className="px-4 py-3 border-b border-gray-50 bg-[#F8FAFC]/50">
                <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                <p className="text-xs font-medium text-gray-500 truncate">{session.user.email}</p>
              </div>
              <Link
                href={`${MAIN_SITE_URL}/profile`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-1"
              >
                <User size={15} />
                My Profile
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  setMenuOpen(false);
                  router.push("/");
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors mb-1"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-6", isMobile && "w-full justify-between")}>
      <Link
        href={`${MAIN_SITE_URL}/login`}
        className="text-[12px] font-semibold text-gray-500 hover:text-black transition-colors uppercase tracking-widest"
      >
        Login
      </Link>
      <Link
        href={`${MAIN_SITE_URL}/signup`}
        className={cn(
          "px-6 h-[40px] text-[12px] font-bold text-white bg-black hover:bg-black/90 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest flex items-center justify-center shrink-0",
          isMobile && "flex-1 ml-4"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { label: "About Us", href: `${MAIN_SITE_URL}/#about` },
  { label: "Courses", href: "/" },
  { label: "Resources", href: `${MAIN_SITE_URL}/resources` },
  { label: "Consultancy", href: `${MAIN_SITE_URL}/consultancy` },
  { label: "Contact Us", href: `${MAIN_SITE_URL}/contact` },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white border-gray-100">
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[90px] bg-black/20 z-30 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <div className="container mx-auto flex h-[90px] items-center justify-between px-4 md:px-6 bg-white relative z-40">
        <Link href="/" className="flex items-center cursor-pointer group -ml-3 md:-ml-5">
          <img src="/logo.png" alt="Trust Axis Logo" className="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-500 hover:text-black transition-colors tracking-widest text-[11px] font-bold uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Removed Book Consultation, Replaced with AuthSection */}
        <div className="hidden lg:flex items-center">
          <AuthSection />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden ml-auto flex-shrink-0 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={cn(
          "lg:hidden absolute top-[90px] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out z-40 overflow-hidden shadow-2xl",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav className="flex flex-col container mx-auto px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-3 border-b border-gray-50 block"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <AuthSection isMobile={true} />
          </div>
        </nav>
      </div>
    </header>
  );
}
