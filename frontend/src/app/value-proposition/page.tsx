import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shield, Settings, Users, LineChart } from "lucide-react";

export default function ValuePropositionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl prose prose-slate text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Value Proposition</h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-10 leading-relaxed max-w-2xl mx-auto">
            Securetree.ai is your strategic partner in achieving digital resilience.
          </h2>

          <p className="text-lg text-gray-600 mb-16 leading-relaxed max-w-3xl mx-auto text-left md:text-center px-4">
            We deliver a comprehensive suite of solutions to protect your organization from evolving cyber threats. Our approach combines strategic advisory, advanced technology, expert training, and rigorous assessments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm bg-gray-50 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 m-0">Strengthen your security posture</h3>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                Identify vulnerabilities and implement robust defenses to protect your core infrastructure and data.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm bg-gray-50 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 m-0">Optimize operational efficiency</h3>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                Streamline security processes and reduce risk with integrated tools and automated workflows.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm bg-gray-50 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 m-0">Build a security-conscious culture</h3>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                Empower your workforce with the knowledge and skills to protect your organization actively.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm bg-gray-50 flex flex-col gap-4 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 m-0">Drive business growth</h3>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                Enable innovation while mitigating cyber risks, leading to a confident and unhindered path forward.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
