import { consultancies } from "@/lib/consultancy-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const consultancy = consultancies.find((c) => c.slug === slug);
  if (!consultancy) return { title: "Not Found | Trust Axis" };
  
  return {
    title: `${consultancy.title} | Trust Axis Consultancy`,
    description: consultancy.excerpt,
  };
}

export default async function ConsultancyDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const consultancy = consultancies.find((c) => c.slug === slug);

  if (!consultancy) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      {/* Hero Header */}
      <section className="bg-[#18181B] border-b border-[#27272A] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="mb-6">
            <Link 
              href="/consultancy" 
              className="text-gray-400 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase flex items-center gap-2"
            >
              ← Back to All Consultancies
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {consultancy.title}
          </h1>
          <p className="max-w-[800px] text-lg lg:text-xl text-gray-300">
            {consultancy.excerpt}
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="w-full py-16 lg:py-24 flex-1">
        <div className="container px-4 md:px-6 mx-auto flex gap-12 lg:gap-24 flex-col lg:flex-row">
          
          <div className="flex-1 max-w-[800px] prose prose-lg prose-gray max-w-none">
            <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-12 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-xl font-bold tracking-tight text-blue-600 mt-8 mb-4 uppercase tracking-wider" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-600 leading-relaxed mb-6" {...props} />,
                  ul: ({node, ...props}) => <ul className="space-y-3 mb-8 ml-4 border-l-2 border-gray-100 pl-4" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-700 font-medium" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-12 border-gray-200" {...props} />
                }}
            >
              {consultancy.content}
            </ReactMarkdown>
          </div>
          
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 flex flex-col items-start gap-4 shadow-sm">
              <h3 className="text-xl font-bold">Ready to take the next step?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                Our experts are ready to engage with your team and provide the strategic roadmap you need. Start the conversation today.
              </p>
              <Link 
                href="/contact" 
                className="w-full bg-black text-white px-6 py-4 rounded-md font-bold text-sm uppercase tracking-widest text-center hover:bg-black/90 transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
