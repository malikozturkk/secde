import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { SeoCta } from "@/src/components/seo/SeoCta";
import { CITY_ROUTES, FEATURED_CITIES } from "@/src/constants/cities";
import { faqPageJsonLd, itemListJsonLd } from "@/src/lib/jsonld";
import type { FaqEntry } from "@/src/lib/jsonld";
import { TEXT } from "@/src/constants/surface";

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Namaz Vakitleri", path: "/prayer-times" },
];

const HUB_FAQ: readonly FaqEntry[] = [
  {
    question: "Namaz vakitleri her il için neden farklı?",
    answer:
      "Namaz vakitleri güneşin o noktadaki konumuna göre hesaplanır. Doğudaki iller güneşi daha erken gördüğü için vakitleri daha erken girer, kuzey-güney farkı ise gündüz uzunluğunu değiştirir. Türkiye'nin doğusu ile batısı arasında bir saati aşan farklar oluşabilir; bu yüzden kendi ilinin sayfasına bakman gerekir.",
  },
  {
    question: "Bu sayfadaki vakitler ne sıklıkla güncelleniyor?",
    answer:
      "İl sayfaları günün vakitlerini ve önümüzdeki yedi günün takvimini gösterir; veriler saatlik olarak yenilenir. Vakitler o ilin merkez koordinatına ve saat dilimine göre, Türkiye için kullanılan standart hesaplama yöntemiyle bulunur.",
  },
  {
    question: "İmsak, güneş, öğle, ikindi, akşam ve yatsı ne anlama geliyor?",
    answer:
      "İmsak sabah namazının ilk vaktidir ve oruçta yeme içmenin bittiği andır. Güneş, sabah namazı vaktinin bittiği doğuş anıdır. Öğle güneşin tepe noktasını geçmesiyle, ikindi gölge belirli bir orana ulaştığında, akşam güneşin batmasıyla, yatsı ise şafağın kaybolmasıyla girer.",
  },
  {
    question: "Mezhebime göre vakitler değişir mi?",
    answer:
      "Evet, en belirgin fark ikindi vaktindedir. Şâfiî, Mâlikî ve Hanbelî mezheplerinde gölge cismin boyuna eşitlendiğinde ikindi girerken, Hanefî mezhebindeki yaygın görüşe göre gölge iki katına ulaştığında girer. Bu, ikindiyi genelde bir saate yakın geciktirir. NamazGo hesabında mezhebini seçtiğinde vakitler ona göre hesaplanır.",
  },
  {
    question: "Vakitler resmî takvimle birebir aynı mı?",
    answer:
      "Hesaplama yöntemi aynı olsa da il merkezi koordinatı, rakım ve ilçe konumu nedeniyle birkaç dakikalık sapmalar görülebilir. Günlük kullanım için yeterlidir; oruç açma ve imsak gibi hassas anlarda bulunduğun yerin resmî takvimini esas almanı öneririz.",
  },
];

export default function PrayerTimesHubContent() {
  const alphabetical = [...CITY_ROUTES].sort((a, b) =>
    a.city.localeCompare(b.city, "tr")
  );

  return (
    <SeoPageShell
      breadcrumbs={BREADCRUMBS}
      eyebrow="Türkiye · 81 il"
      title="Namaz Vakitleri"
      lede="İlini seç; bugünün imsak, güneş, öğle, ikindi, akşam ve yatsı vakitlerini, önümüzdeki yedi günün takvimini ve o ile göre kıble yönünü tek sayfada gör. Üyelik gerekmiyor."
      jsonLd={[
        itemListJsonLd(
          alphabetical.map((city) => ({
            name: `${city.city} Namaz Vakitleri`,
            path: `/prayer-times/${city.slug}`,
          })),
          "Türkiye illeri namaz vakitleri"
        ),
        faqPageJsonLd(HUB_FAQ),
      ]}
    >
      <section>
        <h2 className="mb-3 px-1 text-[19px] font-black leading-tight text-white">
          En çok bakılan iller
        </h2>
        <ul className="grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3">
          {FEATURED_CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/prayer-times/${city.slug}`}
                className="block rounded-[var(--ng-radius)] border border-[rgba(23,217,160,0.22)] bg-gradient-to-br from-[rgba(23,217,160,0.12)] to-[var(--ng-surface)] to-70% px-4 py-3.5 transition-colors hover:border-[rgba(23,217,160,0.5)]"
              >
                <span className="block text-[15px] font-black text-white">
                  {city.city}
                </span>
                <span className="mt-0.5 block text-[11px] font-bold text-[var(--ng-text-3)]">
                  Namaz vakitleri
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 px-1 text-[19px] font-black leading-tight text-white">
          Tüm iller (A–Z)
        </h2>
        <ul className="grid list-none grid-cols-2 gap-1.5 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {alphabetical.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/prayer-times/${city.slug}`}
                className="block rounded-xl border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-white/[0.02] px-3 py-2.5 text-[13px] font-extrabold text-[var(--ng-text-2)] transition-colors hover:border-[rgba(23,217,160,0.35)] hover:text-white"
              >
                {city.city}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24">
        <header className="mb-3 px-1">
          <h2 className={TEXT.h3}>
            Namaz vakitleri hakkında sık sorulanlar
          </h2>
        </header>
        <FaqAccordion items={HUB_FAQ} />
      </section>

      <RelatedLinks
        title="Devamı"
        links={[
          {
            href: "/faq",
            label: "Sıkça sorulan sorular",
            description: "Namaz, abdest ve kıble hakkında 36 soru",
          },
          {
            href: "/duas",
            label: "Namaz duaları",
            description: "Sübhâneke, Ettehiyyâtü ve diğerleri",
          },
          {
            href: "/learn",
            label: "Namaz rehberleri",
            description: "Beş vakit namaz adım adım",
          },
          {
            href: "/tools/qibla",
            label: "Kıble bulucu",
            description: "İline göre Kâbe yönü",
          },
        ]}
      />

      <SeoCta
        title="Vakti kaçırma, seriyi bozma"
        description="İlini bir kez seç; NamazGo günün vakitlerini geri sayımla göstersin, kıldığın namazları işaretleyip seri tutmanı sağlasın."
      />
    </SeoPageShell>
  );
}
