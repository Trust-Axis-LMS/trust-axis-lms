import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Compiler in development to drastically reduce HMR memory use/lag
  // Only enable it during production builds where speed/V8 limits don't overlap with IDEs
  reactCompiler: process.env.NODE_ENV === "production" ? true : false,
  async headers() {
    return [
      {
        source: "/api/auth/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://train.trustacg.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ];
  }
};

export default nextConfig;
