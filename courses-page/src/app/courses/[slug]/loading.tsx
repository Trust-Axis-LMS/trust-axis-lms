import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <div className="w-full h-[60vh] bg-slate-900 animate-pulse flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 space-y-6">
            <div className="w-32 h-6 bg-slate-800 rounded-full"></div>
            <div className="w-3/4 h-12 md:h-16 bg-slate-800 rounded-xl"></div>
            <div className="w-1/2 h-6 bg-slate-800 rounded-lg mt-4"></div>
            
            <div className="flex gap-4 mt-8">
              <div className="w-32 h-12 bg-blue-600/30 rounded-xl"></div>
              <div className="w-32 h-12 bg-slate-800 rounded-xl"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="w-48 h-8 bg-slate-200 animate-pulse rounded-lg"></div>
              <div className="w-full h-32 bg-slate-100 animate-pulse rounded-xl"></div>
              <div className="w-full h-32 bg-slate-100 animate-pulse rounded-xl"></div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="w-full h-96 bg-slate-100 animate-pulse rounded-2xl sticky top-24"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
