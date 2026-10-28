import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Trust Axis — Cybersecurity, AI & Privacy Advisory";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    await OgCard({
      eyebrow: "Trust Axis Consulting Group",
      title: "Trusted Advisors for a Complex Digital World",
      subtitle: "Cybersecurity · AI & Technology · Privacy · Cloud Risk · Banking · ESG",
    }),
    size
  );
}
