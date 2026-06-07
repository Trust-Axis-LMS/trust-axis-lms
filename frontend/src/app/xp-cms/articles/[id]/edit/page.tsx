"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentForm } from "@/components/admin/content-form";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [post, setPost] = useState<Record<string, string> | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(({ id: pid }) => {
      setId(pid);
      fetch(`/api/xp-cms/content/${pid}`, { credentials: "same-origin" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => { if (d) setPost(d); else setNotFound(true); });
    });
  }, [params]);

  if (notFound) return <AdminShell><div style={{ padding: 40 }}>Not found.</div></AdminShell>;
  if (!post) return <AdminShell><div style={{ padding: 40, color: "#9CA3AF" }}>Loading…</div></AdminShell>;
  return <AdminShell><div style={{ padding: "32px 40px", maxWidth: "900px" }}><h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 24px" }}>Edit Article</h1><ContentForm type="ARTICLE" postId={id} initial={post} /></div></AdminShell>;
}
