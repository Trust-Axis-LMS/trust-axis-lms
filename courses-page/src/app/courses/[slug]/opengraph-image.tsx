import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";
import { getCourse } from "@/lib/course-queries";

export const alt = "Trust Axis Academy course";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug).catch(() => null);
  const [name, ...rest] = (course?.title ?? "Certification Training").split(" – ");
  return new ImageResponse(
    await OgCard({
      eyebrow: `Trust Axis Academy${course?.vendor ? ` · ${course.vendor}` : ""}`,
      title: rest.length ? `${name}: ${rest.join(" – ")}` : name,
      subtitle: course?.examDetails[0] ? `${course.examDetails[0].format} · ${course.examDetails[0].duration}` : undefined,
    }),
    size
  );
}
