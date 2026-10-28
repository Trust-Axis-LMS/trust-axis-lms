import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Building2, ClipboardList, GraduationCap, LineChart, MapPin, Monitor,
  Presentation, Shuffle, Users, Wrench,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCatalog, groupByVendor } from "@/lib/course-collections";
import { MAIN_SITE_URL } from "@/lib/url";
import { CONTACT_EMAIL, contactHref } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Private certification cohorts, bespoke cybersecurity, AI and privacy programs, and executive briefings for teams, onsite in Singapore or live online.",
};

const offerings = [
  {
    icon: GraduationCap,
    title: "Private Certification Cohorts",
    description: "Any program in our catalog run exclusively for your team, scheduled around your calendar, with exam preparation and voucher coordination.",
  },
  {
    icon: Wrench,
    title: "Bespoke Programs",
    description: "Training built around your environment, policies and frameworks, combining certification content with your own tools, scenarios and case studies.",
  },
  {
    icon: Presentation,
    title: "Executive & Board Briefings",
    description: "Focused sessions that help leadership understand cyber, AI and privacy risk, regulatory expectations and their governance responsibilities.",
  },
  {
    icon: Users,
    title: "Security & Privacy Awareness",
    description: "Practical awareness programs for all staff on phishing, data handling, responsible AI use and incident reporting.",
  },
];

const formats = [
  { icon: MapPin, title: "Onsite", description: "At your premises in Singapore or across the region." },
  { icon: Monitor, title: "Live Online", description: "Instructor-led virtual classrooms for distributed teams." },
  { icon: Shuffle, title: "Blended", description: "A mix of live sessions, self-paced study and workshops." },
];

const steps = [
  { icon: ClipboardList, title: "Training needs analysis", description: "We review roles, current skills, certification goals and the risks your organisation needs to manage." },
  { icon: Wrench, title: "Program design", description: "We recommend certification paths or design a bespoke curriculum, schedule and assessment approach." },
  { icon: GraduationCap, title: "Delivery", description: "Experienced practitioners deliver the program in the format that suits your team." },
  { icon: LineChart, title: "Assessment & reporting", description: "Participants are assessed against the learning objectives and you receive a summary of attendance and outcomes." },
];

const audiences = [
  "Security, IT and infrastructure teams preparing for certification",
  "Risk, compliance and internal audit functions",
  "Privacy and data protection teams",
  "Leadership teams and boards overseeing cyber and AI risk",
  "Organisations building a security-aware workforce",
];

export default async function CorporateTrainingPage() {
  const vendorGroups = groupByVendor(await getCatalog());
  const enquiryHref = contactHref(MAIN_SITE_URL, "corporate");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.12),transparent_32%),linear-gradient(180deg,rgba(0,123,255,0.07)_0%,rgba(255,255,255,1)_60%)]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl py-14 md:py-20">
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              <Building2 className="h-4 w-4" /> Corporate Training
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
              Training Programs Built Around Your Team
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
              From private certification cohorts to bespoke programs and leadership briefings, we help organisations build
              the cybersecurity, AI governance and privacy capability they need.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={enquiryHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Discuss Your Requirements <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-border bg-background px-8 text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
              >
                Browse the Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-4xl">What We Offer</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {offerings.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-5 rounded-xl border border-[#E5E7EB] p-6 md:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs available */}
        <section className="border-y border-[#F4F4F5] bg-[#F9FAFB] py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">Certification Programs for Teams</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  Every program in our catalog can be delivered as a private cohort for your organisation.
                </p>
              </div>
              <Link href="/vendors" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary hover:underline">
                All vendors <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vendorGroups.map((group) => (
                <Link
                  key={group.slug}
                  href={`/vendors/${group.slug}`}
                  className="group rounded-xl border border-[#E5E7EB] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-bold text-foreground">{group.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      {group.courses.length} {group.courses.length === 1 ? "program" : "programs"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted line-clamp-3">
                    {group.courses.map((c) => c.title.split(" – ")[0]).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery formats + audiences */}
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Delivery Formats</h2>
              <div className="space-y-4">
                {formats.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Who It&apos;s For</h2>
              <ul className="space-y-3">
                {audiences.map((audience) => (
                  <li key={audience} className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] p-5 text-sm font-medium text-foreground">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-[#F4F4F5] bg-[#F9FAFB] py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-4xl">How It Works</h2>
            <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <li key={title} className="rounded-xl border border-[#E5E7EB] bg-white p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-16 text-white md:py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center md:px-8">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">Plan Your Team&apos;s Training</h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
              Tell us about your team, goals and timeline and we will propose a program, schedule and quote.
            </p>
            <a
              href={enquiryHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-white px-8 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-100"
            >
              Request a Proposal <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-6 text-sm text-gray-400">
              Or email <a href={`mailto:${CONTACT_EMAIL}?subject=Corporate%20Training`} className="font-semibold text-white hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
