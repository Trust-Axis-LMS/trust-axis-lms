"use client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentForm } from "@/components/admin/content-form";
export default function NewWhitepaperPage() {
  return <AdminShell><div style={{ padding: "32px 40px", maxWidth: "900px" }}><h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 24px" }}>New Whitepaper</h1><ContentForm type="WHITEPAPER" /></div></AdminShell>;
}
