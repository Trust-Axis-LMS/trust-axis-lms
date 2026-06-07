import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  slug: z.string().max(200).optional(),
  excerpt: z.string().max(1000).optional().nullable(),
  content: z.string().optional().nullable(),
  coverImageUrl: z.string().optional().nullable(),
  coverImageId: z.string().optional().nullable(),
  pdfUrl: z.string().optional().nullable(),
  pdfPublicId: z.string().optional().nullable(),
  pdfFilename: z.string().optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  readTime: z.string().max(50).optional().nullable(),
  author: z.string().max(200).optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

// ── GET /api/xp-cms/content/[id] ─────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.contentPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

// ── PUT /api/xp-cms/content/[id] ─────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  // If status changes to PUBLISHED, set publishedAt if not already set
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { ...data };
  if (data.status === "PUBLISHED") {
    const existing = await prisma.contentPost.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!existing?.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  const post = await prisma.contentPost.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(post);
}

// ── DELETE /api/xp-cms/content/[id] ──────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const post = await prisma.contentPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Clean up Cloudinary assets
  try {
    if (post.coverImageId) {
      await deleteFromCloudinary(post.coverImageId, "image");
    }
    if (post.pdfPublicId) {
      await deleteFromCloudinary(post.pdfPublicId, "raw");
    }
  } catch (e) {
    console.warn("[ADMIN] Cloudinary cleanup error:", e);
    // Don't fail the delete if Cloudinary cleanup fails
  }

  await prisma.contentPost.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
