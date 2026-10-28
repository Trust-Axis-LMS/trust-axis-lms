import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ─── Shared Open Graph card (1200×630) ────────────────────────────────────────
// Rendered by next/og's ImageResponse, which supports a subset of CSS: every
// element with more than one child needs display:flex. Mirrored in courses-page.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

async function logoDataUrl(): Promise<string> {
  const png = await readFile(join(process.cwd(), "public/logo.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function OgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const logo = await logoDataUrl();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#ffffff",
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={218} height={70} alt="" />
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "#2563eb" }} />
          <div style={{ width: 28, height: 28, background: "#fb923c" }} />
          <div style={{ width: 28, height: 28, background: "#93c5fd" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "#2563eb" }}>
          {eyebrow}
        </div>
        <div style={{ fontSize: title.length > 48 ? 58 : 70, fontWeight: 800, lineHeight: 1.08, color: "#0f172a", maxWidth: 1000 }}>
          {title}
        </div>
        {subtitle ? <div style={{ fontSize: 28, color: "#475569", maxWidth: 1000 }}>{subtitle}</div> : null}
      </div>
    </div>
  );
}
