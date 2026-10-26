import Link from "next/link";
import { Compass, BookOpen } from "lucide-react";
import { MAIN_SITE_URL } from "@/lib/url";

export const metadata = {
  title: "Page Not Found — Trust Axis",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-blue-400/20">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight">Course Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            We couldn&apos;t find that page. It may have been renamed or removed from the catalog.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-[#007BFF] hover:bg-blue-600 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/25"
          >
            <BookOpen className="w-4 h-4" /> Browse Courses
          </Link>
          <a
            href={MAIN_SITE_URL}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl transition-colors border border-white/10"
          >
            Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
