import Link from "next/link";
import { ArrowRight, Clock3, Monitor, Star, Users } from "lucide-react";
import type { Course } from "@/lib/courses-data";
import { getCourseCategoryMeta } from "@/lib/course-category-meta";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const categoryMeta = getCourseCategoryMeta(course.category);
  const CategoryIcon = categoryMeta.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[0_18px_55px_rgba(33,37,41,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(33,37,41,0.12)]">
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/10 px-5 pb-4 pt-4 text-white md:px-6 md:pb-4 md:pt-4",
          categoryMeta.bandClassName
        )}
      >
        {course.thumbnailUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={course.thumbnailUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_34%)]" />
        <div className="absolute -right-8 top-6 h-24 w-24 rounded-full border border-white/10 bg-white/10" />
        <div className="absolute left-10 top-4 h-16 w-16 rounded-full border border-white/10 bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-white/10 backdrop-blur-sm">
              <CategoryIcon className="h-[1.125rem] w-[1.125rem]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                Category
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-white/95">
                {categoryMeta.shortLabel}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/15 px-3 py-1.5 text-xs font-bold text-white">
            <Star className="h-3.5 w-3.5 fill-current text-white/90" />
            {course.rating}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-[1.35rem]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex rounded-sm bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
            {course.category}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Structured Program
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-foreground md:text-[1.75rem]">
          {course.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {course.subtitle}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-sm border border-border bg-secondary/40 p-3">
            <div className="flex items-center gap-2 text-muted">
              <Clock3 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Duration
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-foreground">
              {course.duration}
            </p>
          </div>

          <div className="rounded-sm border border-border bg-secondary/40 p-3">
            <div className="flex items-center gap-2 text-muted">
              <Monitor className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Mode
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-foreground">
              {course.mode}
            </p>
          </div>

          <div className="rounded-sm border border-border bg-secondary/40 p-3">
            <div className="flex items-center gap-2 text-muted">
              <Users className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Students
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-foreground">
              {course.students}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
