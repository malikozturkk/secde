import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { GUIDE_IDS } from "@/src/constants/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/learn", priority: 0.9 },
    { path: "/tools", priority: 0.7 },
    { path: "/tools/qibla", priority: 0.6 },
    { path: "/tools/dhikr", priority: 0.6 },
    { path: "/tools/zakat", priority: 0.6 },
    { path: "/login", priority: 0.4 },
    { path: "/register", priority: 0.5 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...GUIDE_IDS.map((id) => ({
      url: `${siteConfig.url}/learn/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
