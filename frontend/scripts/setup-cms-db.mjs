/**
 * Setup CMS database tables using direct pg connection.
 * Run: node scripts/setup-cms-db.mjs
 */
import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  console.log("Connected to database. Creating CMS tables...");

  await client.query(`
    DO $$ BEGIN
      CREATE TYPE public."ContentType" AS ENUM ('BLOG', 'ARTICLE', 'WHITEPAPER');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
  console.log("✅ ContentType enum");

  await client.query(`
    DO $$ BEGIN
      CREATE TYPE public."ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
  console.log("✅ ContentStatus enum");

  await client.query(`
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
  console.log("✅ content_posts table");

  await client.query(`
    CREATE OR REPLACE FUNCTION public.update_content_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
    $$ language 'plpgsql';
  `);

  await client.query(`
    DO $$ BEGIN
      CREATE TRIGGER trg_content_posts_updated_at
        BEFORE UPDATE ON public.content_posts
        FOR EACH ROW EXECUTE PROCEDURE public.update_content_updated_at();
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `);
  console.log("✅ updated_at trigger");

  console.log("\n🎉 CMS database setup complete!");
  await client.end();
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
