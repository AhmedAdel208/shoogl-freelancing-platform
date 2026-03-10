import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/app-build-manifest\.json$/],
});

const nextConfig: NextConfig = {
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

export default process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);