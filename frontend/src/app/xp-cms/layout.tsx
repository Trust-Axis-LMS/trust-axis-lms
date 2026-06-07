import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Trust Axis",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#F9FAFB" }}>
      {children}
    </div>
  );
}
