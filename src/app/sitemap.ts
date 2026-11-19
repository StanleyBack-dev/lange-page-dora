import type { MetadataRoute } from "next";
import { siteUrl } from "@/shared/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  const now = new Date();
  return [
    { url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${url}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
