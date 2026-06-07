import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

const IMAGE_MAX_BYTES = 5 * 1024 * 1024;  // 5 MB
const PDF_MAX_BYTES   = 15 * 1024 * 1024; // 15 MB

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_PDF_TYPES   = ["application/pdf"];

export const runtime = "nodejs"; // need Node for Cloudinary SDK

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const uploadType = (formData.get("uploadType") as string) || "image"; // "image" | "pdf"

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // ── MIME type validation ─────────────────────────────────────────────────────
  const allowedTypes = uploadType === "pdf" ? ALLOWED_PDF_TYPES : ALLOWED_IMAGE_TYPES;
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` },
      { status: 415 }
    );
  }

  // ── Size validation ──────────────────────────────────────────────────────────
  const maxBytes = uploadType === "pdf" ? PDF_MAX_BYTES : IMAGE_MAX_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `File too large. Max size: ${maxBytes / 1024 / 1024}MB` },
      { status: 413 }
    );
  }

  // ── Convert to base64 data URI ───────────────────────────────────────────────
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  // ── Upload to Cloudinary ─────────────────────────────────────────────────────
  try {
    const folder = uploadType === "pdf" ? "whitepapers" : "content-covers";
    const result = await uploadToCloudinary(dataUri, folder, {
      resource_type: uploadType === "pdf" ? "raw" : "image",
    });

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      filename: file.name,
    });
  } catch (e) {
    console.error("[UPLOAD] Cloudinary error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
