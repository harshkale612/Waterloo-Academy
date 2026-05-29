import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "placehold.co" },
      // Sponsor logos
      { protocol: "https", hostname: "www.josslin.com" },
      { protocol: "https", hostname: "impactcanopy.ca" },
      { protocol: "https", hostname: "www.barbarian.com" },
      { protocol: "https", hostname: "www.waterloo.ca" },
      { protocol: "https", hostname: "www.kitchener.ca" },
    ],
  },
};

export default nextConfig;
