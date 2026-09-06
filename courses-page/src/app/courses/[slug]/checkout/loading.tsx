import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CheckoutLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-3 text-center">
            <div className="w-28 h-6 bg-slate-200 animate-pulse rounded-full mx-auto" />
            <div className="w-80 h-10 bg-slate-300 animate-pulse rounded-xl mx-auto" />
            <div className="w-64 h-5 bg-slate-200 animate-pulse rounded-md mx-auto" />
          </div>

          {/* Form / Card Skeleton */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
            <div className="h-6 w-48 bg-slate-200 animate-pulse rounded-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-12 bg-slate-100 animate-pulse rounded-xl" />
              <div className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            </div>
            <div className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            <div className="h-32 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
            <div className="h-12 bg-blue-600/30 animate-pulse rounded-xl w-full" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
