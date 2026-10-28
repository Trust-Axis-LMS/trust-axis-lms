import type { Metadata } from "next";
import "./globals.css";
import { COURSES_SITE_URL } from "@/lib/url";
import { JsonLd } from "@/components/json-ld";
import { academyJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(COURSES_SITE_URL),
  title: {
    default: "Trust Axis Academy — Cybersecurity Certification Training",
    template: "%s | Trust Axis",
  },
  description:
    "Instructor-led preparation for EC-Council, ISC2, ISACA, IAPP, CSA, Cisco, PeopleCert and PECB certifications, from CISSP and CISM to CEH and CCNA.",
  // "./" resolves to each page's own URL, so every page gets a self-referencing canonical
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Trust Axis Academy",
    type: "website",
    url: "./",
    locale: "en_SG",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={academyJsonLd} />
        {children}
      </body>
    </html>
  );
}
