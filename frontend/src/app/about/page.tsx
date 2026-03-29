import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Globe, Briefcase, BookOpen } from "lucide-react";
import { COURSES_SITE_URL } from "@/lib/url";

export const metadata = {
  title: "About Us — Trust Axis",
  description: "Learn about Trust Axis — our mission, vision, and the team behind the platform.",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower professionals and teams with structured, industry-aligned training that drives measurable career and organizational growth.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "With students across 40+ countries, Trust Axis is building a worldwide community of skilled professionals in cybersecurity, data, cloud, and leadership.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description:
      "Our curriculum is designed around globally recognized certifications — helping learners achieve credentials that employers trust.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "Every instructor is an active industry practitioner with 10+ years of field experience, ensuring real-world relevance in every session.",
  },
  {
    icon: Briefcase,
    title: "Career-First Approach",
    description:
      "From resume coaching to mock interviews and placement support, we walk alongside you from enrollment through your next career milestone.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description:
      "Our programs are continuously updated to reflect the latest industry standards, tools, and best practices so your knowledge stays current.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
              About Trust Axis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#212529] tracking-tight leading-tight mb-6">
              Shaping the Future of<br />Professional Learning
            </h1>
            <p className="text-[#6C757D] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Trust Axis is a specialized training and consultancy platform focused on cybersecurity,
              data science, cloud computing, and leadership development. We partner with organizations
              and individuals to close the skills gap through structured, outcome-driven programs.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-[#4A5568] text-sm md:text-base leading-relaxed">
                  <p>
                    Trust Axis was founded by a group of cybersecurity and technology professionals who
                    experienced first-hand the gap between theoretical education and the practical demands
                    of enterprise environments.
                  </p>
                  <p>
                    What began as a small training initiative for corporate teams quickly evolved into a
                    full-fledged learning platform — one that combines structured curricula, real-world
                    labs, and dedicated mentorship to produce job-ready professionals.
                  </p>
                  <p>
                    Today, Trust Axis serves over 50,000 learners across 40+ countries, partnering with
                    leading enterprises to upskill their technical and leadership teams.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "50,000+", label: "Students Trained" },
                  { number: "40+", label: "Countries Reached" },
                  { number: "200+", label: "Expert Instructors" },
                  { number: "95%", label: "Satisfaction Rate" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 md:p-6 text-center"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-[#212529] mb-1">{stat.number}</p>
                    <p className="text-[11px] text-[#6C757D] font-bold uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-3">
                What Drives Us
              </h2>
              <p className="text-[#6C757D] text-sm md:text-base">
                The principles that shape how we teach, train, and support our learners
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <Card
                    key={i}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white mb-5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#212529] mb-2 tracking-tight">
                        {val.title}
                      </h3>
                      <p className="text-sm text-[#6C757D] leading-relaxed">{val.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Explore our programs or speak with an advisor to find the right path for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={COURSES_SITE_URL}
                className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Explore Programs
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-sm border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
