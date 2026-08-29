# Tasarım sistemi

Görsel dil: **koyu tema + Duolingo tarzı 3B (kabartma) bileşenler**. Kaynaklar:
`src/app/globals.css`, `src/components/ui/**`, `src/styles/*.css`.

---

## 1. Tailwind v4 kurulumu

- `tailwind.config.js/ts` **yoktur**. Tailwind v4 CSS-first modda çalışır.
- Giriş noktası `src/app/globals.css`:
  ```css
  @import "../styles/learn.css";
  @import "tailwindcss";
  ```
  Fontlar buradan `@import url(...)` ile **yüklenmez**; `next/font` ile bundle'a gömülür
  (bkz. §3).
- PostCSS eklentisi: `@tailwindcss/postcss` (`postcss.config.mjs`).
- Tema `@theme inline { ... }` bloğunda tanımlanır; buradaki her anahtar Tailwind utility'si
  üretir (`bg-surface`, `text-text-muted`, `font-display`, `animate-shake`, ...).

Yeni bir tasarım token'ı gerekiyorsa: `:root` içine CSS değişkenini ekle, ardından utility
olarak kullanılacaksa `@theme inline` içinde eşle.

---

## 2. Token'lar (`:root`)

### Renk

| Değişken                  | Değer                    | Kullanım                           |
| ------------------------- | ------------------------ | ---------------------------------- |
| `--color-primary`         | `#1a7f6e`                | Ana marka rengi, primary buton     |
| `--color-primary-light`   | `#25b49a`                | Vurgu, tema rengi (`themeColor`)   |
| `--color-primary-dark`    | `#0f5048`                | Buton alt gölgesi                  |
| `--color-secondary`       | `#f5a623`                | Ödül / altın                       |
| `--color-secondary-light` | `#ffca6b`                | —                                  |
| `--color-accent`          | `#4fc3f7`                | Su / abdest teması                 |
| `--color-streak`          | `#ff6b35`                | Seri (alev)                        |
| `--color-bg`              | `#070f12`                | Sayfa arka planı (tek tema — koyu) |
| `--color-surface`         | `#1a2b2a`                | Yüzey                              |
| `--color-text`            | `#ffffff`                | Metin                              |
| `--color-text-muted`      | `rgba(255,255,255,0.55)` | İkincil metin                      |
| `--color-border`          | `rgba(255,255,255,0.15)` | Kenarlık                           |

### Radius

`--radius-sm: 12px` · `--radius-md: 16px` · `--radius-lg: 24px` · `--radius-full: 9999px`

### Gölge (3B buton efekti)

| Değişken                          | Değer                                     |
| --------------------------------- | ----------------------------------------- |
| `--shadow-button-primary`         | `0 4px 0px 0px var(--color-primary-dark)` |
| `--shadow-button-primary-pressed` | `0 0px 0px 0px var(--color-primary-dark)` |
| `--shadow-button-ghost`           | `0 4px 0px 0px rgba(255,255,255,0.1)`     |
| `--shadow-button-ghost-pressed`   | `0 0px 0px 0px rgba(255,255,255,0.1)`     |

### Hareket (motion)

| Değişken           | Değer                            | Kullanım                                  |
| ------------------ | -------------------------------- | ----------------------------------------- |
| `--motion-press`   | `120ms`                          | Basma geri bildirimi, renk geçişleri      |
| `--motion-fast`    | `180ms`                          | Küçük yüzey geçişleri                     |
| `--motion-base`    | `240ms`                          | Genel amaçlı                              |
| `--ease-out`       | `cubic-bezier(0.22, 1, 0.36, 1)` | Varsayılan çıkış eğrisi                   |
| `--ease-standard`  | `cubic-bezier(0.4, 0, 0.2, 1)`   | Gidiş-dönüş simetrisi gereken geçişler    |

CSS geçişlerinde **ham `duration-150` / `duration-700` yazma**, bu token'ları kullan.
`transition-all` de kullanma — hangi özelliğin animasyonlanacağını açıkça yaz
(`transition-[transform,box-shadow,filter,opacity]`), aksi halde renk, gölge ve
`filter` aynı eğriyle sürüklenir.

### v2 "canlı" katman — `--ng-*` (proje geneli)

Eski `--color-*` paleti "sönük" bulunduğu için Duolingo diline yakın, doygunluğu yüksek bir
katman kuruldu ve **tüm projeye uygulandı**. `--color-*` token'ları `globals.css`'te hâlâ
tanımlıdır ama **hiçbir bileşen artık onları kullanmaz** — yeni kod yazarken `--ng-*` kullan.

