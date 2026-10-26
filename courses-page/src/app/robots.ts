import type { MetadataRoute } from "next";
import { COURSES_SITE_URL } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/courses/*/checkout"],
    },
    sitemap: `${COURSES_SITE_URL}/sitemap.xml`,
  };
}
