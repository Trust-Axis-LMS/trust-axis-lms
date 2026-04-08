import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black bg-black pb-8 pt-16 text-white md:pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-5 md:gap-12">
          <div className="col-span-1 space-y-6 md:col-span-2">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-base font-bold tracking-tighter text-black md:h-12 md:w-12 md:text-lg">
                TA
              </div>
              <span className="text-xl font-bold tracking-tight md:text-2xl">
                Trust Axis
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400 md:text-[15px]">
              Empowering professionals with industry-leading education and
              career advancement opportunities.
            </p>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px]">
                Programs
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-400 md:space-y-4">
                <li>
                  <Link href="/#courses" className="transition-colors hover:text-white">
                    Data Science
                  </Link>
                </li>
                <li>
                  <Link href="/#courses" className="transition-colors hover:text-white">
                    Product Management
                  </Link>
                </li>
                <li>
                  <Link href="/#courses" className="transition-colors hover:text-white">
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link href="/#courses" className="transition-colors hover:text-white">
                    Cloud Computing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px]">
                Company
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-400 md:space-y-4">
                <li>
                  <Link href="/#about" className="transition-colors hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/blogs"
                    className="transition-colors hover:text-white"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/articles"
                    className="transition-colors hover:text-white"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/whitepapers"
                    className="transition-colors hover:text-white"
                  >
                    Whitepapers
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 md:ml-auto">
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white md:mb-6 md:text-[11px]">
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center text-[11px] font-semibold tracking-wide text-gray-500 md:flex-row md:text-left md:text-[13px]">
          <p>© 2026 Trust Axis. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/value-proposition" className="transition-colors hover:text-white">
              Value Proposition
            </a>
            <a href="/sustainability" className="transition-colors hover:text-white">
              Sustainability Policy
            </a>
            <a href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy & Cookie Policy
            </a>
            <a href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
