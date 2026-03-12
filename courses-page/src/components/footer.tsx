import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-20 pb-8 border-t border-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 mb-16 md:mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center bg-white text-black font-bold text-base md:text-lg rounded-sm tracking-tighter">
                TA
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                Trust Axis
              </span>
            </div>
            <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed max-w-sm">
              Empowering professionals with industry-leading education and
              career advancement opportunities.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">
                Programs
              </h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-medium">
                <li>
                  <Link
                    href="/courses/advanced-cybersecurity-program"
                    className="hover:text-white transition-colors"
                  >
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses/advanced-data-analytics-program"
                    className="hover:text-white transition-colors"
                  >
                    Data Science
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses/product-management-program"
                    className="hover:text-white transition-colors"
                  >
                    Product Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses/aws-cloud-architecture-program"
                    className="hover:text-white transition-colors"
                  >
                    Cloud Computing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">
                Company
              </h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-medium">
                <li>
                  <a
                    href="https://trust-axis-frontend.vercel.app/#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="https://trust-axis-frontend.vercel.app/#resources"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://trust-axis-frontend.vercel.app/#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 md:ml-auto">
            <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-[13px] text-gray-500 font-semibold tracking-wide text-center md:text-left">
          <p>© 2026 Trust Axis. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
