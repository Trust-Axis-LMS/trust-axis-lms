"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";

type ContentType = "BLOG" | "ARTICLE" | "WHITEPAPER";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  category: string | null;
  author: string | null;
  createdAt: string;
  publishedAt: string | null;
}

interface ContentListPageProps {
  type: ContentType;
  label: string;
  newHref: string;
  editHref: (id: string) => string;
}

const STATUS_BADGE: Record<string, React.CSSProperties> = {
  PUBLISHED: { background: "#D1FAE5", color: "#059669", border: "1px solid #A7F3D0" },
  DRAFT: { background: "#FEF3C7", color: "#D97706", border: "1px solid #FDE68A" },
  ARCHIVED: { background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" },
};

export function ContentListPage({ type, label, newHref, editHref }: ContentListPageProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/xp-cms/content?type=${type}`, { credentials: "same-origin" });
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }, [type]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/xp-cms/content/${id}`, { method: "DELETE", credentials: "same-origin" });
    setDeletingId(null);
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
    else alert("Delete failed.");
  }

  async function handleTogglePublish(post: Post) {
    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setTogglingId(post.id);
    const res = await fetch(`/api/xp-cms/content/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
      credentials: "same-origin",
    });
    setTogglingId(null);
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: updated.status } : p)));
    } else {
      alert("Failed to update status.");
    }
  }

  return (
    <AdminShell>
      <div style={{ padding: "32px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{label}s</h1>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>{posts.length} total</p>
          </div>
          <Link
            href={newHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              background: "#111",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            + New {label}
          </Link>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>Loading…</div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>No {label.toLowerCase()}s yet</p>
              <p style={{ fontSize: "13px", color: "#9CA3AF", margin: "0 0 20px" }}>Create your first one to get started.</p>
              <Link href={newHref} style={{ display: "inline-flex", padding: "8px 20px", background: "#111", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
                + New {label}
              </Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {["Title", "Category", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: 600, color: "#111" }}>{post.title}</p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#9CA3AF" }}/>{post.slug}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6B7280" }}>{post.category ?? "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        ...STATUS_BADGE[post.status],
                      }}>
                        {post.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#6B7280", whiteSpace: "nowrap" }}>
                      {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button
                          onClick={() => router.push(editHref(post.id))}
                          style={{ padding: "5px 12px", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", background: "#fff", color: "#374151" }}
                        >
                          Edit
                        </button>
                        <button
                          disabled={togglingId === post.id}
                          onClick={() => handleTogglePublish(post)}
                          style={{
                            padding: "5px 12px",
                            border: "1px solid",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            borderColor: post.status === "PUBLISHED" ? "#FDE68A" : "#A7F3D0",
                            background: post.status === "PUBLISHED" ? "#FEF3C7" : "#D1FAE5",
                            color: post.status === "PUBLISHED" ? "#D97706" : "#059669",
                          }}
                        >
                          {togglingId === post.id ? "…" : post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          disabled={deletingId === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                          style={{ padding: "5px 12px", border: "1px solid #FECACA", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", background: "#FEF2F2", color: "#DC2626" }}
                        >
                          {deletingId === post.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
