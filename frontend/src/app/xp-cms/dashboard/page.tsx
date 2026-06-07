"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import Link from "next/link";

interface Stats {
  total: number;
  published: number;
  drafts: number;
  blogs: number;
  articles: number;
  whitepapers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0, blogs: 0, articles: 0, whitepapers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/xp-cms/content", { credentials: "same-origin" });
        if (res.ok) {
          const posts: Array<{ type: string; status: string }> = await res.json();
          setStats({
            total: posts.length,
            published: posts.filter((p) => p.status === "PUBLISHED").length,
            drafts: posts.filter((p) => p.status === "DRAFT").length,
            blogs: posts.filter((p) => p.type === "BLOG").length,
            articles: posts.filter((p) => p.type === "ARTICLE").length,
            whitepapers: posts.filter((p) => p.type === "WHITEPAPER").length,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Posts", value: stats.total, color: "#6366F1" },
    { label: "Published", value: stats.published, color: "#10B981" },
    { label: "Drafts", value: stats.drafts, color: "#F59E0B" },
    { label: "Blogs", value: stats.blogs, color: "#3B82F6" },
    { label: "Articles", value: stats.articles, color: "#8B5CF6" },
    { label: "Whitepapers", value: stats.whitepapers, color: "#EC4899" },
  ];

  return (
    <AdminShell>
      <div style={{ padding: "32px 40px", maxWidth: "1000px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Dashboard</h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Overview of your content library.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {statCards.map((card) => (
            <div key={card.label} style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              padding: "20px 22px",
              borderLeft: `4px solid ${card.color}`,
            }}>
              <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {card.label}
              </p>
              <p style={{ margin: 0, fontSize: "30px", fontWeight: 800, color: "#111" }}>
                {loading ? "—" : card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Quick Create</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { href: "/xp-cms/blogs/new", label: "New Blog Post", bg: "#3B82F6" },
              { href: "/xp-cms/articles/new", label: "New Article", bg: "#8B5CF6" },
              { href: "/xp-cms/whitepapers/new", label: "New Whitepaper", bg: "#EC4899" },
            ].map((btn) => (
              <Link
                key={btn.href}
                href={btn.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  background: btn.bg,
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                + {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
