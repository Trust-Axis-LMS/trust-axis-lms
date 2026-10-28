import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Old slug for the CSA CCSK course
      { source: "/courses/ccsk", destination: "/courses/csa-ccsk", permanent: true },
      { source: "/courses/ccsk/checkout", destination: "/courses/csa-ccsk/checkout", permanent: true },
      // "APIC", "REST", "EAP" and "SD" were CCNA / CCNP syllabus topics, not separate courses
      { source: "/courses/:slug(apic|rest|enterprise-architecture-practitioner)/:rest*", destination: "/courses/ccna", permanent: true },
      { source: "/courses/software-development-security/:rest*", destination: "/courses/ccnp-encor", permanent: true },
      // Legacy mega-menu links that passed a menu label as the category
      { source: "/", has: [{ type: "query", key: "category", value: "Courses by Vendor" }], destination: "/vendors", permanent: true },
      { source: "/", has: [{ type: "query", key: "category", value: "Courses by Domain" }], destination: "/topics", permanent: true },    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
