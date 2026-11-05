import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/auditability-data", destination: "/alfred#trust", permanent: false }];
  },
};

export default nextConfig;
