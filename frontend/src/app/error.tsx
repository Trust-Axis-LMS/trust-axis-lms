"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Frontend application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090E] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white/[0.04] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 bg-blue-500/15 text-blue-400 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-blue-400/30">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight">Could Not Load Page</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The service or database is currently waking up or experiencing high traffic. Please refresh or retry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-[#007BFF] hover:bg-blue-600 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/25"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl transition-colors border border-white/10"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
