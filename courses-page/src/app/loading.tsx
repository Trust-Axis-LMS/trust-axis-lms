import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden bg-slate-900 pt-32 pb-24 border-b border-slate-800 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-3/4 md:w-1/2 h-12 md:h-16 bg-slate-800 animate-pulse rounded-2xl mx-auto"></div>
            <div className="w-5/6 md:w-2/3 h-6 bg-slate-800 animate-pulse rounded-lg mx-auto"></div>
          </div>
        </section>

        {/* Content Skeleton */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter Skeleton */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="h-10 bg-slate-200 animate-pulse rounded-xl w-full"></div>
              <div className="space-y-3 mt-6">
                <div className="h-4 bg-slate-200 animate-pulse rounded w-1/2"></div>
                <div className="h-8 bg-slate-200 animate-pulse rounded-lg w-full"></div>
                <div className="h-8 bg-slate-200 animate-pulse rounded-lg w-full"></div>
                <div className="h-8 bg-slate-200 animate-pulse rounded-lg w-3/4"></div>
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white border border-slate-200 rounded-3xl animate-pulse shadow-sm">
                    <div className="h-48 bg-slate-100 rounded-t-3xl w-full"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
                      <div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
