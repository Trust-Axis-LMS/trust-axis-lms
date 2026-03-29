import { consultancies } from "@/lib/consultancy-data";
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Target, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Consultancy Services | Trust Axis",
  description: "Expert guidance to transform, secure, and innovate your business operations.",
};

export default function ConsultancyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-32 xl:py-40 flex items-center justify-center overflow-hidden bg-[#18181B]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
            alt="Consultancy Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent z-10" />
        </div>
        
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md mb-4 uppercase tracking-widest shadow-lg">
            Trust Axis Advisory
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4">
            Strategic Consultancy
          </h1>
          <p className="mx-auto max-w-[700px] text-lg lg:text-xl text-gray-300">
            Empowering organizations with cutting-edge risk management, digital transformation, and financial security strategies to lead in a complex world.
          </p>
        </div>
      </section>

      {/* Description & Value Proposition */}
      <section className="w-full py-16 lg:py-24 bg-gray-50 border-b border-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Partnering for a resilient and innovative future.
              </h2>
              <p className="text-lg text-gray-600">
                At Trust Axis, we align cutting-edge technological shifts with foundational business objectives. Our consultancy doesn’t just offer advice; we provide comprehensive execution roadmaps that de-risk operations and accelerate market growth.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Tailored strategies customized to your unique organizational maturity.",
                  "Deep-domain expertise in FinTech, Cyber Security, and Quantum-Readiness.",
                  "A proactive approach to compliance and risk management (GRC).",
                  "Actionable roadmaps minimizing time-to-value."
                ].map((point, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-black flex items-center justify-center">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-3">
                 <Target className="h-8 w-8 text-blue-600 mb-2" />
                 <h3 className="text-3xl font-bold">100+</h3>
                 <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Transformations Led</p>
               </div>
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-3">
                 <ShieldCheck className="h-8 w-8 text-green-600 mb-2" />
                 <h3 className="text-3xl font-bold">Zero</h3>
                 <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Compliance Breaches</p>
               </div>
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-3 sm:col-span-2">
                 <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                 <h3 className="text-3xl font-bold">2.5x ROI</h3>
                 <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Average yield against typical advisory costs over 3 years.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultancies Grid */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Our Practice Areas
            </h2>
            <p className="max-w-[700px] text-lg text-gray-600">
              Select an area of expertise to learn how we can modernize and secure your operational frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {consultancies.map((consultancy) => (
              <div 
                key={consultancy.slug}
                className="group flex flex-col justify-between bg-white border border-gray-200 hover:border-black rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                    {consultancy.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {consultancy.excerpt}
                  </p>
                </div>
                
                <div className="pt-8 mt-auto">
                  <Link 
                    href={`/consultancy/${consultancy.slug}`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-black group-hover:gap-3 gap-2 transition-all"
                  >
                    Explore Insights <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
