"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";

// ─── Auth Buttons ─────────────────────────────────────────────────────────────
function AuthSection() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isPending) {
    return <div className="w-24 h-9 rounded-sm bg-gray-100 animate-pulse" />;
  }

  if (session?.user) {
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
              <div className="px-4 py-2.5 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-900 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
    <div className="flex items-center gap-6">
      <Link
        href="/login"
        className="text-[12px] font-semibold text-gray-500 hover:text-black transition-colors uppercase tracking-widest"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-6 h-[40px] text-[12px] font-bold text-white bg-black hover:bg-black/90 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest flex items-center justify-center shrink-0"
      >
        Sign Up
      </Link>
    </div>
  );
}

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/#courses" },
  { label: "Resources", href: "/resources" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "Contact Us", href: "/contact" },
];

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md border-gray-100/50">
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-black/10 z-30 lg:hidden" onClick={closeMenu} />
      )}

      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 md:px-6 relative z-40">
        {/* Logo — clicking goes to home */}
        <Link href="/" className="flex items-center cursor-pointer group -ml-3 md:-ml-5">
          <img src="/logo.png" alt="Trust Axis Logo" className="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
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

        <div className="hidden lg:flex items-center">
          <AuthSection />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="lg:hidden ml-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-sm hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={cn(
        "lg:hidden absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out z-40 overflow-hidden shadow-2xl",
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-transparent"
      )}>
        <nav className="flex flex-col container mx-auto px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-[12px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-4 border-b border-gray-50 flex items-center justify-between transition-colors"
            >
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100">
            <AuthSection />
          </div>

        </nav>
      </div>
    </header>
  );
}
