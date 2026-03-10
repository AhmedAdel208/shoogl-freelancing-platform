import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
    typescript: {
    ignoreBuildErrors: true, // ✅ skips TypeScript errors during build
  },
  // eslint: {
  //   ignoreDuringBuilds: true, // ✅ skips ESLint errors too
  // },
  images: {
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "shogol.runasp.net",
        port: "",
        pathname: "/api/File/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);