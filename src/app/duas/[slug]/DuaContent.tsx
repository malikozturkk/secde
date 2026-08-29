import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { DuaText } from "@/src/components/seo/DuaText";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { SeoCta } from "@/src/components/seo/SeoCta";
import { DUAS, type Dua } from "@/src/constants/duas";
import { faqPageJsonLd } from "@/src/lib/jsonld";

export default function DuaContent({ dua }: { dua: Dua }) {
  const breadcrumbs = [
    { name: "Ana sayfa", path: "/" },
    { name: "Namaz Duaları", path: "/duas" },
    { name: dua.shortTitle, path: `/duas/${dua.slug}` },
  ];

  const siblings = DUAS.filter(
    (candidate) =>
      candidate.slug !== dua.slug && candidate.category === dua.category
  ).slice(0, 6);

  return (
    <SeoPageShell
      breadcrumbs={breadcrumbs}
      eyebrow="Namaz duaları"
      title={dua.title}
      lede={dua.lede}
      jsonLd={faqPageJsonLd(dua.faq)}
    >
      <DuaText dua={dua} />

      <section className="rounded-3xl border border-white/[0.06] bg-[#1C2E35] p-5">
        <h2 className="text-[17px] font-black leading-tight text-white">
          Nerede ve ne zaman okunur?
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/70">
          {dua.whenRead}
        </p>
        <ul className="mt-4 flex list-none flex-col gap-2 p-0">
          {dua.notes.map((note) => (
            <li
              key={note}
              className="relative pl-5 text-[13.5px] leading-relaxed text-white/60 before:absolute before:left-0 before:top-0 before:text-[var(--color-primary-light)] before:content-['•']"
            >
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24">
        <header className="mb-3 px-1">
          <h2 className="text-[21px] font-black leading-tight text-white">
            {dua.shortTitle} hakkında sık sorulanlar
          </h2>
        </header>
        <FaqAccordion items={dua.faq} />
      </section>

      {siblings.length > 0 && (
        <RelatedLinks
          title="Sıradaki dualar"
          links={siblings.map((sibling) => ({
            href: `/duas/${sibling.slug}`,
            label: sibling.title,
          }))}
        />
      )}

      <RelatedLinks
        title="Devamı"
        links={[
          {
            href: "/duas",
            label: "Tüm namaz duaları",
            description: "Dualar, tesbihler ve kısa sûreler",
          },
          {
            href: "/learn",
            label: "Namaz rehberleri",
            description: "Duaların namazın neresinde okunduğunu gör",
          },
          {
            href: "/faq",
            label: "Sıkça sorulan sorular",
            description: "Namaz, abdest ve vakitler hakkında",
          },
          {
            href: "/prayer-times",
            label: "Namaz vakitleri",
            description: "İline göre bugünün vakitleri",
          },
        ]}
      />

      <p className="px-1 text-[12px] leading-relaxed text-white/40">
        Metinler bilgilendirme amaçlı derlenmiştir. Telaffuzu doğru öğrenmek için
        bir hocadan veya güvenilir bir sesli kayıttan dinleyerek çalışmanı
        öneririz.
      </p>

      <SeoCta
        title="Ezberi pratikle pekiştir"
        description="NamazGo'nun adım adım rehberlerinde bu duaların namazın neresinde okunduğunu görselleriyle görebilir, kısa quizlerle kendini test edebilirsin."
      />
    </SeoPageShell>
  );
}
