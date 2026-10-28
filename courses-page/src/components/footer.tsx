import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";
import { MAIN_SITE_URL, COURSES_SITE_URL } from "@/lib/url";
import { CONTACT_EMAIL, LINKEDIN_URL, PRACTICE_AREAS, YOUTUBE_URL } from "@/lib/site";

// Links are prefixed so the same footer works on both domains.
const BASE = MAIN_SITE_URL;

export function Footer() {
  return (
    <footer className="border-t border-black bg-black pb-8 pt-16 text-white md:pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-5 md:gap-12">
          <div className="col-span-1 space-y-6 md:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href={BASE || "/"} className="inline-flex items-center cursor-pointer group">
              <img src="/logo.png" alt="Trust Axis Logo" className="h-12 md:h-14 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400 md:text-[15px]">
              Cybersecurity, AI governance, privacy advisory, and practical
              training to help organizations build digital trust.
            </p>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px]">
                Consultancy
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-400 md:space-y-4">
                {PRACTICE_AREAS.map((area) => (
                  <li key={area.slug}>
                    <Link href={`${BASE}/consultancy/${area.slug}`} className="transition-colors hover:text-white">
                      {area.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`${BASE}/consultancy`} className="transition-colors hover:text-white">
                    All Practice Areas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px]">
                Company
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-400 md:space-y-4">
                {[
                  { href: `${BASE}/about`, label: "About Us" },
                  { href: COURSES_SITE_URL, label: "Academy" },
                  { href: `${COURSES_SITE_URL}/corporate`, label: "Corporate Training" },
                  { href: `${BASE}/resources/blogs`, label: "Blogs" },
                  { href: `${BASE}/resources/articles`, label: "Articles" },
                  { href: `${BASE}/resources/whitepapers`, label: "Whitepapers" },
                  { href: `${BASE}/contact`, label: "Contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center md:items-start md:ml-auto">
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px] text-center md:text-left">
              Connect
            </h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href={LINKEDIN_URL}
                aria-label="Trust Axis on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={YOUTUBE_URL}
                aria-label="Trust Axis on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 text-sm font-medium text-gray-400 transition-colors hover:text-white">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center text-[11px] font-semibold tracking-wide text-gray-500 md:flex-row md:text-left md:text-[13px]">
          <p>© 2026 Trust Axis. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href={`${BASE}/value-proposition`} className="transition-colors hover:text-white">
              Value Proposition
            </a>
            <a href={`${BASE}/sustainability`} className="transition-colors hover:text-white">
              Sustainability Policy
            </a>
            <a href={`${BASE}/privacy-policy`} className="transition-colors hover:text-white">
              Privacy & Cookie Policy
            </a>
            <a href={`${BASE}/terms-and-conditions`} className="transition-colors hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
