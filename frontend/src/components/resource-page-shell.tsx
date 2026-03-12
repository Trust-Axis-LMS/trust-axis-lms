import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  FileText,
  Newspaper,
  ScrollText,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ResourceItem = {
  title: string;
  description: string;
  category: string;
  readTime: string;
};

interface ResourcePageShellProps {
  variant: "blogs" | "articles" | "whitepapers";
  badge: string;
  title: string;
  intro: string;
  items: ResourceItem[];
}

const resourceVariants = {
  blogs: {
    icon: BookOpen,
    heroClassName:
      "border-b border-[#F4F4F5] bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.14),transparent_35%),linear-gradient(180deg,rgba(0,123,255,0.07)_0%,rgba(255,255,255,1)_60%)]",
    heroPanelClassName:
      "rounded-[2rem] border border-[#DCE7F7] bg-white/88 p-8 shadow-[0_18px_60px_rgba(0,123,255,0.08)]",
    heroAccentClassName:
      "bg-[linear-gradient(135deg,#212529_0%,#007BFF_100%)] text-white",
    gridClassName: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    cardClassName:
      "overflow-hidden rounded-[1.4rem] border border-[#E5E7EB] bg-white p-0 shadow-[0_14px_36px_-18px_rgba(0,0,0,0.18)]",
    cardBandClassName:
      "h-28 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,#1F2E3F_0%,#007BFF_100%)]",
    ctaLabel: "Read Post",
  },
  articles: {
    icon: Newspaper,
    heroClassName:
      "border-b border-[#E6E8EB] bg-[linear-gradient(180deg,rgba(247,249,252,0.9)_0%,rgba(255,255,255,1)_62%)]",
    heroPanelClassName:
      "grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]",
    heroAccentClassName: "text-[#212529]",
    gridClassName: "grid-cols-1 md:grid-cols-2 xl:grid-cols-2",
    cardClassName:
      "rounded-none border-x-0 border-y border-[#E5E7EB] bg-white p-0 shadow-none",
    cardBandClassName: "hidden",
    ctaLabel: "Read Article",
  },
  whitepapers: {
    icon: ScrollText,
    heroClassName:
      "border-b border-[#111827] bg-[linear-gradient(135deg,#101827_0%,#17365C_55%,#2E7BE8_100%)] text-white",
    heroPanelClassName:
      "rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur",
    heroAccentClassName:
      "bg-white/10 text-white ring-1 ring-white/14 backdrop-blur",
    gridClassName: "grid-cols-1 xl:grid-cols-2",
    cardClassName:
      "overflow-hidden rounded-[1.35rem] border border-[#D9E2F0] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)] p-0 shadow-[0_16px_44px_-18px_rgba(7,33,71,0.22)]",
    cardBandClassName:
      "h-18 bg-[linear-gradient(90deg,#0F172A_0%,#17365C_54%,#2E7BE8_100%)]",
    ctaLabel: "View Summary",
  },
} as const;

