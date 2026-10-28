import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { MAIN_SITE_URL } from "@/lib/url";
import { contactHref } from "@/lib/site";
import type { Course } from "@/lib/courses-data";

// ─── Shared layout for vendor and topic landing pages ────────────────────────

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <section className="border-t border-[#F4F4F5] bg-[#F9FAFB] py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#212529] md:text-4xl">
            Need Help Choosing a Program?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[#6C757D] md:text-lg">
            Speak with an enrollment advisor to compare programs and find the best fit for your goals.
          </p>
          <a
            href={contactHref(MAIN_SITE_URL, "enrollment")}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-black px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
          >
            Speak to an Advisor
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Hero({ badge, title, intro, backHref, backLabel, children }: {
  badge: string;
  title: string;
  intro: string;
  backHref: string;
  backLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.12),transparent_32%),linear-gradient(180deg,rgba(0,123,255,0.07)_0%,rgba(255,255,255,1)_60%)]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 md:py-16">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Link>
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{badge}</p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function CourseCollectionPage({ badge, title, intro, courses, website }: {
  badge: string;
  title: string;
  intro: string;
  courses: Course[];
  website?: string;
}) {
  return (
    <PageFrame>
      <Hero badge={badge} title={title} intro={intro} backHref="/" backLabel="All Programs">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Official website <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </Hero>
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">Programs</p>
            <div className="flex-1 border-t border-foreground/10" />
            <span className="text-xs font-semibold text-muted">
              {courses.length} {courses.length === 1 ? "program" : "programs"}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

export interface CollectionLink {
  href: string;
  title: string;
  description: string;
  count: number;
}

export function CollectionIndexPage({ badge, title, intro, links }: {
  badge: string;
  title: string;
  intro: string;
  links: CollectionLink[];
}) {
  return (
    <PageFrame>
      <Hero badge={badge} title={title} intro={intro} backHref="/" backLabel="All Programs" />
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-[0_18px_55px_rgba(33,37,41,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(33,37,41,0.12)]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-tight text-foreground">{link.title}</h2>
                <span className="shrink-0 rounded-sm bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
                  {link.count} {link.count === 1 ? "program" : "programs"}
                </span>
              </div>
              <p className="flex-1 text-sm leading-6 text-muted">{link.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                View programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