| Aile  | Token                                        | Anlamı                                |
| ----- | -------------------------------------------- | ------------------------------------- |
| Yeşil | `--ng-green` `#17d9a0` / `--ng-green-deep`   | Marka, tamamlandı, onay               |
| Alev  | `--ng-flame` `#ff7a29` / `--ng-flame-deep`   | Seri, "şimdi", aciliyet               |
| Altın | `--ng-gold` `#ffc72c` / `--ng-gold-deep`     | Kaza, ödül, uyarı                     |
| Gök   | `--ng-sky` `#2cc8ff` / `--ng-sky-deep`       | Dondurma, bilgi, su/abdest            |
| Mor   | `--ng-violet` `#a98bff` / `--ng-violet-deep` | XP, yatsı, teravih                    |
| Gül   | `--ng-rose` `#ff5470` / `--ng-rose-deep`     | Hata, kaçırıldı, kilitli              |

Her `-deep` varyantı **yalnızca 3B alt gölge** içindir; metin veya zemin olarak kullanma.

| Yüzey                | Değer                    | Ne zaman                        |
| -------------------- | ------------------------ | ------------------------------- |
| `--ng-canvas`        | `#050c0f`                | Sayfa zemini, sidebar, üst bar  |
| `--ng-surface`       | `#12252d`                | Varsayılan kart                 |
| `--ng-surface-high`  | `#1a333d`                | Kartın üstündeki kart, kayan yüzey |
| `--ng-surface-deep`  | `#081820`                | Girinti (input) + 3B alt gölge  |
| `--ng-edge`          | `rgba(255,255,255,0.13)` | Kenarlık                        |
| `--ng-edge-strong`   | `rgba(255,255,255,0.24)` | Kayan yüzey kenarlığı           |
| `--ng-text` / `-2` / `-3` | `#fff` / `%76` / `%52` | Metin rampası — altına inme  |

Yapı: `--ng-stroke: 2px` · `--ng-stroke-thick: 3px` · `--ng-radius: 20px` ·
`--ng-radius-lg: 28px`. Her renk `@theme inline`'da `--color-ng-*` olarak da eşlendi, yani
`bg-ng-green` / `text-ng-flame` / `border-ng-edge` utility'leri çalışır.

---

### Yükselti merdiveni — `src/constants/surface.ts`

