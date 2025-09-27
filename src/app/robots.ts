import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://expo.74ipc.com/sitemap.xml",
    host: "https://expo.74ipc.com",
  };
}
