import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Helper to generate a URL-safe slug from a title
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .substring(0, 100);
}

const createSchema = z.object({
  type: z.enum(["BLOG", "ARTICLE", "WHITEPAPER"]),
  title: z.string().min(1).max(500),
  slug: z.string().optional(),
  excerpt: z.string().max(1000).optional(),
  content: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  coverImageId: z.string().optional(),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  pdfPublicId: z.string().optional(),
  pdfFilename: z.string().optional(),
  category: z.string().max(100).optional(),
  readTime: z.string().max(50).optional(),
  author: z.string().max(200).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

// ── GET /api/xp-cms/content — list all content ────────────────────────────────
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "BLOG" | "ARTICLE" | "WHITEPAPER" | null;
  const status = searchParams.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED" | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (type) where.type = type;
  if (status) where.status = status;

  const posts = await prisma.contentPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      status: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImageUrl: true,
      category: true,
      readTime: true,
      author: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(posts);
}

// ── POST /api/xp-cms/content — create new post ────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const slug = data.slug?.trim() || slugify(data.title);

  // Ensure slug uniqueness
  const existing = await prisma.contentPost.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists. Choose a different one." }, { status: 409 });
  }

  const post = await prisma.contentPost.create({
    data: {
      type: data.type,
      title: data.title,
      slug,
      excerpt: data.excerpt ?? null,
      content: data.content ?? null,
      coverImageUrl: data.coverImageUrl || null,
      coverImageId: data.coverImageId ?? null,
      pdfUrl: data.pdfUrl || null,
      pdfPublicId: data.pdfPublicId ?? null,
      pdfFilename: data.pdfFilename ?? null,
      category: data.category ?? null,
      readTime: data.readTime ?? null,
      author: data.author ?? null,
      status: data.status ?? "DRAFT",
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
