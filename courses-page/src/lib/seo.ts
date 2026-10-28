import { COURSES_SITE_URL, MAIN_SITE_URL } from "@/lib/url";
import { LEGAL_NAME } from "@/lib/site";
import { topicSlug } from "@/lib/courses-catalog";
import type { Course } from "@/lib/courses-data";

// ─── Search metadata helpers ──────────────────────────────────────────────────

/** Same @id the main site uses, so both domains describe one organisation. */
export const ORGANIZATION_ID = `${MAIN_SITE_URL}/#organization`;

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: LEGAL_NAME,
  url: MAIN_SITE_URL,
  logo: `${MAIN_SITE_URL}/logo.png`,
};

/** Shortens text to a search-snippet length, breaking at a word. */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1)).replace(/[,;:.\s]+$/, "")}…`;
}

/** "ISC2 CISSP – Certified Information…" → "ISC2 CISSP" */
export function shortCourseName(title: string): string {
  return title.split(" – ")[0].trim();
}

export const academyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${COURSES_SITE_URL}/#website`,
      url: COURSES_SITE_URL,
      name: "Trust Axis Academy",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function courseJsonLd(course: Course) {
  const url = `${COURSES_SITE_URL}/courses/${course.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: course.title,
        description: truncate(course.aboutCourse[0] || course.subtitle, 300),
        url,
        provider: organization,
        ...(course.vendor ? { about: `${course.vendor} certification` } : {}),
        ...(course.examDetails[0] ? { educationalCredentialAwarded: course.examDetails[0].name.replace(/ exam.*$/i, "") } : {}),
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["Online", "Blended"],
          ...(course.weeklyHours ? { courseWorkload: course.weeklyHours } : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Academy", item: COURSES_SITE_URL },
          { "@type": "ListItem", position: 2, name: course.category, item: `${COURSES_SITE_URL}/topics/${topicSlug(course.category)}` },
          { "@type": "ListItem", position: 3, name: shortCourseName(course.title), item: url },
        ],
      },
    ],
  };
}
