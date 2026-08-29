import Link from "next/link";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { FaqAccordion } from "@/src/components/seo/FaqAccordion";
import { RelatedLinks } from "@/src/components/seo/RelatedLinks";
import { SeoCta } from "@/src/components/seo/SeoCta";
import { QiblaClient } from "./QiblaClient";
import { CITY_ROUTES } from "@/src/constants/cities";
import { QIBLA_FAQ, QIBLA_HOW_TO_STEPS } from "@/src/constants/qibla";
import {
  KAABA_COORDINATES,
  TR_MAGNETIC_DECLINATION_DEG,
} from "@/src/constants/tools";
import { faqPageJsonLd, howToJsonLd } from "@/src/lib/jsonld";
import {
  buildQiblaReading,
  describeDirection,
  formatBearing,
  formatCoordinate,
  formatDistance,
} from "@/src/lib/qibla-utils";
import { locative } from "@/src/lib/turkish";
import { TEXT } from "@/src/constants/surface";
import { cn } from "@/src/lib/utils";

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Araçlar", path: "/tools" },
  { name: "Kıble Bulucu", path: "/tools/qibla" },
];

const METHODS = [
  {
    title: "Telefonun pusulasıyla",
    lede: "En pratik yol. Konumunu ver, kadran canlı dönsün, Kâbe işareti üstteki oka gelene kadar dön.",
    caveat:
      "Telefon manyetometresi kılıftaki mıknatıstan ve metal yüzeylerden etkilenir; 5–15° şaşabilir.",
  },
  {
    title: "Elle pusulayla",
    lede: `Önce kuzeyi bul, sonra kuzeyden saat yönünde kıble açısı kadar dön. Manyetik pusula kullanıyorsan açıdan yaklaşık ${TR_MAGNETIC_DECLINATION_DEG
      .toFixed(0)
      .replace(".", ",")}° çıkar.`,
    caveat:
      "Pusulayı yere paralel tut; araç içinde, kalorifer ve elektrik panosu yanında ölçme.",
  },
  {
    title: "Yakındaki camiyle",
    lede: "Bir caminin mihrap duvarı ve cemaatin saf tuttuğu yön kıbleyi gösterir. Şehirde en güvenilir doğrulamadır.",
    caveat:
      "Çok eski yapılarda küçük sapmalar olabilir; mümkünse iki farklı camiyle karşılaştır.",
  },
] as const;

const ERROR_SOURCES = [
  {
    source: "İl merkezi yerine cihaz konumu (GPS)",
    size: "0–2°",
    note: "Kâbe ~2.500 km uzakta olduğu için her 40 km kayma ≈ 1° hata.",
  },
  {
    source: "Manyetik sapma (düzeltilmezse)",
    size: "≈6°",
    note: "Türkiye'de manyetik kuzey, coğrafi kuzeyden yaklaşık 6° doğudadır.",
  },
  {
    source: "Telefon manyetometresi",
    size: "5–15°",
    note: "Kalibrasyon, kılıf mıknatısı ve çevredeki metal en büyük hata kaynağıdır.",
  },
  {
    source: "Kâbe koordinatlarının hassasiyeti",
    size: "<0,01°",
    note: "Pratikte ihmal edilebilir.",
  },
] as const;

const CITY_TABLE = CITY_ROUTES.map((city) => {
  const reading = buildQiblaReading(city.latitude, city.longitude);
  return {
    slug: city.slug,
    name: city.city,
    bearing: formatBearing(reading.bearing),
    direction: describeDirection(reading.bearing),
    distance: formatDistance(reading.distanceKm),
  };
}).sort((a, b) => a.name.localeCompare(b.name, "tr"));

const SectionHeading = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <h2 className={cn(TEXT.h3, "m-0")}>{title}</h2>
    <div className="mt-2.5 flex flex-col gap-3 text-[14px] leading-relaxed text-[var(--ng-text-2)]">
      {children}
    </div>
  </section>
);

