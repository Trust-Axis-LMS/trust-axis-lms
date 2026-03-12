"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

      <div className="container mx-auto flex h-[90px] items-center justify-between px-4 md:px-8 bg-white relative z-40">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-black text-white font-bold text-lg rounded-sm tracking-tighter">
            TA
          </div>
          <span className="text-2xl font-bold tracking-tight text-black">
            Trust Axis
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium absolute left-1/2 -translate-x-1/2 text-gray-500">
          <Link
            href="https://trust-axis-frontend.vercel.app/#about"
            className="hover:text-black transition-colors tracking-widest text-[11px] font-bold uppercase"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="hover:text-black transition-colors tracking-widest text-[11px] font-bold uppercase"
          >
            Courses
          </Link>
          <Link
            href="https://trust-axis-frontend.vercel.app/#resources"
            className="hover:text-black transition-colors tracking-widest text-[11px] font-bold uppercase"
          >
            Resources
          </Link>
          <Link
            href="https://trust-axis-frontend.vercel.app/#contact"
            className="hover:text-black transition-colors tracking-widest text-[11px] font-bold uppercase"
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href="https://trust-axis-frontend.vercel.app/#contact"
            className="tracking-widest text-xs font-bold px-8 h-12 bg-black text-white rounded-sm hover:bg-black/90 uppercase inline-flex items-center"
          >
            Book Consultation
          </Link>
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
          "lg:hidden absolute top-[90px] left-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out z-40 overflow-hidden shadow-xl",
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav className="flex flex-col container mx-auto px-6 py-4 space-y-4">
          <Link
            href="https://trust-axis-frontend.vercel.app/#about"
            onClick={closeMenu}
            className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-3 border-b border-gray-50"
          >
            About Us
          </Link>
          <Link
            href="/"
            onClick={closeMenu}
            className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-3 border-b border-gray-50"
          >
            Courses
          </Link>
          <Link
            href="https://trust-axis-frontend.vercel.app/#resources"
            onClick={closeMenu}
            className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-3 border-b border-gray-50"
          >
            Resources
          </Link>
          <Link
            href="https://trust-axis-frontend.vercel.app/#contact"
            onClick={closeMenu}
            className="text-[13px] font-bold uppercase tracking-widest text-gray-600 hover:text-black py-3 mb-2"
          >
            Contact Us
          </Link>
          <Link
            href="https://trust-axis-frontend.vercel.app/#contact"
            onClick={closeMenu}
            className="w-full tracking-widest text-xs font-bold h-12 bg-black text-white rounded-sm hover:bg-black/90 uppercase mb-4 flex items-center justify-center"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
