import type { Metadata } from "next";
import { MAIN_SITE_URL } from "@/lib/url";
import {
  CONTACT_EMAIL, CONTACT_PHONE_HREF, LEGAL_NAME, LINKEDIN_URL, YOUTUBE_URL,
} from "@/lib/site";
import type { TipTapNode } from "@/lib/generate-toc";

// ─── Search metadata helpers ──────────────────────────────────────────────────

export const ORGANIZATION_ID = `${MAIN_SITE_URL}/#organization`;

/** Shortens text to a search-snippet length, breaking at a word. */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1)).replace(/[,;:.\s]+$/, "")}…`;
}

/** First paragraphs of a post body (TipTap JSON or HTML), for posts without an excerpt. */
export function excerptFromContent(content: string | null | undefined): string {
  if (!content) return "";
  try {
    const doc = JSON.parse(content) as TipTapNode;
    const text = (node: TipTapNode): string => node.text ?? (node.content ?? []).map(text).join("");
    return truncate((doc.content ?? []).filter((n) => n.type === "paragraph").map(text).join(" "));
  } catch {
    return truncate(content.replace(/<[^>]+>/g, " "));
  }
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: LEGAL_NAME,
      alternateName: "Trust Axis",
      url: MAIN_SITE_URL,
      logo: `${MAIN_SITE_URL}/logo.png`,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_HREF.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "51 Goldhill Plaza #07-07",
        addressLocality: "Singapore",
        postalCode: "308900",
        addressCountry: "SG",
      },
      founder: { "@type": "Person", name: "Dhruv Panchal" },
      sameAs: [LINKEDIN_URL, YOUTUBE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${MAIN_SITE_URL}/#website`,
      url: MAIN_SITE_URL,
      name: "Trust Axis",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

interface PostSeo {
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImageUrl: string | null;
  author: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
}

export function postMetadata(post: PostSeo, path: string): Metadata {
  const description = post.excerpt || excerptFromContent(post.content) || undefined;
  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description,
      siteName: "Trust Axis",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author ? [post.author] : undefined,
      // A page-level openGraph replaces the inherited site image, so fall back to it explicitly
      images: [post.coverImageUrl ?? "/opengraph-image"],
    },
  };
}

export function articleJsonLd(post: PostSeo, path: string, type: "BlogPosting" | "Article" | "Report") {
  const isTeam = !post.author || /team/i.test(post.author);
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: post.title,
    description: post.excerpt || excerptFromContent(post.content) || undefined,
    url: `${MAIN_SITE_URL}${path}`,
    mainEntityOfPage: `${MAIN_SITE_URL}${path}`,
    image: post.coverImageUrl ?? `${MAIN_SITE_URL}/opengraph-image`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: isTeam
      ? { "@id": ORGANIZATION_ID }
      : { "@type": "Person", name: post.author },
    publisher: { "@id": ORGANIZATION_ID },
  };
}
