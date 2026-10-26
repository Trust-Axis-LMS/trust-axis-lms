import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MAIN_SITE_URL } from "@/lib/url";

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
  title: "Trust Axis | Explore World-Class Programs",
  description: "Discover industry-aligned courses designed by experts.",
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className={cn("antialiased font-sans")} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
