import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/settings/",
        "/profile/",
        "/search",
        "/worship",
        "/verify-otp",
        "/reset-password",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
