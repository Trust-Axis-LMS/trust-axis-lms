import { ImageResponse } from "next/og";
import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card";

export const alt = "Trust Axis Academy — Cybersecurity Certification Training";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    await OgCard({
      eyebrow: "Trust Axis Academy",
      title: "Cybersecurity Certification Training",
      subtitle: "ISC2 · ISACA · EC-Council · IAPP · CSA · Cisco · PeopleCert · PECB",
    }),
    size
  );
}