**En önemli kural: katı (blur'suz) gölge "BASILABİLİR" demektir.** Dekorasyon değildir.
Her yüzeye aynı `0_6px_0_0` gölgeyi vermek gölgeyi anlamsızlaştırır ve arayüzü tekdüze yapar
(apple-design §12 "material weight encodes hierarchy", §13 "add feedback only where it earns
its place").

| Seviye              | Kim                                                  | Görsel                                                  |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| `ELEVATION.flat`    | Sayfa içi gruplayıcı                                 | Yalnızca zemin, kenarlık yok, gölge yok                 |
| `ELEVATION.surface` | **Statik** bilgi kartı                               | 2px kenarlık + `--ng-surface`, **gölge YOK**            |
| `ELEVATION.surfaceHigh` | Kartın içindeki kart                             | 2px güçlü kenarlık + `--ng-surface-high`, gölge yok     |
| `ELEVATION.raised`  | **Tıklanabilir** kart                                | 2px kenarlık + **katı** `0_6px_0_0` + basma             |
| `ACCENT[x].fill`    | Buton, çip, vakit düğmesi                            | Renkli dolgu + **katı** `0_5px_0_0` + basma             |
| `ELEVATION.banner`  | Sayfanın en büyük yüzeyi (Hero)                      | 3px kenarlık + **bulanık** `0_22px_50px`, katı gölge YOK |
| `ELEVATION.floating`| Modal, sheet, popover, toast, tooltip                | 2px güçlü kenarlık + **bulanık** `0_24px_60px`          |
| `ELEVATION.inset`   | Input, select, girinti                               | `--ng-surface-deep`, gölge yok                          |

**Katı gölge ile bulanık gölge asla birlikte kullanılmaz.** Katı = "bas beni",
bulanık = "üstte yüzüyorum". Büyük yüzeyler daha kalın okunur (§12): Hero 3px kenarlık +
derin bulanık gölge alır, katı gölge almaz — böylece butonlarla karışmaz.

`PRESS` / `PRESS_SM` basma geçişini, `ACCENT[x].fill/press/text/tintedCard/chip` altı renk
ailesinin varyantlarını verir.

### Tipografi kademesi — `TEXT`

Başlık ve metin sınıflarını bileşene elle yazma; `TEXT` kademesinden al. Boyuta özel tracking
(§15) kademeye gömülüdür — büyük başlık negatif, gövde nötr.

| Anahtar        | Kullanım                                | Ölçü                                   |
| -------------- | --------------------------------------- | -------------------------------------- |
| `TEXT.display` | Landing / `/worship` gibi sayfa kahramanı | `font-display` 38→46px, `-0.04em`      |
| `TEXT.h1`      | Sayfa başlığı (`SeoPageShell`)          | `font-display` 30→38px, `-0.035em`     |
| `TEXT.h2`      | Bölüm başlığı, ayar/auth sayfa başlığı  | `font-display` 24→28px, `-0.03em`      |
| `TEXT.h3`      | Kart başlığı                            | `font-display` 19→21px, `-0.02em`      |
| `TEXT.eyebrow` | Rozet / üst etiket                      | 11px, `font-black`, `+0.16em`, uppercase |
| `TEXT.lede`    | Başlık altı girizgâh                    | 15→16px, `leading-[1.6]`               |
| `TEXT.body`    | Gövde metni                             | 14px, `leading-[1.6]`, `--ng-text-2`   |
| `TEXT.muted`   | Yardımcı / meta metin                   | 12px, `--ng-text-3`                    |
| `TEXT.num`     | Sayaç, süre, istatistik değeri          | `font-display` + `tabular-nums`        |

Girizgâh satır uzunluğu `max-w-[62ch]` ile sınırlanır.

### Kompozisyon yardımcıları

| Sabit          | Ne verir                                                              |
| -------------- | --------------------------------------------------------------------- |
| `SECTION_GAP`  | Sayfa bölümleri arası dikey ritim (`gap-[18px] lg:gap-6`)              |
| `STAT_TILE`    | Jeton görünümlü istatistik kutusu — `--ng-surface-high` + 2px kenarlık |
| `LINK_CARD`    | Hover'da yükselen, yeşil kenarlığa geçen liste/bağlantı kartı          |

### Bölüm kimliği — `ACCENT` ile renk ataması

Bir bölümün her kartına ayrı gradyan yazmak yerine bölüme **tek bir `AccentName`** atanır ve
kart o ailenin `tintedCard` + `press` + `chip` + `text` varyantlarını kullanır. `/tools`
bölümü bu kalıbın referansıdır: `ToolMeta.accent` artık ham sınıf demeti değil, bir
`AccentName` değeridir.

| Araç               | Aksan    | Neden                                                          |
| ------------------ | -------- | -------------------------------------------------------------- |
| Kıble Bulucu       | `sky`    | Yön/pusula. **Yeşil bilinçli olarak boş bırakıldı** — "kıbleye dönüksün" başarı durumunun sinyali odur. |
| Zikirmatik         | `violet` | Tesbihat; eski kahverengi ad-hoc hex'lerin yerini aldı         |
| Zekât Hesaplayıcı  | `gold`   | Hesap/varlık; ödenecek tutar çıkınca kart `green`'e döner      |

**Bir aracın aksanı, o araçtaki durum renginin aynısı olmamalıdır.** Kart da başarı durumu da
yeşilse kullanıcı durum değişimini göremez.

### `.ng-calm` — sakinleştirilmiş kapsam (PİLOT, yalnızca `/tools*`)

Doygun neon aksanlar + 2px kenarlık + katı 3B kart gölgesi bir arada, ibadet uygulamasından
çok arcade paneli gibi okunuyordu. `.ng-calm`, oyunlaştırma iskeletini bozmadan bu sesi kısar.
**Şu an yalnızca `/tools` ve alt sayfalarında** `SeoPageShell`'in `className` prop'u üzerinden
uygulanır; global palet değişmemiştir.

Kapsam yalnızca **token** ezer, bileşen sınıfı değiştirmez:

| Token                            | Global      | `.ng-calm` |
| -------------------------------- | ----------- | ---------- |
| `--ng-green` / `-deep`           | `#17d9a0`   | `#4e9e86`  |
| `--ng-gold` / `-deep`            | `#ffc72c`   | `#c9a24a`  |
| `--ng-violet` / `-deep`          | `#a98bff`   | `#8b7cae`  |
| `--ng-sky` / `--ng-flame` / `--ng-rose` | doygun | kırık ton |
| `--ng-stroke` / `--ng-stroke-thick` | `2px`/`3px` | `1px`/`2px` |
| `--ng-edge` / `--ng-edge-strong` | `.13`/`.24` | `.09`/`.16` |

Ayrıca `.ng-calm h1,h2,h3` ağırlığı `600`'e, tracking'i `-0.015em`'e çeker — `font-black`
başlıklar kapsam içinde otomatik yumuşar.

**Bunun çalışabilmesi için `ACCENT` tonları `color-mix(in srgb, var(--ng-<name>) N%, transparent)`
ile üretilir.** Önceden gradyan ve çip dolguları ham `rgba(23,217,160,0.20)` literalleriydi;
token ezilse bile neon kalıyorlardı. **`ACCENT`'e yeni bir varyant eklerken ham rgba yazma** —
aksi halde kapsamlı temalar sessizce kırılır.

Kapsam içindeki bileşen kuralı: **katı 3B ofset gölge yalnızca `Button`'da kalır.** Kartlar,
panel yüzeyleri ve seçim çipleri gölgesizdir; vurgu kenarlık rengi ve çip ile verilir. Kapsamı
tüm projeye yaymak istenirse sınıf `<body>`'ye taşınır, bileşenlerde değişiklik gerekmez.

**Üç yerleşik kural:**

1. **Kenarlık görünür olmalı.** `border-white/[0.06]` (görünmez) yerine `--ng-edge` + 2px.
2. **3B gölge tam opak ve katı olmalı.** `rgba(...,0.40)` gölgeler sönüklüğün ana kaynağıydı.
3. **`white/35`–`white/55` kullanma.** Rampa üç kademedir; altına inme.

### Layout

`--sidebar-width: 256px` · `--mobile-bar-height: 80px` — `AppLayout` ve `Sidebar` bunlara bağlıdır.

**`AppLayout > main` public kabukta hiçbir eksende kırpmaz.** Oturum içi kabukta `main` kendi
kaydırma kabıdır (`overflow-y-auto overflow-x-hidden` + sabit yükseklik); public kabukta
sayfanın kendisi kaydığı için `overflow-visible` kalır.

Bu ayrım `isGuest` dalının **içinde** yapılmalıdır — taban sınıf listesine `overflow-x-hidden`
yazıp guest dalına `overflow-visible` eklemek işe yaramaz: Tailwind'in üretilen CSS'inde
`.overflow-visible` `.overflow-x-hidden`'dan önce geldiği için `overflow-visible` ölü koda
döner. Üstelik **tek bir eksende `hidden` yeterlidir**: CSS'e göre bir eksen `hidden` ise
diğerinin `visible` değeri `auto`'ya döner, yani `main` yine kırpan bir kaydırma kabı olur.
Bir süre öyleydi; `/tools/qibla`'daki şehir `Select`'inin açılır listesi alttan kesiliyordu.
`absolute` konumlu her açılır yüzey (Select, Tooltip, DatePicker) bu davranışa bağımlıdır.

### Katman sırası (z-index)

Üst üste binen her yüzey bu token'lardan birini kullanır. **Bileşen dosyasına ham z-index yazma.**

| Token               | Değer | Kullanan                                    |
| ------------------- | ----- | ------------------------------------------- |
| `--z-cookie-banner` | 100   | `CookieBanner` (alt şerit)                  |
| `--z-tooltip`       | 150   | `Tooltip`, `Select` listesi, `DatePicker` popover'ı |
| `--z-modal`         | 200   | `Sheet`, `Dialog`, çerez tercihleri modalı  |
| `--z-consent-gate`  | 300   | `ConsentGateModal` (engelleyici yasal onay) |
| `--z-toast`         | 400   | `Toast` — her zaman en üstte                |

Kullanım: `className="fixed inset-0 z-[var(--z-modal)]"`.

`--z-tooltip` bilinçli olarak `--z-modal`'ın **altındadır**: bunlar sayfa içi geçici
yüzeylerdir, bir modal açıldığında onun üstünde kalmamalıdırlar. Daha önce `Tooltip` ham
`z-50`, `Select` ham `z-50`, `DatePicker` ham `z-40` kullanıyordu.

Çerez banner'ı bilinçli olarak **en altta**: sayfanın altına sabitlenmiş pasif bir şerittir ve
bir modal açıldığında onun altında kalmalıdır. Daha önce `z-[9998]` ile `Sheet`'in (`z-[100]`)
çok üstündeydi; bu, quiz'in "Cevabı gönder" butonu gibi alt CTA'ları tıklanamaz yapıyordu.

Banner ayrıca **yer kaplar**: görünürken kendi yüksekliğini `--cookie-banner-offset`
değişkenine yazar, `AppLayout` da `main` yüksekliğini `calc(100vh - offset)` ile daraltır.
Yalnızca alt dolgu vermek yetmiyordu — rehber gibi yüksekliğe sabitlenmiş sayfalarda içerik
zaten taşmadığı için dolgu görünür bir etki yaratmıyor, butonlar banner'ın altında kalıyordu.

> **Not:** Eskiden kart tonları bileşen dosyalarında hardcoded hex olarak duruyordu
> (`#1C2E35`, `#1a2b2a`, `#FF6B35`, `#25B49A` …). Bunların **tamamı** `--ng-*` token'larına
> taşındı; `grep -rn "var(--color-" src --include=*.tsx` artık boş döner. Yeni bir ton
> uydurma — `--ng-*` ailesinden seç.

---

## 3. Tipografi

| Rol           | Font                         | Tailwind       |
| ------------- | ---------------------------- | -------------- |
| Başlık / sayı | **Fredoka** (600)            | `font-display` |
| Gövde         | **Nunito** (400/600/700/800) | `font-sans`    |

`body` varsayılanı Nunito'dur.

> **BİLİNEN SORUN — display fontu Türkçe'yi tam kapsamıyor.** `Fredoka`'nın `latin-ext` alt
> kümesi **`Ş ş Ğ ğ İ` gliflerini içermez** (fontun `cmap` tablosundan doğrulandı). Bu harfleri
> içeren başlıklar fallback zincirine düşer; zincirin sonu `cursive` olduğu için macOS'ta
> Apple Chancery, Windows'ta Comic Sans ile karışık render edilir. `NamazGo` logotipinde bu
> harfler geçmediği için logotip etkilenmez.
>
> Denenen çözümler ve sonuçları:
>
> | Aday | Türkçe | Not |
> | ---- | ------ | --- |
> | **Baloo 2** | tam | Ölçüsel olarak uzak: cap 602/1000 (Fredoka 700), x/cap 0.764 (0.714). Başlıklar şişkin okundu, **geri alındı**. |
> | **Quicksand 600** | tam | Ölçüsel olarak neredeyse birebir: x-yükseklik 503/500, cap 700/700, x/cap 0.719/0.714. En güçlü aday. |
> | **Fredoka One** | eksik | `next/font/google` sunmuyor (paketin `font-data.json`'ında yok); yalnızca self-host edilebilir. |
>
> Bu sorunu çözmeye kalkarsan üç kural: (1) adayın Türkçe kapsamını `cmap`'ten doğrula,
> (2) cap yüksekliği ve x/cap oranını Fredoka ile karşılaştır, (3) fallback zincirinin sonuna
> **asla `cursive`/`fantasy` yazma** — eksik glif sessizce sistemin el yazısı fontuna düşer.
>
> **`layout.tsx` ile `globals.css` birlikte değişir.** Font değişkenini `layout.tsx`'te
> yeniden adlandırıp `globals.css`'i güncellemezsen `--font-display` tanımsız bir değişkene
> bakar ve tüm başlıklar sessizce fallback'e düşer.
>
> **`next/font` değişiklikleri sıcak yenilemede yakalanmaz** — `yarn dev` sürecini yeniden
> başlatmadan ekranda hiçbir şey değişmez.

**Başlık hiyerarşisi.** Her sayfada tam olarak bir `<h1>` olmalıdır. Dashboard/araç bölümlerinde
başlık `SectionHead` (`components/dashboard/parts/SectionHead.tsx`) ile basılır; bileşen
varsayılan olarak `<h2>` üretir ve sayfanın _ilk_ başlığında `as="h1"` verilmelidir. Görsel stil
iki değerde de aynıdır — prop yalnızca semantiği değiştirir.

**Font yükleme:** Her iki font da `src/app/layout.tsx` içinde `next/font/google`
(`Nunito`, `Fredoka`) ile build zamanında indirilip **bundle'a gömülür** ve kendi
origin'imizden servis edilir — çalışma zamanında Google'a hiçbir istek gitmez. Fontlar
`--font-nunito` / `--font-fredoka` CSS değişkenleri olarak `<html>`'e bağlanır; `globals.css`
`@theme inline` bloğu bunları `--font-sans` / `--font-display`'e eşler. Artık ne `<link>`
etiketi ne de `globals.css` içinde `@import url(...)` vardır (bu yüzden
`next/no-page-custom-font` uyarısı da kalktı).

---

## 4. UI primitive'leri (`src/components/ui/`)

Paylaşılan bileşenler. Yeni bir buton/kart/dialog yazmadan önce buradakini kullan.

| Bileşen  | Önemli prop'lar                                                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button` | `variant` (12 seçenek), `size: xs\|sm\|md\|lg\|xl`, `icon`, `iconPosition: left\|right\|top\|bottom`                                                                       |
| `Card`   | `tone: plain\|primary\|ice\|violet\|gold\|rose`, `glow`, `raised`, `padding: none\|sm\|md\|lg`, `as: section\|div\|article`                                            |
| `Dialog` | `isOpen`, `onClose`, `header`, `maxWidth: sm\|md\|lg\|xl` — açıkken `body` scroll'unu kilitler                                                                             |
| `Input`  | `label`, `error`, `leftIcon`, `suffix` — `useId` ile otomatik `id`/label bağı                                                                                              |
| `Toast`  | `ToastProvider` + `useToast()` → `show/success/error/info/warning/dismiss`                                                                                                 |
| Diğer    | `Select`, `Radio`, `Pill`, `Sheet`, `Tooltip`, `ProgressBar`, `StatTile`, `SkeletonBox`, `CircleButton`, `SpeechBubble`, `Sparkle`, `DatePicker`, `BarChart`, `DonutChart` |

`Card` varsayılan olarak **statiktir** (gölgesiz). Tıklanabilir bir kart için `raised`
ver — katı 3B gölge ve basma davranışı yalnızca o zaman gelir (bkz. yükselti merdiveni §2).

### `Button` varyantları

`primary`, `ghost`, `cyan`, `blue`, `lightBlue`, `amber`, `yellow`, `orange`, `rose`,
`indigo`, `emerald`, `gray` (tip: `ButtonVariant`, `src/types/learn.types.ts`).

Her varyant aynı 3B kalıbı izler:

```
bg-<renk>  text-<kontrast>
shadow-[0_6px_0px_<koyu-ton>]        // dinlenme
active:shadow-[0_0px_0px_<koyu-ton>] // basılı
active:translate-y-[4px]             // baseStyles içinde ortak
```

Yeni varyant eklerken bu üçlüyü koru; aksi halde buton "düz" görünür.

### `Toast` kullanımı

```tsx
const toast = useToast();
toast.success("Vakit işaretlendi");
toast.error(mesaj, { duration: 6000 });
```

`ToastProvider` root layout'ta zaten kuruludur; tekrar sarmalama.

---

## 4.5 SEO içerik bileşenleri (`src/components/seo/`)

İçerik sayfalarının (`/faq`, `/prayer-times*`, `/duas*`) kabuğu. Bu üç küme **server
component**tir; `"use client"` eklemek içeriği hidrasyona bağlar ve amacını bozar.

`/learn*` ve `/tools*` de aynı kabuğu kullanır ama **client component**tir (pusula, sayaç,
quiz gibi etkileşim taşırlar) — onlarda kural yalnızca görsel tutarlılıktır, sıfır-JS değil.
Bu sayfalar `SeoPageShell`'e `publicShell` verir; kabuk bunu `AppLayout`'un
`forcePublicShell` prop'una geçirir ve sayfa oturum açıkken de public kabukla açılır
(`CLAUDE.md` §7.6).

| Bileşen             | Görevi                                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| `SeoPageShell`      | `AppLayout` + kırıntı + `h1` + girizgâh, `max-w-[860px]` kap; `BreadcrumbList` şemasını otomatik basar. `publicShell` prop'u kabuğu public'e sabitler |
| `Breadcrumbs`       | Görünür kırıntı; `breadcrumbJsonLd()` ile **aynı** diziden beslenmeli                |
| `JsonLd`            | `<script type="application/ld+json">` — `<` kaçırılır                                |
| `FaqAccordion`      | Native `<details>` akordiyon, sıfır client JS                                        |
| `PrayerTimesTable`  | Haftalık `<table>`; bugünün satırı vurgulu                                           |
| `TodayPrayerTimes`  | Günün 6 vakti, `primary` tonlu kart                                                  |
| `DuaText`           | Arapça (`dir="rtl" lang="ar"`) / okunuş / anlam üçlüsü, satır satır hizalı           |
| `RelatedLinks`      | İç linkleme bloğu — her SEO sayfası en az bir tane içermeli                          |
| `SeoCta`            | Kayıt dönüşüm bloğu, sayfanın sonunda                                                |

Bu bileşenler `Card` ve `Button` primitive'lerini kullanmaz; ikisi de `"use client"` taşır ve
bu sayfaların client JS'siz kalması bilinçli bir tercihtir. Yüzeyleri (`rounded-3xl`,
`border-white/[0.06]`, `bg-[#1C2E35]`) `Card`'ın `plain`/`primary` tonlarıyla görsel olarak
eşleştirilmiştir; `Card` tonları değişirse burayı da güncelle.

---

## 5. Animasyon

Marka dili Duolingo'dur (3B buton, abartılı ödül animasyonu, streak alevi). **Hareket
kalitesi** ise fiziksel/kesintiye uğratılabilir olmayı hedefler: kullanıcının
dokunabildiği her şey **spring** ile hareket eder, süre ile değil.

### Hareket token'ları — `src/constants/motion.ts`

| Token                   | Değer                                     | Ne zaman                                             |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `MOTION_SPRING.ui`      | `bounce: 0`, `visualDuration: 0.35`       | Varsayılan. Dialog, ProgressBar, BarChart, DonutChart |
| `MOTION_SPRING.press`   | `bounce: 0`, `visualDuration: 0.18`       | Tooltip, Select listesi, DatePicker popover'ı        |
| `MOTION_SPRING.surface` | `bounce: 0`, `visualDuration: 0.3`        | `Sheet` paneli                                       |
| `MOTION_SPRING.momentum`| `bounce: 0.2`, `visualDuration: 0.4`      | Yalnızca **jest momentum taşıdığında** — `Toast`     |
| `MOTION_FADE`           | `duration: 0.2, easeOut`                  | Backdrop opaklığı (jestten bağımsız)                 |
| `MOTION_REDUCED`        | `duration: 0.15, easeOut`                 | `useReducedMotion()` dönüşü `true` iken              |
| `projectMomentum(v)`    | `(v/1000) · d/(1−d)`, `d = 0.998`         | Bırakma hızından **duracağı noktayı** kestirmek       |

**Yeni bir spring değeri uydurma.** Varsayılan `bounce: 0`'dır; overshoot yalnızca öncesinde
bir fiske/sürükleme varsa gerekçelidir (`Toast`). Sadece beliren bir menüde overshoot yanlıştır.

Bırakma kararı **konuma değil projeksiyona** bakar:
`offset + projectMomentum(velocity) > eşik`. `Sheet` ve `Toast` bu kalıbı kullanır — kısa ama
hızlı bir fiske de kapatır.

### framer-motion mi, CSS mi?

| Yöntem               | Ne zaman                                                   | Nerede                                                                 |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| **framer-motion**    | Kullanıcının dokunabildiği/kesintiye uğratabildiği her şey | `Sheet`, `Dialog`, `Toast`, `Tooltip`, `Select`, `DatePicker`, `ProgressBar`, `BarChart`, `DonutChart`, `Sidebar` |
| **CSS `transition`** | Basma geri bildirimi, hover, renk — jest taşımayanlar      | `Button`, `CircleButton`, `Radio`, `StatTile`, `Input`, `SpeechBubble` |
| **CSS `@keyframes`** | Döngüsel/dekoratif efektler (float, pulse, shimmer, shake) | `globals.css`, `styles/learn.css`, `styles/worship.css`                |

Jestle sürülen bir şeye **CSS transition/keyframe verme** — uçuş halinde yakalanıp geri
çevrilemez. Spring varsayılan olarak mevcut (ekrandaki) değerden başlar, kesinti tam da bunu
gerektirir.

### Giriş/çıkış simetrisi

Bir yüzey hangi yoldan geldiyse **aynı yoldan gider**. `AnimatePresence` kullanan her
bileşende `initial` ve `exit` aynı nesnedir (`hidden` değişkeni). Açılır yüzeyler
tetikleyicilerine çapalanır: `origin-top` / `origin-bottom` ile `transform-origin`
tetikleyiciye bakar.

### Sürüklenebilir yüzeyler

- **`Sheet`** — tutamacından aşağı sürüklenerek kapanır. `dragElastic={{ top: 0.12 }}` üst
  sınırda kademeli direnç (rubber-band) verir; aşağı serbesttir. Backdrop sürükleme boyunca
  **sürekli** kararır — geri bildirim sonda değil, jest boyunca verilir.
  Sürükleme `dragListener={false}` + `useDragControls()` ile **yalnızca tutamaç/başlık
  bölgesinden** başlar. Panelin tamamına `drag` vermek, kaydırılabilir içerikte parmağı
  içeriye koyan kullanıcının sayfayı kaydırmak yerine sheet'i sürüklemesine yol açıyordu.
  Başlıktaki butonlara basış `closest("button, a, input, …")` ile sürüklemeden muaftır.
- **`Toast`** — sağa kaydırılarak kapanır, sola rubber-band.

`useReducedMotion()` `true` iken **sürükleme kapatılır** ve hareket cross-fade'e iner.

### `@theme inline` ile tanımlı animasyon utility'leri

`animate-shake` · `animate-fade-slide-up` · `animate-pulse-ring` · `animate-check-in` ·
`animate-summary-in` · `animate-row-in`

### Doğrudan class olarak tanımlı olanlar

`animate-float-bounce` · `animate-ring-inner` · `animate-ring-outer` ·
`animate-star-1..4` · `animate-xp-badge` · `wsh-bubble-pulse`

### Sayfa-özel CSS

- `src/styles/learn.css` — `globals.css` içinden import edilir (her sayfada yüklenir)
- `src/styles/worship.css` — yalnızca `app/worship/page.tsx` içinden import edilir
  (`wsh*` önekli keyframe'ler)

Yeni sayfa-özel animasyon eklerken bu ayrımı koru; global olması gerekmiyorsa `globals.css`'i
şişirme.

### `prefers-reduced-motion`

İki katman:

1. **Global CSS bloğu** (`globals.css` sonu) — sonsuz dekoratif döngüleri (`float-bounce`,
   `ring-*`, `star-*`, `xp-badge`, `wsh-bubble-pulse`, `sparkle`, `float-particle`, `nebula`)
   tamamen durdurur; giriş keyframe'lerini `reducedFade` cross-fade'ine indirir.
2. **Bileşen içi `useReducedMotion()`** — framer-motion kullanan her primitive'de. Sürükleme
   kapanır, `y`/`x`/`scale` sıfırlanır, geçiş `MOTION_REDUCED` olur.

Yeni bir animasyonlu bileşen yazarken **ikisinden birini mutlaka** karşıla. Bu, sonsuz
salınımların vestibüler rahatsızlık yarattığı ~0.2 Hz bandı için özellikle önemlidir —
mevcut döngülerin çoğu (2.6–4 sn) tam o bantta.

### Performans kuralı

Animasyonlar **yalnızca** `transform` ve `opacity` üzerinden yapılır. `width`, `height`,
`top`, `left`, `margin` animasyonu yapma.

Bu kural bir süre çiğneniyordu: `ProgressBar` `transition-[width] 700ms`, `BarChart`
`transition-[height] 700ms` kullanıyordu. İkisi de artık `scaleX` / `scaleY` + spring'dir
(`origin-left` / `origin-bottom`).

> **Bilinen ödünleşim:** `scaleX`/`scaleY` `border-radius`'u da ölçekler, bu yüzden
> `ProgressBar`'ın sağ ucu ve `BarChart` çubuklarının üst köşeleri düşük değerlerde hafifçe
> yatık görünür. Bu, `width`/`height` animasyonunun her karede layout tetiklemesine ve
> kesintiye uğratılamamasına karşılık bilinçli olarak kabul edilmiştir.
>
> `DonutChart` istisnadır: SVG yayı `strokeDashoffset` ile çizilir, transform karşılığı
> yoktur. Duration tabanlı geçiş yerine framer-motion spring kullanır — en azından
> kesintiye uğratılabilir.

---

## 6. Duyarlılık (responsive)

- Kırılma noktası olarak ağırlıklı olarak `lg` kullanılır; masaüstü düzeninden mobile geçişte
  `max-lg:` öneki ile override edilir (`AppLayout` örneği).
- `lg` altında: sidebar → alt navigasyon barı, `rightPanel` → ana içeriğin altına akar.
- `env(safe-area-inset-bottom)` mobil alt bar için hesaba katılır.

---

## 7. İskelet (skeleton) ekranları

Spinner yerine shimmer'lı iskelet kullanılır. Örnekler:
`components/ui/SkeletonBox.tsx`, `components/dashboard/parts/Skeleton.tsx`,
`components/worship/Skeleton.tsx`, `app/profile/[username]/ProfileSkeleton.tsx`,
`app/search/page.tsx` içindeki `SearchPageFallback`.

Yeni veri çeken ekran eklerken yükleme, hata ve boş durumların üçünü de karşıla —
`components/worship/states/` (`LoadingState`, `ErrorState`, `EmptyState`, `InfoState`) ve
`components/stats/StatsStates.tsx` bu kalıbın örnekleridir.

---

## 8. İkonlar

```
src/icons/<grup>/*.svg        ←  kaynak (elle düzenlenir)
        │  yarn build:icons  (@svgr/cli, --typescript)
        ▼
src/icons/tsx/<grup>/*.tsx + index.ts   ←  ÜRETİLMİŞ (commit'li, elle düzenlenmez)
```

- Konfigürasyon `.svgrrc`: `{ "dimensions": false }` → üretilen bileşenlerde `width`/`height`
  gömülü olmaz, prop olarak verilir (`<Learn width={48} height={60} />`).
- Gruplar: `sidebar`, `learn` (+`learn/guide`), `general`, `worship` (+`worship/prayer`),
  `mascot`, `dashboard`, `characters` (+`ay`, `ataman`, `nura`, `zeyd`).
- Barrel import: `import { Learn, Worship } from "@/src/icons/tsx/sidebar";`
- Ayrıca `lucide-react` genel amaçlı ikonlar için kullanılır (`X`, `CheckCircle2`, ...).

---

## 9. Karakterler ve maskotlar

`src/icons/characters/` altında dört karakter vardır: **ataman**, **zeyd**, **nura**, **ay**.
Vakitlerle eşleşmeleri `PRAYER_META` (`src/constants/streak.ts`) içinde tanımlıdır; ek olarak
`nura_sitting` varyantı kullanılır (`StreakCharacterName`).

Dashboard kahramanı için karakter havuzu ve konuşma balonu metinleri de aynı dosyadadır
(`STREAK_HERO_CHARACTER_POOL`, `STREAK_HERO_BUBBLES`).
