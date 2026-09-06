import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="bg-slate-900 py-24 md:py-32 border-b border-slate-800">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center space-y-6">
            <div className="w-24 h-6 bg-slate-800 animate-pulse rounded-full mx-auto" />
            <div className="w-3/4 md:w-1/2 h-12 md:h-16 bg-slate-800 animate-pulse rounded-2xl mx-auto" />
            <div className="w-5/6 md:w-2/3 h-5 bg-slate-800/80 animate-pulse rounded-lg mx-auto" />
          </div>
        </section>

        {/* Content Cards Skeleton */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-4 shadow-sm animate-pulse">
                  <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                  <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
