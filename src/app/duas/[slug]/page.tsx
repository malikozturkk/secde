import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { DUAS, findDuaBySlug } from "@/src/constants/duas";
import DuaContent from "./DuaContent";

export const revalidate = 86400;

export function generateStaticParams() {
  return DUAS.map((dua) => ({ slug: dua.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dua = findDuaBySlug(slug);

  if (!dua) {
    return { title: "Sayfa Bulunamadı", robots: { index: false, follow: false } };
  }

  const canonical = `${siteConfig.url}/duas/${dua.slug}`;

  return {
    title: dua.metaTitle,
    description: dua.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: dua.metaTitle,
      description: dua.metaDescription,
      url: canonical,
    },
    twitter: { title: dua.metaTitle, description: dua.metaDescription },
  };
}

export default async function DuaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dua = findDuaBySlug(slug);
  if (!dua) notFound();

  return <DuaContent dua={dua} />;
}
