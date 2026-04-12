import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  openGraph?: Metadata["openGraph"];
}

/**
 * Sayfa bazlı metadata nesnesi oluşturur.
 */
export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
  openGraph,
}: PageMetadataOptions): Metadata {
  const canonical = path ? `${siteConfig.url}${path}` : undefined;

  return {
    title,
    description,

    ...(canonical && {
      alternates: { canonical },
    }),

    ...(noIndex && {
      robots: { index: false, follow: false },
    }),

    openGraph: {
      title,
      description,
      ...(canonical && { url: canonical }),
      ...openGraph,
    },

    twitter: {
      title,
      description,
    },
  };
}

/**
 * Root layout'ta kullanılacak global metadata.
 *
 * Favicon, title template, default OG ayarları vb.
 * tek bir yerde tanımlanır.
 */
export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: siteConfig.defaultTitle,
      template: siteConfig.titleTemplate,
    },

    description: siteConfig.description,

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "android-chrome",
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
        },
        {
          rel: "android-chrome",
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
        },
      ],
    },

    manifest: "/site.webmanifest",

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
      },
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
      },
      description: siteConfig.description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
