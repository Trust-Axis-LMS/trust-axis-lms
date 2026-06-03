import type { NextConfig } from "next";

const coursesOrigin =
  process.env.NEXT_PUBLIC_COURSES_SITE_URL ||
  process.env.NEXT_PUBLIC_COURSES_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://train.trustacg.com");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Disable React Compiler in development to drastically reduce HMR memory use/lag
  // Only enable it during production builds where speed/V8 limits don't overlap with IDEs
  reactCompiler: process.env.NODE_ENV === "production" ? true : false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/auth/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: coursesOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ];
  }
};

export default nextConfig;
