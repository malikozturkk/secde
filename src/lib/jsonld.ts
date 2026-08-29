import { siteConfig } from "@/src/config/site";

export type JsonLdObject = Record<string, unknown>;

const absolute = (path: string): string =>
  path.startsWith("http") ? path : `${siteConfig.url}${path}`;

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqPageJsonLd(entries: readonly FaqEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(
  entries: readonly BreadcrumbEntry[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absolute(entry.path),
    })),
  };
}

export function itemListJsonLd(
  entries: readonly BreadcrumbEntry[],
  name: string
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: absolute(entry.path),
    })),
  };
}

export interface ArticleJsonLdOptions {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}

export function articleJsonLd(options: ArticleJsonLdOptions): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    inLanguage: "tr-TR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absolute(options.path),
    },
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    image: absolute(siteConfig.ogImage),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absolute("/android-chrome-512x512.png"),
      },
    },
  };
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/android-chrome-512x512.png"),
    description: siteConfig.description,
    email: "info@namazgo.com",
    areaServed: "TR",
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "tr-TR",
  };
}

export interface HowToStepEntry {
  name: string;
  text: string;
}

export function howToJsonLd(options: {
  name: string;
  description: string;
  path: string;
  steps: readonly HowToStepEntry[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    inLanguage: "tr-TR",
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(options.path) },
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
