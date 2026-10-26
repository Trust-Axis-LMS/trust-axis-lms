import type { MetadataRoute } from "next";
import { MAIN_SITE_URL } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/xp-cms", "/api/", "/profile", "/onboarding"],
    },
    sitemap: `${MAIN_SITE_URL}/sitemap.xml`,
  };
}