export function ResourcePageShell({
  variant,
  badge,
  title,
  intro,
  items,
}: ResourcePageShellProps) {
  const config = resourceVariants[variant];
  const HeroIcon = config.icon;
  const [featuredItem, ...secondaryItems] = items;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className={cn("py-16 md:py-20", config.heroClassName)}>
          <div className="container mx-auto max-w-5xl px-4 md:px-8">
            <Link
              href="/#resources"
              className={cn(
                "mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                variant === "whitepapers"
                  ? "text-white/72 hover:text-white"
                  : "text-[#6C757D] hover:text-[#212529]"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back To Resources
            </Link>

            <div className={config.heroPanelClassName}>
              <Badge
                variant="secondary"
                className={cn(
                  "mb-6 rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                  variant === "whitepapers"
                    ? "border-white/14 bg-white/8 text-white"
                    : "border-[#E5E7EB] bg-white text-[#212529]"
                )}
              >
                <HeroIcon className="mr-2 h-3.5 w-3.5" />
                {badge}
              </Badge>

              <div
                className={cn(
                  "max-w-[820px]",
                  variant === "articles" ? "max-w-none" : ""
                )}
              >
                {variant === "articles" ? (
                  <>
                    <div className="max-w-3xl border-t border-[#DDE3EA] pt-8">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                        Editorial Journal
                      </p>
                      <h1 className="mt-5 max-w-[12ch] text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-[#212529] md:text-[4.25rem]">
                        {title}
                      </h1>
                      <p className="mt-6 max-w-2xl text-base leading-8 text-[#5E6975] md:text-lg">
                        {intro}
                      </p>
                    </div>

                    <div className="grid gap-5 border-t border-[#E5E7EB] pt-8 sm:grid-cols-2 lg:max-w-[760px]">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                          What You Will Find
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#212529]">
                          Long-form analysis on learning design, delivery quality,
                          workforce readiness, and how technical education should be evaluated.
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                          For
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#212529]">
                          Learning leaders, technical managers, and teams comparing
                          serious program options beyond surface-level marketing.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1
                      className={cn(
                        "max-w-[14ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-6xl",
                        variant === "whitepapers" ? "text-white" : "text-[#212529]"
                      )}
                    >
                      {title}
                    </h1>
                    <p
                      className={cn(
                        "mt-6 max-w-3xl text-base leading-8 md:text-lg",
                        variant === "whitepapers"
                          ? "text-white/76"
                          : "text-[#6C757D]"
                      )}
                    >
                      {intro}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]",
                          config.heroAccentClassName
                        )}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {items.length} Featured Pieces
                      </div>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]",
                          variant === "whitepapers"
                            ? "bg-white/10 text-white/88 ring-1 ring-white/14"
                            : "bg-[#F4F4F5] text-[#6C757D]"
                        )}
                      >
                        <Clock3 className="h-3.5 w-3.5" />
                        Updated Library
                      </div>
                    </div>
                  </>
                )}
              </div>

              {variant === "articles" && (
                <div className="self-end lg:justify-self-end">
                  <div className="rounded-[1.5rem] border border-[#DDE3EA] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.18)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                      Issue Notes
                    </p>
                    <div className="mt-6 space-y-5">
                      <div className="border-l-2 border-[#212529] pl-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                          Format
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#212529]">
                          Analytical articles built for deeper decision-making.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#DDE3EA] pl-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                          Reading Time
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#212529]">
                          {items.length} pieces ranging from 8 to 10 minutes.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#DDE3EA] pl-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                          Focus
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#212529]">
                          Program structure, evaluation rigor, and workforce outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-8">
            {variant === "articles" ? (
              <div className="space-y-12">
                {featuredItem && (
                  <Card className="overflow-hidden rounded-[1.75rem] border border-[#DDE3EA] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFCFD_100%)] p-0 shadow-[0_20px_48px_-30px_rgba(0,0,0,0.2)]">
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1.35fr)_320px]">
                      <CardContent className="flex flex-col justify-between p-8 md:p-10">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-3">
                              <span className="rounded-full border border-[#D9DEE5] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#212529]">
                                Featured Article
                              </span>
                              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                                {featuredItem.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-[#6C757D]">
                              <Clock3 className="h-3.5 w-3.5" />
                              {featuredItem.readTime}
                            </div>
                          </div>

                          <h2 className="mt-8 max-w-[15ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#212529] md:text-[3.6rem]">
                            {featuredItem.title}
                          </h2>
                          <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-[#5E6975]">
                            {featuredItem.description}
                          </p>
                        </div>

                        <a
                          href="#"
                          className="mt-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#212529] transition-colors hover:text-[#007BFF]"
                        >
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </CardContent>

                      <div className="border-l border-[#E5E7EB] bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-8 md:p-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                          Article Lens
                        </p>
                        <p className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#212529]">
                          {featuredItem.category}
                        </p>
                        <div className="mt-8 space-y-5">
                          <div className="border-l-2 border-[#212529] pl-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                              Perspective
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[#212529]">
                              Editorial analysis rooted in program quality and applied outcomes.
                            </p>
                          </div>
                          <div className="border-l-2 border-[#DDE3EA] pl-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                              Why It Matters
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[#212529]">
                              Helps teams judge learning options with more rigor before committing time or budget.
                            </p>
                          </div>
                          <div className="rounded-[1.2rem] border border-[#E4E7EB] bg-white p-5 shadow-[0_10px_28px_-24px_rgba(0,0,0,0.18)]">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6C757D]">
                              Editorial Note
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[#212529]">
                              Articles are written to unpack signals that generic course catalogs and marketing copy often hide.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {secondaryItems.length > 0 && (
                  <div className="rounded-[1.5rem] border border-[#E5E7EB] bg-white px-6 py-3 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.18)] md:px-8">
                    <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] py-5">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6C757D]">
                          More Articles
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#5E6975]">
                          Additional reading for teams evaluating curriculum depth,
                          delivery quality, and role-readiness outcomes.
                        </p>
                      </div>
                    </div>

                    {secondaryItems.map((item, index) => (
                      <Card
                        key={item.title}
                        className="rounded-none border-x-0 border-y-0 border-b border-[#E5E7EB] bg-white p-0 shadow-none last:border-b-0"
                      >
                        <CardContent className="px-0 py-7">
                          <div className="grid gap-6 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-start">
                            <div className="text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#C6CFD8] md:text-[2.5rem]">
                              {String(index + 2).padStart(2, "0")}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-sm bg-[#F4F4F5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#212529]">
                                  {item.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-[#6C757D]">
                                  <Clock3 className="h-3.5 w-3.5" />
                                  {item.readTime}
                                </div>
                              </div>

                              <h3 className="mt-5 max-w-[22ch] text-[1.9rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#212529]">
                                {item.title}
                              </h3>
                              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5E6975]">
                                {item.description}
                              </p>
                            </div>

                            <a
                              href="#"
                              className="inline-flex items-center gap-2 self-start pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#212529] transition-colors hover:text-[#007BFF]"
                            >
                              Read
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={cn("grid gap-6", config.gridClassName)}>
                {items.map((item) => (
                  <Card
                    key={item.title}
                    className={config.cardClassName}
                  >
                    {config.cardBandClassName !== "hidden" && (
                      <div className={config.cardBandClassName} />
                    )}
                    <CardContent className="flex h-full flex-col p-6 md:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]",
                            variant === "whitepapers"
                              ? "bg-[#EAF3FF] text-[#17365C]"
                              : "bg-[#F4F4F5] text-[#212529]"
                          )}
                        >
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#6C757D]">
                          <Clock3 className="h-3.5 w-3.5" />
                          {item.readTime}
                        </div>
                      </div>

                      <h2
                        className={cn(
                          "mt-6 text-2xl font-bold leading-tight tracking-tight text-[#212529]",
                          variant === "whitepapers" ? "max-w-[18ch]" : ""
                        )}
                      >
                        {item.title}
                      </h2>
                      <p className="mt-4 flex-1 text-sm leading-7 text-[#6C757D]">
                        {item.description}
                      </p>

                      <a
                        href="#"
                        className={cn(
                          "mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                          variant === "whitepapers"
                            ? "text-[#17365C] hover:text-[#007BFF]"
                            : "text-[#212529] hover:text-[#007BFF]"
                        )}
                      >
                        {config.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
