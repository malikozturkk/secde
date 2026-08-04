import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { GUIDE_IDS, GUIDE_TITLES, isGuideId } from "@/src/constants/guides";
import GuideClient from "./GuideClient";

export function generateStaticParams() {
  return GUIDE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!isGuideId(id)) {
    return {
      title: "Sayfa Bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const title = `${GUIDE_TITLES[id]} Rehberi`;
  const description = `${GUIDE_TITLES[id]} nasıl yapılır, adım adım öğren. NamazGo interaktif rehberiyle pratik yap.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/learn/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/learn/${id}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isGuideId(id)) notFound();

  return <GuideClient params={params} />;
}
