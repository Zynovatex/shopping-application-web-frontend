import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Whitelist the Firebase Storage host so next/image can optimize these URLs
    domains: [
      "firebasestorage.googleapis.com",
      "firebase-link.com",
      "example.com",
    ],
  },
};

export default nextConfig;