export default function QiblaContent() {
  return (
    <SeoPageShell
      publicShell
      className="ng-calm"
      breadcrumbs={BREADCRUMBS}
      eyebrow="Kıble bulucu"
      title="Kıble yönünü bul"
      lede="Konumuna göre Kâbe'nin kaç derecede olduğunu hesaplar, cihazın destekliyorsa canlı pusulayla yönü gösterir. Hesap tamamen tarayıcında yapılır; koordinatların hiçbir yere gönderilmez."
      jsonLd={[
        howToJsonLd({
          name: "Kıble yönü nasıl bulunur?",
          description:
            "Konumunu belirleyip kıble açısını okuyarak ve telefonun pusulasıyla eşleştirerek kıble yönünü bulma adımları.",
          path: "/tools/qibla",
          steps: QIBLA_HOW_TO_STEPS,
        }),
        faqPageJsonLd(QIBLA_FAQ),
      ]}
    >
      <QiblaClient />

      <SectionHeading id="how-to-find" title="Kıble nasıl bulunur?">
        <p className="m-0">
          Kıble, bulunduğun noktadan Mekke&apos;deki Kâbe&apos;ye doğru olan
          yöndür. Sabit bir pusula yönü değildir — nerede olduğuna göre değişir.
          Pratikte üç yol kullanılır:
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3">
          {METHODS.map((method) => (
            <li
              key={method.title}
              className="flex h-full flex-col gap-1.5 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] p-4"
            >
              <span className="text-[14px] font-black text-white">
                {method.title}
              </span>
              <span className="text-[13px] leading-snug text-[var(--ng-text-2)]">
                {method.lede}
              </span>
              <span className="mt-auto pt-1.5 text-[11px] font-bold leading-snug text-[var(--ng-text-3)]">
                {method.caveat}
              </span>
            </li>
          ))}
        </ul>
        <ol className="m-0 flex list-none flex-col gap-2 p-0">
          {QIBLA_HOW_TO_STEPS.map((step, index) => (
            <li
              key={step.name}
              className="flex gap-3 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] p-4"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--ng-green)_18%,transparent)] text-[13px] font-black text-[var(--ng-green)]">
                {index + 1}
              </span>
              <span>
                <span className="block text-[14px] font-black text-white">
                  {step.name}
                </span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-[var(--ng-text-2)]">
                  {step.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </SectionHeading>

      <SectionHeading id="how-calculated" title="Kıble yönü nasıl hesaplanır?">
        <p className="m-0">
          Kıble açısı, bulunduğun noktadan Kâbe&apos;ye giden{" "}
          <strong className="font-extrabold text-white">
            büyük çemberin (great circle) başlangıç açısıdır
          </strong>
          . Dünya küre olduğu için düz harita üzerinde cetvelle çizilen çizgi
          yanlış sonuç verir; küre üzerindeki en kısa yol farklı bir yönden
          başlar. Kullanılan formül, iki nokta arasındaki ileri azimut
          (initial bearing) hesabıdır:
        </p>
        <p className="m-0 overflow-x-auto rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-deep)] px-4 py-3 font-mono text-[13px] leading-relaxed text-[var(--ng-green)]">
          θ = atan2( sin(Δλ)·cos(φ₂), cos(φ₁)·sin(φ₂) −
          sin(φ₁)·cos(φ₂)·cos(Δλ) )
        </p>
        <p className="m-0">
          Burada <strong className="font-extrabold text-white">φ₁</strong>{" "}
          senin enlemin,{" "}
          <strong className="font-extrabold text-white">φ₂</strong>{" "}
          Kâbe&apos;nin enlemi,{" "}
          <strong className="font-extrabold text-white">Δλ</strong> ise iki
          boylam arasındaki farktır. Sonuç 0–360° aralığına indirgenir ve
          coğrafi kuzeyden saat yönünde ölçülen kıble açısını verir. Kâbe
          uzaklığı ise aynı iki nokta arasındaki haversine mesafesidir.
        </p>
      </SectionHeading>

      <SectionHeading id="kaaba" title="Kâbe'nin konumu ve koordinatları">
        <p className="m-0">
          Kâbe, Suudi Arabistan&apos;ın Mekke şehrinde, Mescid-i Haram&apos;ın
          ortasında bulunur. Bu sayfadaki bütün hesaplar aşağıdaki iki değere
          dayanır:
        </p>
        <dl className="m-0 grid grid-cols-2 gap-2">
          <div className="rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-4 py-3">
            <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ng-text-3)]">
              Enlem
            </dt>
            <dd className="m-0 mt-1 text-[16px] font-black text-white">
              {formatCoordinate(KAABA_COORDINATES.latitude, "lat")}
            </dd>
          </div>
          <div className="rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] px-4 py-3">
            <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--ng-text-3)]">
              Boylam
            </dt>
            <dd className="m-0 mt-1 text-[16px] font-black text-white">
              {formatCoordinate(KAABA_COORDINATES.longitude, "lon")}
            </dd>
          </div>
        </dl>
      </SectionHeading>

      <SectionHeading id="accuracy" title="GPS ile kıble bulma ve doğruluk">
        <p className="m-0">
          Kıble açısını yanıltan tek şey konum değildir. Aşağıdaki tablo, her
          hata kaynağının pratikte ne kadar sapma ürettiğini gösteriyor —
          görüleceği gibi <strong className="font-extrabold text-white">
            en zayıf halka GPS değil, telefonun pusulasıdır
          </strong>
          .
        </p>
        <div className="overflow-x-auto rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)]">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-[var(--ng-surface-high)]">
                <th className="px-4 py-2.5 font-black text-[var(--ng-text-2)]">
                  Hata kaynağı
                </th>
                <th className="px-4 py-2.5 font-black text-[var(--ng-text-2)]">
                  Tipik sapma
                </th>
              </tr>
            </thead>
            <tbody>
              {ERROR_SOURCES.map((row) => (
                <tr
                  key={row.source}
                  className="border-t-[length:var(--ng-stroke)] border-[var(--ng-edge)] align-top"
                >
                  <td className="px-4 py-3">
                    <span className="block font-extrabold text-white">
                      {row.source}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-[var(--ng-text-3)]">
                      {row.note}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-black text-[var(--ng-gold)]">
                    {row.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="m-0">
          Bu yüzden en güvenilir kullanım şudur: dereceyi buradan oku, pusulayı
          yalnızca kaba yön için kullan ve mümkünse yakındaki bir caminin
          mihrabıyla doğrula.
        </p>
      </SectionHeading>

      <SectionHeading id="privacy" title="Konum izni ve gizliliğin">
        <p className="m-0">
          Kıble açısı tamamen bulunduğun noktaya bağlı olduğu için konum
          bilgisi olmadan hesaplanamaz. Konumu şu şekilde ele alıyoruz:
        </p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {[
            "Konum yalnızca sen 'Konumumu kullan' düğmesine bastığında, tarayıcının izin kutusu üzerinden alınır. Sayfa kendiliğinden konum istemez.",
            "Koordinatlar sunucularımıza gönderilmez, veritabanına yazılmaz, çerezde veya tarayıcı deposunda tutulmaz.",
            "Hesabın tamamı senin cihazında yapılır; sekmeyi kapattığında koordinat silinir.",
            "İzin vermek istemezsen il seçerek devam edebilirsin. Bu durumda yalnızca ilin adı tarayıcında saklanır, koordinat değil.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-2.5 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface-high)] p-3.5 text-[13px] leading-relaxed text-[var(--ng-text-2)]"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ng-green)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="m-0">
          Ayrıntılı bilgi için{" "}
          <Link
            href="/privacy"
            className="font-bold text-[var(--ng-green)] underline underline-offset-2"
          >
            Aydınlatma Metni
          </Link>{" "}
          sayfasındaki &quot;Konum Verileri&quot; bölümüne bakabilirsin.
        </p>
      </SectionHeading>

      <SectionHeading
        id="cities"
        title="Kıble yönü neden şehirden şehre değişir?"
      >
        <p className="m-0">
          Kıble sabit bir pusula yönü değil, bulunduğun noktadan Kâbe&apos;ye
          çizilen yönün açısı olduğu için konum değiştikçe açı da değişir.
          Türkiye&apos;nin batısından bakıldığında Kâbe daha güneydoğuda,
          doğusundan bakıldığında daha güneyde kalır. Aşağıda 81 ilin merkezi
          için hesaplanmış kıble açısı ve Kâbe uzaklığı var.
        </p>
        <div className="max-h-[520px] overflow-auto rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)]">
          <table className="w-full border-collapse text-left text-[13px]">
            <caption className="sr-only">
              81 il için kıble açısı ve Kâbe uzaklığı
            </caption>
            <thead className="sticky top-0 bg-[var(--ng-surface-high)]">
              <tr>
                <th className="px-4 py-2.5 font-black text-[var(--ng-text-2)]">İl</th>
                <th className="px-4 py-2.5 font-black text-[var(--ng-text-2)]">
                  Kıble açısı
                </th>
                <th className="hidden px-4 py-2.5 font-black text-[var(--ng-text-2)] sm:table-cell">
                  Yön
                </th>
                <th className="px-4 py-2.5 font-black text-[var(--ng-text-2)]">
                  Kâbe uzaklığı
                </th>
              </tr>
            </thead>
            <tbody>
              {CITY_TABLE.map((city) => (
                <tr key={city.slug} className="border-t-[length:var(--ng-stroke)] border-[var(--ng-edge)]">
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/prayer-times/${city.slug}`}
                      className="font-extrabold text-white underline-offset-2 hover:text-[var(--ng-green)] hover:underline"
                    >
                      {city.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-black text-[var(--ng-gold)]">
                    {city.bearing}
                  </td>
                  <td className="hidden px-4 py-2.5 text-[var(--ng-text-3)] sm:table-cell">
                    {city.direction}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[var(--ng-text-3)]">
                    {city.distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="m-0 text-[12px] text-[var(--ng-text-3)]">
          Tablodaki değerler il merkezine göredir. {locative("İstanbul")} gibi
          geniş illerde ilçeden ilçeye 1°&apos;ye varan fark olabilir; kesin
          sonuç için yukarıdaki araçta konumunu kullan.
        </p>
      </SectionHeading>

      <section id="faq" className="scroll-mt-24">
        <h2 className={cn(TEXT.h3, "mb-3")}>
          Kıble hakkında sık sorulan sorular
        </h2>
        <FaqAccordion items={QIBLA_FAQ} />
      </section>

      <p className="px-1 text-[12px] leading-relaxed text-[var(--ng-text-3)]">
        Bu sayfadaki dinî açıklamalar bilgilendirme amaçlıdır ve yaygın kabul
        gören görüşleri özetler; fetva niteliği taşımaz. Kendi durumuna özel bir
        tereddüdün varsa bir ilim ehline danışman en doğrusudur.
      </p>

      <RelatedLinks
        title="Bunlar da işine yarayabilir"
        links={[
          {
            href: "/prayer-times",
            label: "Namaz vakitleri",
            description: "81 il için bugünün ve haftanın vakitleri",
          },
          {
            href: "/learn/wudu",
            label: "Abdest rehberi",
            description: "Adım adım, görselli anlatım",
          },
          {
            href: "/duas",
            label: "Namaz duaları",
            description: "Arapçası, okunuşu ve Türkçe anlamı",
          },
          {
            href: "/faq",
            label: "Sıkça sorulan sorular",
            description: "Namazla ilgili 36 sorunun cevabı",
          },
        ]}
      />

      <SeoCta
        title="Kıbleyi buldun, sırada namaz var"
        description="NamazGo ile kıldığın namazları işaretle, seri tut, seviye atla. Ücretsiz, reklamsız ve GPS izni istemeden."
      />
    </SeoPageShell>
  );
}
