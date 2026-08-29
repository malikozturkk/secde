import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { GUIDE_IDS } from "@/src/constants/guides";
import { CITY_ROUTES } from "@/src/constants/cities";
import { DUAS } from "@/src/constants/duas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/learn", priority: 0.9 },
    { path: "/prayer-times", priority: 0.9 },
    { path: "/faq", priority: 0.8 },
    { path: "/duas", priority: 0.8 },
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
    ...CITY_ROUTES.map((city) => ({
      url: `${siteConfig.url}/prayer-times/${city.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...DUAS.map((dua) => ({
      url: `${siteConfig.url}/duas/${dua.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
