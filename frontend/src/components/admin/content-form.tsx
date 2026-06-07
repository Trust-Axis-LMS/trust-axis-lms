"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/components/admin/rich-text-editor").then((m) => m.RichTextEditor),
  { ssr: false, loading: () => <div style={{ minHeight: 500, background: "#F9FAFB", borderRadius: 10, border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>Loading editor…</div> }
);

export type ContentType = "BLOG" | "ARTICLE" | "WHITEPAPER";

interface FormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageId: string;
  pdfUrl: string;
  pdfPublicId: string;
  pdfFilename: string;
  category: string;
  readTime: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
}

interface ContentFormProps {
  type: ContentType;
  postId?: string;
  initial?: Partial<FormValues>;
}

const LABEL: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "6px",
};

const INPUT: React.CSSProperties = {
  width: "100%",
  height: "42px",
  border: "1.5px solid #E5E7EB",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "14px",
  color: "#111",
  boxSizing: "border-box",
  outline: "none",
  background: "#fff",
};

const TEXTAREA: React.CSSProperties = {
  ...INPUT,
  height: "80px",
  padding: "10px 12px",
  resize: "vertical",
  lineHeight: 1.6,
};

export function ContentForm({ type, postId, initial }: ContentFormProps) {
  const router = useRouter();
  const isWhitepaper = type === "WHITEPAPER";
  const isEdit = !!postId;

  const [form, setForm] = useState<FormValues>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    coverImageUrl: initial?.coverImageUrl ?? "",
    coverImageId: initial?.coverImageId ?? "",
    pdfUrl: initial?.pdfUrl ?? "",
    pdfPublicId: initial?.pdfPublicId ?? "",
    pdfFilename: initial?.pdfFilename ?? "",
    category: initial?.category ?? "",
    readTime: initial?.readTime ?? "",
    author: initial?.author ?? "",
    status: (initial?.status as "DRAFT" | "PUBLISHED") ?? "DRAFT",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initial?.coverImageUrl ?? "");
  const [pdfUploading, setPdfUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  function autoSlug(title: string) {
    return title.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "").substring(0, 100);
  }

  function set(field: keyof FormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function uploadCover(file: File) {
    setCoverUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("uploadType", "image");
    const res = await fetch("/api/xp-cms/upload", { method: "POST", body: fd, credentials: "same-origin" });
    setCoverUploading(false);
    if (res.ok) {
      const data = await res.json();
      set("coverImageUrl", data.url);
      set("coverImageId", data.publicId);
      setCoverPreview(data.url);
    } else {
      alert("Cover image upload failed.");
    }
  }

  async function uploadPdf(file: File) {
    setPdfUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("uploadType", "pdf");
    const res = await fetch("/api/xp-cms/upload", { method: "POST", body: fd, credentials: "same-origin" });
    setPdfUploading(false);
    if (res.ok) {
      const data = await res.json();
      set("pdfUrl", data.url);
      set("pdfPublicId", data.publicId);
      set("pdfFilename", file.name);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "PDF upload failed.");
    }
  }

  async function handleSave(saveStatus: "DRAFT" | "PUBLISHED") {
    setSaving(true);
    setError(null);
    const body = { ...form, status: saveStatus, type };
    const url = isEdit ? `/api/xp-cms/content/${postId}` : "/api/xp-cms/content";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "same-origin",
    });
    setSaving(false);
    if (res.ok) {
      const typePath = type.toLowerCase() + "s";
      router.push(`/xp-cms/${typePath}`);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save.");
    }
  }

  return (
    <div>
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#DC2626" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        {/* Title */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={LABEL}>Title *</label>
          <input
            style={{ ...INPUT, fontSize: "18px", height: "52px", fontWeight: 600 }}
            value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit && !form.slug) set("slug", autoSlug(e.target.value)); }}
            placeholder={`Enter ${type.toLowerCase()} title…`}
          />
        </div>

        {/* Slug */}
        <div>
          <label style={LABEL}>Slug (URL)</label>
          <input style={INPUT} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-from-title" />
        </div>

        {/* Category */}
        <div>
          <label style={LABEL}>Category</label>
          <input style={INPUT} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Cybersecurity" />
        </div>

        {/* Author */}
        <div>
          <label style={LABEL}>Author</label>
          <input style={INPUT} value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Author name" />
        </div>

        {/* Read time (not for whitepapers) */}
        {!isWhitepaper && (
          <div>
            <label style={LABEL}>Read Time</label>
            <input style={INPUT} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="e.g. 5 min read" />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div style={{ marginBottom: "16px" }}>
        <label style={LABEL}>Excerpt / Summary</label>
        <textarea style={TEXTAREA as React.CSSProperties} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="A short summary shown in the listing cards…" />
      </div>

      {/* Cover image */}
      <div style={{ marginBottom: "24px" }}>
        <label style={LABEL}>Cover Image {isWhitepaper ? "(Optional)" : ""}</label>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          {coverPreview && (
            <img src={coverPreview} alt="cover" style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #E5E7EB" }} />
          )}
          <div>
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={coverUploading}
              style={{ padding: "8px 16px", background: "#F3F4F6", border: "1.5px dashed #D1D5DB", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#374151" }}
            >
              {coverUploading ? "Uploading…" : coverPreview ? "Change Cover" : "Upload Cover Image"}
            </button>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>JPG, PNG, WEBP — max 5MB</p>
            <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
          </div>
        </div>
      </div>

      {/* PDF upload for whitepapers */}
      {isWhitepaper ? (
        <div style={{ marginBottom: "24px" }}>
          <label style={LABEL}>Whitepaper PDF *</label>
          <div style={{
            border: "2px dashed #D1D5DB",
            borderRadius: 10,
            padding: "24px",
            textAlign: "center",
            background: "#FAFAFA",
          }}>
            {form.pdfUrl ? (
              <div>
                <p style={{ fontSize: 13, color: "#059669", fontWeight: 600, margin: "0 0 8px" }}>✓ {form.pdfFilename || "PDF uploaded"}</p>
                <button type="button" onClick={() => pdfInputRef.current?.click()} style={{ fontSize: 12, color: "#6B7280", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }}>
                  Replace PDF
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 24, margin: "0 0 8px" }}>📋</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", margin: "0 0 4px" }}>
                  {pdfUploading ? "Uploading…" : "Drop PDF here or click to upload"}
                </p>
                <p style={{ fontSize: 11, color: "#9CA3AF", margin: "0 0 12px" }}>PDF only — max 15MB</p>
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  disabled={pdfUploading}
                  style={{ padding: "8px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  {pdfUploading ? "Uploading…" : "Select File"}
                </button>
              </div>
            )}
            <input ref={pdfInputRef} type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPdf(f); e.target.value = ""; }} />
          </div>
        </div>
      ) : (
        /* Rich text editor */
        <div style={{ marginBottom: "24px" }}>
          <label style={LABEL}>Content</label>
          <RichTextEditor content={form.content} onChange={(json) => set("content", json)} />
        </div>
      )}

      {/* Save actions */}
      <div style={{ display: "flex", gap: "12px", paddingTop: "16px", borderTop: "1px solid #E5E7EB" }}>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("DRAFT")}
          style={{ padding: "10px 24px", background: "#F3F4F6", border: "1.5px solid #D1D5DB", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#374151" }}
        >
          {saving ? "Saving…" : "Save as Draft"}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("PUBLISHED")}
          style={{ padding: "10px 24px", background: "#059669", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#fff" }}
        >
          {saving ? "Saving…" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          style={{ marginLeft: "auto", padding: "10px 20px", background: "transparent", border: "none", fontSize: 13, color: "#9CA3AF", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
