import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { SeoCta } from "@/src/components/seo/SeoCta";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/src/constants/faq";
import { faqPageJsonLd } from "@/src/lib/jsonld";
import { TEXT } from "@/src/constants/surface";

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Sıkça Sorulan Sorular", path: "/faq" },
];

export default function FaqContent() {
  return (
    <SeoPageShell
      breadcrumbs={BREADCRUMBS}
      eyebrow="Sıkça sorulan sorular"
      title="Namaz hakkında merak edilen her şey"
      lede="Namazın nasıl kılındığından vakitlerin nasıl hesaplandığına, abdestten kıbleye kadar en çok sorulan 36 soruyu topladık. Her cevap kısa, net ve mezhep farkı varsa açıkça belirtilmiş hâlde."
      jsonLd={faqPageJsonLd(FAQ_ITEMS)}
    >
      <nav
        aria-label="Soru başlıkları"
        className="rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] p-4"
      >
        <p className="px-1 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--ng-text-3)]">
          Bu sayfada
        </p>
        <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
          {FAQ_CATEGORIES.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-flex items-center rounded-full border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-white/[0.03] px-3.5 py-2 text-[12px] font-extrabold text-[var(--ng-text-2)] transition-colors hover:border-[rgba(23,217,160,0.35)] hover:text-white"
              >
                {category.title}
                <span className="ml-1.5 text-[var(--ng-text-3)]">
                  {category.items.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {FAQ_CATEGORIES.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <header className="mb-3 px-1">
            <h2 className={TEXT.h3}>
              {category.title}
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--ng-text-2)]">
              {category.description}
            </p>
          </header>
          <FaqAccordion items={category.items} />
        </section>
      ))}

      <p className="px-1 text-[12px] leading-relaxed text-[var(--ng-text-3)]">
        Bu sayfadaki cevaplar bilgilendirme amaçlıdır ve yaygın kabul gören
        görüşleri özetler; fetva niteliği taşımaz. Kendi durumuna özel bir
        tereddüdün varsa bir ilim ehline danışman en doğrusudur. Vakitler
        hakkında ayrıntı için{" "}
        <Link
          href="/prayer-times"
          className="font-bold text-[var(--ng-green)] underline underline-offset-2"
        >
          il bazlı namaz vakitleri
        </Link>{" "}
        sayfalarına bakabilirsin.
      </p>

      <RelatedLinks
        title="Sorunun cevabı burada da olabilir"
        links={[
          {
            href: "/prayer-times",
            label: "Namaz vakitleri",
            description: "81 il için bugünün ve haftanın vakitleri",
          },
          {
            href: "/duas",
            label: "Namaz duaları",
            description: "Arapçası, okunuşu ve Türkçe anlamı",
          },
          {
            href: "/learn/wudu",
            label: "Abdest rehberi",
            description: "Adım adım, görselli anlatım",
          },
          {
            href: "/tools/qibla",
            label: "Kıble bulucu",
            description: "İline göre Kâbe yönü ve derecesi",
          },
        ]}
      />

      <SeoCta
        title="Öğrendiklerini alışkanlığa çevir"
        description="NamazGo ile kıldığın namazları işaretle, seri tut, seviye atla. Ücretsiz ve reklamsız."
      />
    </SeoPageShell>
  );
}
