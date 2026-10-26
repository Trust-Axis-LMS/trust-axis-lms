import type { Metadata } from "next";
import "./globals.css";
import { COURSES_SITE_URL } from "@/lib/url";

export const metadata: Metadata = {
  metadataBase: new URL(COURSES_SITE_URL),
  title: "Trust Axis — Course Catalog",
  description:
    "Explore Trust Axis's industry-leading courses in Cybersecurity, Data Science, Business, Cloud Computing, and AI/ML. Download brochures and enroll today.",
  openGraph: {
    siteName: "Trust Axis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
