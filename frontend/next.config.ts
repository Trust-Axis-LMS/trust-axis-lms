import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Compiler in development to drastically reduce HMR memory use/lag
  // Only enable it during production builds where speed/V8 limits don't overlap with IDEs
  reactCompiler: process.env.NODE_ENV === "production" ? true : false,
};

export default nextConfig;
