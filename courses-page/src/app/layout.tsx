import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Axis — Course Catalog",
  description:
    "Explore Trust Axis's industry-leading courses in Cybersecurity, Data Science, Business, Cloud Computing, and AI/ML. Download brochures and enroll today.",
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
