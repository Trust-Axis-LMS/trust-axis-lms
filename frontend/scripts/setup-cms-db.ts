/**
 * Run this script to create the content_posts table and enums manually.
 * Usage: npx ts-node --project tsconfig.json scripts/setup-cms-db.ts
 * 
 * This avoids using `prisma db push` which conflicts with Supabase's auth schema.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Creating CMS database tables...");

  // Create enums if they don't exist
  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE public."ContentType" AS ENUM ('BLOG', 'ARTICLE', 'WHITEPAPER');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE public."ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);

  // Create content_posts table if not exists
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.content_posts (
      id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      type            public."ContentType" NOT NULL,
      status          public."ContentStatus" NOT NULL DEFAULT 'DRAFT',
      title           TEXT NOT NULL,
      slug            TEXT NOT NULL UNIQUE,
      excerpt         TEXT,
      cover_image_url TEXT,
      cover_image_id  TEXT,
      content         TEXT,
      pdf_url         TEXT,
      pdf_public_id   TEXT,
      pdf_filename    TEXT,
      category        TEXT,
      read_time       TEXT,
      author          TEXT,
      published_at    TIMESTAMPTZ,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // Create updated_at trigger
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TRIGGER update_content_posts_updated_at
        BEFORE UPDATE ON public.content_posts
        FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);

  console.log("✅ CMS tables created successfully!");
  console.log("   - public.ContentType enum");
  console.log("   - public.ContentStatus enum");
  console.log("   - public.content_posts table");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
