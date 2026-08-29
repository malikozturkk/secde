import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { CITY_ROUTES, findCityBySlug } from "@/src/constants/cities";
import { locative } from "@/src/lib/turkish";
import { fetchPublicPrayerTimes } from "@/src/services/public-prayer-times.service";
import CityPrayerTimesContent from "./CityPrayerTimesContent";

export const revalidate = 3600;

export function generateStaticParams() {
  return CITY_ROUTES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const citySlug = findCityBySlug(city);

  if (!citySlug) {
    return { title: "Sayfa Bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${citySlug.city} Namaz Vakitleri`;
  const description = `${citySlug.city} için bugünün ve önümüzdeki 7 günün imsak, güneş, öğle, ikindi, akşam ve yatsı vakitleri. ${locative(
    citySlug.city
  )} kıble yönü ve sık sorulan sorular.`;
  const canonical = `${siteConfig.url}/prayer-times/${citySlug.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default async function CityPrayerTimesPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = findCityBySlug(citySlug);
  if (!city) notFound();

  const data = await fetchPublicPrayerTimes({ city: city.city, days: 7 });

  return <CityPrayerTimesContent city={city} data={data} />;
}
