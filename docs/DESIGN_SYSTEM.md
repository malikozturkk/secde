# Tasarım sistemi

Görsel dil: **koyu tema + Duolingo tarzı 3B (kabartma) bileşenler**. Kaynaklar:
`src/app/globals.css`, `src/components/ui/**`, `src/styles/*.css`.

---

## 1. Tailwind v4 kurulumu

- `tailwind.config.js/ts` **yoktur**. Tailwind v4 CSS-first modda çalışır.
- Giriş noktası `src/app/globals.css`:
  ```css
  @import url("...Fredoka+One...Nunito..."); /* Google Fonts */
  @import "../styles/learn.css";
  @import "tailwindcss";
  ```
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

### Layout

`--sidebar-width: 256px` · `--mobile-bar-height: 80px` — `AppLayout` ve `Sidebar` bunlara bağlıdır.

### Katman sırası (z-index)

Üst üste binen her yüzey bu token'lardan birini kullanır. **Bileşen dosyasına ham z-index yazma.**

| Token               | Değer | Kullanan                                    |
| ------------------- | ----- | ------------------------------------------- |
| `--z-cookie-banner` | 100   | `CookieBanner` (alt şerit)                  |
| `--z-modal`         | 200   | `Sheet`, `Dialog`, çerez tercihleri modalı  |
| `--z-consent-gate`  | 300   | `ConsentGateModal` (engelleyici yasal onay) |
| `--z-toast`         | 400   | `Toast` — her zaman en üstte                |

Kullanım: `className="fixed inset-0 z-[var(--z-modal)]"`.

Çerez banner'ı bilinçli olarak **en altta**: sayfanın altına sabitlenmiş pasif bir şerittir ve
bir modal açıldığında onun altında kalmalıdır. Daha önce `z-[9998]` ile `Sheet`'in (`z-[100]`)
çok üstündeydi; bu, quiz'in "Cevabı gönder" butonu gibi alt CTA'ları tıklanamaz yapıyordu.

Banner ayrıca **yer kaplar**: görünürken kendi yüksekliğini `--cookie-banner-offset`
değişkenine yazar, `AppLayout` da `main` yüksekliğini `calc(100vh - offset)` ile daraltır.
Yalnızca alt dolgu vermek yetmiyordu — rehber gibi yüksekliğe sabitlenmiş sayfalarda içerik
zaten taşmadığı için dolgu görünür bir etki yaratmıyor, butonlar banner'ın altında kalıyordu.

> **Not:** Kart tonları ve buton varyantları gibi bazı renkler bileşen dosyalarında
> hardcoded hex olarak durur (örn. kart yüzeyi `#1C2E35`). Yeni bileşen yazarken önce
> token'a bak; token yoksa mevcut bileşenlerdeki değeri tekrar kullan, yeni bir ton uydurma.

---

## 3. Tipografi

| Rol           | Font                         | Tailwind       |
| ------------- | ---------------------------- | -------------- |
| Başlık / sayı | **Fredoka One**              | `font-display` |
| Gövde         | **Nunito** (400/600/700/800) | `font-sans`    |

`body` varsayılanı Nunito'dur.

**Bilinen durum:** Google Fonts iki yerden yüklenir — `src/app/layout.tsx` içindeki `<link>`
etiketleri **ve** `globals.css` başındaki `@import`. `layout.tsx`'teki `<link>` ESLint
`next/no-page-custom-font` uyarısını üretir. Font yükleme stratejisini değiştirecek olursan
(örn. `next/font`) her iki noktayı birden ele al.

---

## 4. UI primitive'leri (`src/components/ui/`)

Paylaşılan bileşenler. Yeni bir buton/kart/dialog yazmadan önce buradakini kullan.

| Bileşen  | Önemli prop'lar                                                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button` | `variant` (12 seçenek), `size: xs\|sm\|md\|lg\|xl`, `icon`, `iconPosition: left\|right\|top\|bottom`                                                                       |
| `Card`   | `tone: plain\|primary\|ice\|violet\|gold\|rose`, `glow`, `padding: none\|sm\|md\|lg`, `as: section\|div\|article`                                                          |
| `Dialog` | `isOpen`, `onClose`, `header`, `maxWidth: sm\|md\|lg\|xl` — açıkken `body` scroll'unu kilitler                                                                             |
| `Input`  | `label`, `error`, `leftIcon`, `suffix` — `useId` ile otomatik `id`/label bağı                                                                                              |
| `Toast`  | `ToastProvider` + `useToast()` → `show/success/error/info/warning/dismiss`                                                                                                 |
| Diğer    | `Select`, `Radio`, `Pill`, `Sheet`, `Tooltip`, `ProgressBar`, `StatTile`, `SkeletonBox`, `CircleButton`, `SpeechBubble`, `Sparkle`, `DatePicker`, `BarChart`, `DonutChart` |

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

## 5. Animasyon

İki yöntem bir arada kullanılır:

| Yöntem               | Ne zaman                                               | Nerede                                                                             |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **CSS `@keyframes`** | Döngüsel/basit efektler (float, pulse, shimmer, shake) | `globals.css`, `styles/learn.css`, `styles/worship.css`                            |
| **framer-motion**    | Orkestrasyon, giriş/çıkış, layout animasyonları        | `Sidebar` (`LayoutGroup`), `Toast` (`AnimatePresence`), dashboard/quiz bileşenleri |

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

Yeni sayfa-özel animasyon eklerken bu ayrımı koru: global olması gerekmiyorsa `globals.css`'i
şişirme.

### Performans kuralı

Animasyonlar `transform` ve `opacity` üzerinden yapılır. `width`, `height`, `top`, `left`,
`margin` animasyonu yapma — mevcut kod bu kurala uyar.

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
