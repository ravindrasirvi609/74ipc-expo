import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "getaltd.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.biec.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.indiawood.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.prokerala.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blackpepperindia.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
