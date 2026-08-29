import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { TodayPrayerTimes } from "@/src/components/seo/TodayPrayerTimes";
import { PrayerTimesTable } from "@/src/components/seo/PrayerTimesTable";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { SeoCta } from "@/src/components/seo/SeoCta";
import { nearbyCities, type CityRoute } from "@/src/constants/cities";
import { buildCityFaq, buildCityIntro } from "@/src/lib/city-faq";
import { faqPageJsonLd } from "@/src/lib/jsonld";
import { locative } from "@/src/lib/turkish";
import {
  buildQiblaReading,
  describeDirection,
  formatBearing,
  formatDistance,
} from "@/src/lib/qibla-utils";
import type { PublicPrayerTimes } from "@/src/types/prayer-times.types";

interface CityPrayerTimesContentProps {
  city: CityRoute;
  data: PublicPrayerTimes | null;
}

export default function CityPrayerTimesContent({
  city,
  data,
}: CityPrayerTimesContentProps) {
  const breadcrumbs = [
    { name: "Ana sayfa", path: "/" },
    { name: "Namaz Vakitleri", path: "/prayer-times" },
    { name: city.city, path: `/prayer-times/${city.slug}` },
  ];

  const inCity = locative(city.city);
  const qibla = buildQiblaReading(city.latitude, city.longitude);
  const faq = data ? buildCityFaq(city, data) : [];
  const neighbours = nearbyCities(city, 6);

  return (
    <SeoPageShell
      breadcrumbs={breadcrumbs}
      eyebrow="Namaz vakitleri"
      title={`${city.city} Namaz Vakitleri`}
      lede={
        data
          ? buildCityIntro(city, data)
          : `${city.city} için imsak, güneş, öğle, ikindi, akşam ve yatsı vakitleri. Vakitler şu anda güncellenemedi; birkaç dakika sonra tekrar dener misin?`
      }
      jsonLd={faq.length > 0 ? faqPageJsonLd(faq) : undefined}
    >
      {data ? (
        <>
          <TodayPrayerTimes day={data.today} cityName={city.city} />

          <PrayerTimesTable
            days={data.days}
            todayDate={data.today.date}
            caption={`${city.city} 7 günlük namaz vakitleri`}
          />
        </>
      ) : (
        <section className="rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-5 text-[14px] leading-relaxed text-white/60">
          Namaz vakitleri şu anda getirilemedi. Sayfa saatlik olarak kendini
          yeniler; bu arada{" "}
          <Link
            href="/learn"
            className="font-bold text-[var(--color-primary-light)] underline underline-offset-2"
          >
            rehberlere
          </Link>{" "}
          göz atabilirsin.
        </section>
      )}

      <section className="rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-5">
        <h2 className="text-[17px] font-black leading-tight text-white">
          {city.city} kıble yönü
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/70">
          {inCity} Kâbe&apos;nin yönü, kuzeyden itibaren yaklaşık{" "}
          <strong className="text-white">{formatBearing(qibla.bearing)}</strong>{" "}
          ({describeDirection(qibla.bearing)}) olarak hesaplanır. Kâbe&apos;ye
          kuş uçuşu mesafe yaklaşık{" "}
          <strong className="text-white">
            {formatDistance(qibla.distanceKm)}
          </strong>
          . Yönü telefonunun pusulasıyla birlikte görmek için{" "}
          <Link
            href="/tools/qibla"
            className="font-bold text-[var(--color-primary-light)] underline underline-offset-2"
          >
            kıble bulucuyu
          </Link>{" "}
          kullanabilirsin.
        </p>
      </section>

      {faq.length > 0 && (
        <section id="faq" className="scroll-mt-24">
          <header className="mb-3 px-1">
            <h2 className="text-[21px] font-black leading-tight text-white">
              {city.city} namaz vakitleri hakkında sık sorulanlar
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-white/55">
              Bugünün verisiyle hesaplanmış cevaplar.
            </p>
          </header>
          <FaqAccordion items={faq} />
        </section>
      )}

      <RelatedLinks
        title={`${city.city} çevresindeki iller`}
        links={neighbours.map((neighbour) => ({
          href: `/prayer-times/${neighbour.slug}`,
          label: `${neighbour.city} namaz vakitleri`,
        }))}
      />

      <RelatedLinks
        title="Bunlar da işine yarayabilir"
        links={[
          {
            href: "/prayer-times",
            label: "Tüm iller",
            description: "81 ilin namaz vakitleri listesi",
          },
          {
            href: "/faq",
            label: "Sıkça sorulan sorular",
            description: "Vakitler, abdest, kıble ve daha fazlası",
          },
          {
            href: "/duas",
            label: "Namaz duaları",
            description: "Okunuşu ve Türkçe anlamıyla",
          },
          {
            href: "/learn",
            label: "Adım adım rehberler",
            description: "Abdest, gusül ve beş vakit namaz",
          },
        ]}
      />

      <p className="px-1 text-[12px] leading-relaxed text-white/40">
        Vakitler {city.city} il merkezinin koordinatlarına göre hesaplanır;
        ilçelerde ve rakımı belirgin farklı yerlerde birkaç dakikalık sapma
        görülebilir. Oruç ve namaz gibi hassas konularda bulunduğun yerin resmî
        takvimini esas almanı öneririz.
      </p>

      <SeoCta
        title={`${city.city} vakitlerini cebinde taşı`}
        description="NamazGo hesabı aç, ilini seç; günün vakitlerini geri sayımla gör, kıldığın namazları işaretle ve seri tut."
      />
    </SeoPageShell>
  );
}
