"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/xp-cms/dashboard", label: "Dashboard", icon: "⬛" },
  { href: "/xp-cms/blogs", label: "Blogs", icon: "📝" },
  { href: "/xp-cms/articles", label: "Articles", icon: "📄" },
  { href: "/xp-cms/whitepapers", label: "Whitepapers", icon: "📋" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/xp-cms/auth/logout", { method: "POST", credentials: "same-origin" });
    router.push("/xp-cms");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "#111",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}>
        {/* Logo area */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "32px", height: "32px",
            background: "#fff",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>
            ✦
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#fff" }}>Trust Axis</p>
            <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>CMS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <p style={{ fontSize: "9px", fontWeight: 800, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", padding: "0 8px", marginBottom: "8px" }}>
            Content
          </p>
          {NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 10px",
                  borderRadius: "8px",
                  marginBottom: "2px",
                  textDecoration: "none",
                  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  transition: "all 0.1s",
                }}
              >
                <span style={{ fontSize: "14px" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "9px 10px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              color: "rgba(255,255,255,0.55)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ⏻ Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
