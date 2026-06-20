import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us — Trust Axis Consulting Group",
  description:
    "Trust Axis helps organizations strengthen cybersecurity, govern AI, manage digital risk, and build workforce capability through practical advisory and training.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">

        {/* ── 1. HERO ──────────────────────────────────────────────── */}
        <section className="bg-[#F9FAFB] py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* Left */}
              <div>
                <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
                  About Trust Axis Consulting Group
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-[#212529] mb-6">
                  Building Digital Trust in a Connected World
                </h1>
                <p className="text-[#6C757D] text-base md:text-lg leading-relaxed mb-8">
                  Trust Axis helps organizations strengthen cybersecurity, govern emerging technologies
                  responsibly, manage digital risk, and build future-ready workforce capability.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex h-14 items-center justify-center gap-2 px-8 rounded-sm bg-[#007BFF] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#007BFF]/90 transition-colors"
                  >
                    Talk to an Advisor
                  </a>
                  <a
                    href="#capabilities"
                    className="inline-flex h-14 items-center justify-center gap-2 px-8 rounded-sm border border-[#E5E7EB] bg-white text-[#212529] font-bold text-sm uppercase tracking-widest hover:bg-[#F9FAFB] transition-colors"
                  >
                    Explore Capabilities
                  </a>
                </div>
              </div>

              {/* Right: focus card */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold tracking-tight text-[#212529] mb-2">Our Focus</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed mb-6">
                  We combine advisory, training, and transformation expertise to help clients move
                  from uncertainty to structured, practical action.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5">
                    <p className="text-2xl font-bold text-[#007BFF]">Cyber</p>
                    <p className="text-xs text-[#6C757D] mt-1">Governance &amp; resilience</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5">
                    <p className="text-2xl font-bold text-[#007BFF]">AI</p>
                    <p className="text-xs text-[#6C757D] mt-1">Responsible adoption</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5">
                    <p className="text-2xl font-bold text-[#007BFF]">Privacy</p>
                    <p className="text-xs text-[#6C757D] mt-1">Data protection</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5">
                    <p className="text-2xl font-bold text-[#007BFF]">Training</p>
                    <p className="text-xs text-[#6C757D] mt-1">Capability building</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. MISSION ───────────────────────────────────────────── */}
        <section id="mission" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

              <div>
                <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
                  Our Mission
                </span>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#212529]">
                  Helping organizations make better digital risk decisions.
                </h2>
              </div>

              <div className="space-y-4 text-[#4A5568] text-sm md:text-base leading-relaxed pt-2 md:pt-16">
                <p>
                  Technology is transforming every industry. Artificial intelligence, cloud platforms,
                  automation, and digital ecosystems create new opportunities, but they also introduce
                  new risks.
                </p>
                <p>
                  Our mission is to help organizations build digital trust through stronger governance,
                  smarter risk management, responsible technology adoption, and practical learning.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. WHAT WE BELIEVE ───────────────────────────────────── */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <span className="inline-block bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
              What We Believe
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#212529] max-w-3xl mb-10">
              Trust is built through governance, awareness, controls, accountability, and continuous
              learning.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Strong Governance</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Clear ownership, effective oversight, and practical operating models.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Responsible Innovation</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  AI, cloud, and digital transformation with the right controls.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Skilled People</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Capability-building that turns awareness into confident action.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Measurable Outcomes</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Practical recommendations that can be implemented and tracked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. CORE CAPABILITIES ─────────────────────────────────── */}
        <section id="capabilities" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <span className="inline-block bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
              Core Capabilities
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#212529] mb-10">
              Advisory and learning services for modern organizations.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Cybersecurity Advisory */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Cybersecurity Advisory</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Strengthen cyber governance, assess risk, improve controls, and prepare for audits
                  and real-world cyber events.
                </p>
                <ul className="mt-4 space-y-2 pl-4">
                  {[
                    "Cyber maturity assessments",
                    "Security governance design",
                    "Risk and control reviews",
                    "Incident readiness",
                  ].map((item) => (
                    <li key={item} className="text-sm text-[#334155] list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI & Technology Advisory */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">AI &amp; Technology Advisory</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Support responsible AI and digital technology adoption through governance, risk
                  assessment, and control design.
                </p>
                <ul className="mt-4 space-y-2 pl-4">
                  {[
                    "AI governance frameworks",
                    "Technology risk reviews",
                    "Cloud and platform risk",
                    "Executive AI awareness",
                  ].map((item) => (
                    <li key={item} className="text-sm text-[#334155] list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Privacy & Data Protection */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Privacy &amp; Data Protection</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Improve how sensitive information is handled, protected, retained, shared, and
                  governed across the organization.
                </p>
                <ul className="mt-4 space-y-2 pl-4">
                  {[
                    "Privacy readiness reviews",
                    "Data protection gap analysis",
                    "Privacy-by-design advisory",
                    "Breach readiness",
                  ].map((item) => (
                    <li key={item} className="text-sm text-[#334155] list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Digital Risk Advisory */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Digital Risk Advisory</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Connect cybersecurity, AI, privacy, cloud, compliance, vendors, and transformation
                  risks into one practical action plan.
                </p>
              </div>

              {/* Banking Consulting */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Banking Consulting</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Support financial institutions across lending, payments, settlement, customer growth,
                  operational excellence, and transformation.
                </p>
              </div>

              {/* Training & Capability Development */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Training &amp; Capability Development</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  Deliver practical programs in cybersecurity, cloud, AI, privacy, governance,
                  compliance, and digital leadership.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. WHY TRUST AXIS ────────────────────────────────────── */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
              Why Trust Axis
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#212529] mb-10">
              Practical advisory with business context.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Practical Over Theoretical</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  We focus on recommendations that can be implemented in real business environments.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Business-Aligned Thinking</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  We translate cyber, AI, privacy, and technology risks into leadership-ready decisions.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base font-bold text-[#212529] mb-2">Capability Building</h3>
                <p className="text-sm text-[#6C757D] leading-relaxed">
                  We help organizations improve through people, process, governance, and continuous
                  learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. FOUNDER & LEADERSHIP ──────────────────────────────── */}
        <section id="founders" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 items-center">

              {/* Founder Photo */}
              <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-[#F8F9FA] relative aspect-[4/5] w-full">
                <img
                  src="/about-headshot.jpeg"
                  alt="Founder"
                  className="absolute inset-0 w-full h-full object-cover scale-105 object-top"
                />
              </div>

              {/* Bio */}
              <div>
                <span className="inline-block bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm mb-6">
                  Founder &amp; Leadership
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#212529] mb-10">
                  Led by practitioners with experience across cybersecurity, technology risk, banking,
                  cloud, AI governance, and enterprise transformation.
                </h2>
                <p className="text-xl md:text-2xl text-[#4A5568] leading-relaxed mb-3">
                  <strong className="text-[#212529]">Dhruv Panchal</strong>
                  <span className="text-sm md:text-base font-light italic text-[#4A5568]">, CEO and Founder of Trust Axis Group</span>
                </p>
                <p className="text-sm text-[#4A5568] leading-relaxed mb-3">
                  Dhruv Panchal is a transformation leader with extensive experience across technology
                  strategy, digital transformation, banking and financial services, cloud adoption,
                  cybersecurity, and AI-driven innovation. Throughout his career, he has led large-scale
                  transformation initiatives, advised organizations on business and technology modernization,
                  and helped enterprises navigate complex digital ecosystems.
                </p>
                <p className="text-sm text-[#4A5568] leading-relaxed">
                  His expertise spans enterprise architecture, financial technology, emerging technologies,
                  governance, and operational transformation, bringing together strategic vision and practical
                  execution to drive measurable business outcomes.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 7. CTA ───────────────────────────────────────────────── */}
        <section id="contact" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="rounded-3xl bg-gradient-to-br from-[#0f2f7a] to-[#111827] px-10 py-20 md:px-20 md:py-24 text-center">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6">
                Let&apos;s build digital trust together.
              </h2>
              <p className="text-[#DBEAFE] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
                Whether you are strengthening cybersecurity, governing AI adoption, improving privacy
                practices, managing digital risk, or building workforce capability, Trust Axis provides
                practical guidance designed to create measurable outcomes.
              </p>
              <a
                href="mailto:contact@trustacg.com"
                className="inline-flex h-14 items-center justify-center gap-2 px-10 rounded-sm bg-[#007BFF] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#007BFF]/90 transition-colors shadow-[0_12px_24px_rgba(0,123,255,0.28)]"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
