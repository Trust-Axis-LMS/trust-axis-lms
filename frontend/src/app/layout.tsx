import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MAIN_SITE_URL } from "@/lib/url";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(MAIN_SITE_URL),
  title: {
    default: "Trust Axis | Cybersecurity, AI & Privacy Advisory",
    template: "%s | Trust Axis",
  },
  description:
    "Trust Axis advises organizations on cybersecurity, AI governance, privacy, cloud and technology risk, banking and ESG, and delivers certification training.",
  // "./" resolves to each page's own URL, so every page gets a self-referencing canonical
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Trust Axis",
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className={cn("antialiased font-sans")} suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
