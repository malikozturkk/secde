import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { SeoCta } from "@/src/components/seo/SeoCta";
import {
  DUAS,
  DUA_CATEGORY_LABELS,
  type DuaCategory,
} from "@/src/constants/duas";
import { faqPageJsonLd, itemListJsonLd } from "@/src/lib/jsonld";
import type { FaqEntry } from "@/src/lib/jsonld";
import { TEXT } from "@/src/constants/surface";

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Namaz Duaları", path: "/duas" },
];

const CATEGORY_ORDER: readonly DuaCategory[] = [
  "prayer-dua",
  "tasbih",
  "surah",
];

const HUB_FAQ: readonly FaqEntry[] = [
  {
    question: "Namazda okunan dualar sırasıyla hangileridir?",
    answer:
      "Namaz Sübhâneke ile başlar, ardından Eûzü-Besmele ve Fâtiha okunur, ilk iki rekatta Fâtiha'dan sonra bir zamm-ı sûre eklenir. Rükûda 'Sübhâne rabbiyel-azîm', secdede 'Sübhâne rabbiyel-a'lâ' denir. Oturuşlarda Ettehiyyâtü, son oturuşta ayrıca Allâhümme Salli, Allâhümme Bârik, Rabbenâ Âtinâ ve Rabbenağfirlî okunup selam verilir.",
  },
  {
    question: "Namaz kılmak için en az hangi duaları bilmem gerekir?",
    answer:
      "Asgari olarak Fâtiha sûresi, kısa bir zamm-ı sûre (İhlâs, Kevser veya Asr gibi), Ettehiyyâtü ve rükû-secde tesbihleri gerekir. Sübhâneke, salavatlar ve Rabbenâ duaları sünnettir; bunlar ezberlenene kadar da namaz geçerli olarak kılınabilir.",
  },
  {
    question: "Duaları Türkçe okuyabilir miyim?",
    answer:
      "Namaz içindeki kıraat, çoğunluk görüşüne göre Arapça olarak yapılır; Türkçe meal namazdaki okumanın yerine geçmez. Bununla birlikte anlamı bilmek ezberi kolaylaştırdığı için bu sayfalarda her satırın Türkçe karşılığı da verilmiştir. Namaz dışında istediğin dilde dua edebilirsin.",
  },
  {
    question: "Duaları ezberlemenin en kolay yolu nedir?",
    answer:
      "Duayı satır satır böl, önce Türkçe anlamını öğren, sonra her satırı ayrı ayrı tekrar et ve ancak ardından birleştir. Günde birkaç dakika düzenli tekrar, uzun ama seyrek çalışmalardan daha etkilidir. Ezberlediğin duayı hemen namazda kullanmaya başlaman kalıcılığı belirgin biçimde artırır.",
  },
];

export default function DuasHubContent() {
  return (
    <SeoPageShell
      breadcrumbs={BREADCRUMBS}
      eyebrow="Namaz duaları"
      title="Namaz Duaları: Okunuşu, Arapçası ve Anlamı"
      lede="Namazın başından selamına kadar okunan bütün dualar, tesbihler ve en çok tercih edilen kısa sûreler tek yerde. Her metnin Arapça yazılışı, Latin harfli okunuşu ve Türkçe anlamı satır satır hizalı olarak veriliyor."
      jsonLd={[
        itemListJsonLd(
          DUAS.map((dua) => ({
            name: dua.title,
            path: `/duas/${dua.slug}`,
          })),
          "Namaz duaları ve sûreleri"
        ),
        faqPageJsonLd(HUB_FAQ),
      ]}
    >
      {CATEGORY_ORDER.map((category) => {
        const items = DUAS.filter((dua) => dua.category === category);
        if (items.length === 0) return null;
        const label = DUA_CATEGORY_LABELS[category];

        return (
          <section key={category} id={category} className="scroll-mt-24">
            <header className="mb-3 px-1">
              <h2 className={TEXT.h3}>
                {label.title}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--ng-text-2)]">
                {label.description}
              </p>
            </header>

            <ul className="grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
              {items.map((dua) => (
                <li key={dua.slug}>
                  <Link
                    href={`/duas/${dua.slug}`}
                    className="flex h-full flex-col rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] px-4 py-3.5 transition-colors hover:border-[rgba(23,217,160,0.35)]"
                  >
                    <span className="text-[15px] font-black text-white">
                      {dua.shortTitle}
                    </span>
                    <span className="mt-1 text-[12px] leading-snug text-[var(--ng-text-3)]">
                      {dua.lede}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section id="faq" className="scroll-mt-24">
        <header className="mb-3 px-1">
          <h2 className={TEXT.h3}>
            Namaz duaları hakkında sık sorulanlar
          </h2>
        </header>
        <FaqAccordion items={HUB_FAQ} />
      </section>

      <RelatedLinks
        title="Devamı"
        links={[
          {
            href: "/learn",
            label: "Adım adım namaz rehberleri",
            description: "Duaların namazın neresinde okunduğunu gör",
          },
          {
            href: "/faq",
            label: "Sıkça sorulan sorular",
            description: "Namaz, abdest, kıble ve vakitler",
          },
          {
            href: "/prayer-times",
            label: "Namaz vakitleri",
            description: "81 il için bugünün vakitleri",
          },
          {
            href: "/tools/dhikr",
            label: "Zikirmatik",
            description: "Tesbihatını say, hedefe ulaş",
          },
        ]}
      />

      <SeoCta
        title="Ezberden alışkanlığa"
        description="NamazGo'da rehberleri tamamla, kıldığın namazları işaretle ve seri tut. Ücretsiz ve reklamsız."
      />
    </SeoPageShell>
  );
}
