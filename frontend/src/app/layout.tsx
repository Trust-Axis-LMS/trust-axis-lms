import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trust Axis | Explore World-Class Programs",
  description: "Discover industry-aligned courses designed by experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased")} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
