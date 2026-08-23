# CLAUDE.md — NamazGo (repo: `secde`)

Bu dosya, kod tabanında çalışan yapay zekâ agentları (Claude Code, Cursor, ChatGPT, Gemini vb.)
için **tek kaynak referanstır**. Buradaki her madde kod tabanından doğrulanmıştır.

> Detaylı konular ayrı dosyalarda: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) ·
> [docs/API.md](docs/API.md) · [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) ·
> [docs/DOMAIN.md](docs/DOMAIN.md) · [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)

---

## 0. Her görevde uygulanacak kurallar (ZORUNLU)

Bu bölüm istisnasız her görev için geçerlidir. Detaylı protokol ve kontrol listeleri:
**[docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)**

### 0.1 İşe başlamadan önce — OKU

1. **Bu dosyayı (CLAUDE.md) baştan sona oku.** Özet geçme.
2. Görevin dokunduğu alana ait dokümanı **da** oku (aşağıdaki tablo).
3. Dokümanda yazan bir bilgiyi kullanmadan önce **kodda doğrula.** Dokümanlar yazıldığı
   andaki gerçeği yansıtır; kod ile çeliştiğinde **kod kazanır** ve dokümanı düzeltmek
   senin işindir.
4. Aynı işi yapan mevcut bir bileşen/hook/util var mı diye bak. Varsa yenisini yazma.

| Görev şunu içeriyorsa                                  | Önce oku                                         |
| ------------------------------------------------------ | ------------------------------------------------ |
| Veri çekme, hook, auth, consent, route, provider       | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)     |
| Yeni/değişen backend çağrısı, payload, hata kodu       | [docs/API.md](docs/API.md)                       |
| Bileşen, stil, renk, animasyon, ikon                   | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)   |
| Namaz/vakit/seri/quiz/rehber mantığı, Türkçe metin     | [docs/DOMAIN.md](docs/DOMAIN.md)                 |
| Görev döngüsü, senkronizasyon matrisi, kontrol listesi | [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) |

### 0.2 İş sırasında — UY

5. Veri akışı **her zaman** `service → hook → component`. Bileşende doğrudan axios/fetch
   veya veri çeken `useEffect` yok.
6. `any` yok. Sabit kümeler için `src/types/enums/**` enum'larını kullan.
7. Kullanıcıya görünen her metin **Türkçe** ve hardcoded (i18n katmanı yok).
8. Renk/radius/gölge hardcode etme — `globals.css` token'larını kullan, class birleştirmede `cn()`.
9. Üretilmiş dosyaları elle düzenleme: `src/icons/tsx/**`, `.next/`, `yarn.lock`,
   `next-env.d.ts`.
10. **Kapsam dışına çıkma.** İstenmeyen refactor, "yol üstü temizlik", format değişikliği yapma.
    Gördüğün ilgisiz sorunu düzeltme — raporla.
11. **Yeni bağımlılık ekleme.** Gerekli olduğunu düşünüyorsan önce sor.
12. Yeni sayfa eklerken `metadata` ekle; oturum arkasındaki sayfalarda `noIndex: true`.

### 0.3 İşi bitirmeden önce — GÜNCELLE

13. **Doküman senkronizasyonu zorunludur.** Aşağıdaki tabloda karşılığı olan bir değişiklik
    yaptıysan ilgili dokümanı **aynı görev içinde** güncelle. Kod değişip doküman değişmediyse
    iş **bitmemiştir**. (Genişletilmiş matris: `docs/AGENT_WORKFLOW.md` §3)
14. Dokümana **yalnızca kodda doğruladığın** bilgiyi yaz. Varsayım, plan ve "ileride şöyle
    olacak" cümlesi yazma. Bir şey ölü kod veya bilinen borçsa **öyle etiketle**.
15. Değiştirdiğin dosyalarda **yeni lint ihlali bırakma.** `yarn lint` çalıştır ve çıktıyı
    §3'teki bilinen durumla karşılaştır.

| Yaptığın değişiklik                                                  | Güncellenecek doküman                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Yeni/silinen route veya sayfa                                        | `README.md` (Sayfalar), `docs/ARCHITECTURE.md` §8                |
| Yeni/değişen endpoint, payload, response tipi                        | `docs/API.md`                                                    |
| Yeni enum değeri, domain kavramı, Türkçe etiket kümesi               | `docs/DOMAIN.md`                                                 |
| Yeni UI primitive, tasarım token'ı, animasyon utility'si, ikon grubu | `docs/DESIGN_SYSTEM.md`                                          |
| Auth / consent / middleware / interceptor davranışı                  | `docs/ARCHITECTURE.md` §5–§6, `CLAUDE.md` §7                     |
| Yeni query key, cache/invalidation stratejisi, provider              | `docs/ARCHITECTURE.md` §4, §7                                    |
| Yeni bağımlılık veya sürüm yükseltmesi                               | `CLAUDE.md` §2, `README.md` (Teknoloji)                          |
| Yeni env değişkeni                                                   | `.env.example`, `CLAUDE.md` §4, `README.md` (Ortam değişkenleri) |
| Yeni `package.json` script'i                                         | `CLAUDE.md` §3, `README.md` (Komutlar)                           |
| Lint hata/uyarı sayısının değişmesi                                  | `CLAUDE.md` §3 tabloları                                         |
| Yeni rehber (guide) eklenmesi                                        | `docs/API.md` §8 + `docs/DOMAIN.md` §6                           |
| Yeni doküman dosyası                                                 | `README.md`, `AGENTS.md`, `CLAUDE.md` §0.1 tablosu               |

### 0.4 Raporlarken — DÜRÜST OL

16. **Çalıştırmadığın hiçbir şeyi "çalışıyor" diye raporlama.** Bu projede test yoktur; tek
    otomatik kanıt `yarn lint` ve `yarn build`'dir. Şu üçünü ayır:
    _çalıştırarak doğruladım_ / _kodu okuyarak çıkardım_ / _önerdim, doğrulamadım_.
17. Kapsamın bir kısmını yapamadıysan **açıkça söyle**; sessizce daraltma.
18. Şu alanlara dokunuyorsan riski **önce** belirt: token/oturum akışı (`lib/axios.ts`,
    `store/auth.store.ts`, `middleware.ts`), consent gate, kişisel veri, yasal metinler.
19. Commit/push **sadece istendiğinde**. İstenmeden `git commit`, `git push`, branch veya PR
    açma.

---

## 1. Proje nedir?

**NamazGo**, oyunlaştırılmış (Duolingo tarzı) bir namaz/ibadet takip ve öğrenme web
uygulamasıdır. Kullanıcı günlük namaz vakitlerini takip eder, vakitleri işaretleyerek seri
(streak) tutar, kısa quizlerle vakit işaretlemesini doğrular ve abdest/gusül/namaz
rehberlerini adım adım öğrenir.

- Arayüz dili **Türkçe** (`<html lang="tr">`, `locale: tr_TR`). Kullanıcıya görünen tüm
  metinler kod içinde **hardcoded Türkçe** string'lerdir — i18n kütüphanesi **yoktur**.
- Uygulama **yalnızca frontend**tir. Tüm veri, ayrı bir REST backend'den
  (`NEXT_PUBLIC_API_URL`) gelir. Bu repoda API route / server action **yoktur**.
- Tema **tek ve koyudur** (`--color-bg: #070f12`). Light mode yoktur.

---

## 2. Stack (package.json'dan doğrulandı)

| Konu             | Seçim                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Framework        | **Next.js 16.1.6 — App Router** (`src/app`)                                                                                    |
| UI               | React **19.2.3**                                                                                                               |
| Dil              | TypeScript 5, `strict: true`                                                                                                   |
| Stil             | **Tailwind CSS v4** (`@tailwindcss/postcss`) — `tailwind.config` dosyası **yok**, konfigürasyon CSS içinde `@theme inline` ile |
| Server state     | **TanStack Query v5**                                                                                                          |
| Client state     | **Zustand v5** (+ `persist`)                                                                                                   |
| HTTP             | **axios** (tek instance + interceptor'lar)                                                                                     |
| Form             | **react-hook-form** + **zod v4** (`@hookform/resolvers`)                                                                       |
| Animasyon        | **framer-motion** + CSS `@keyframes`                                                                                           |
| İkon             | Yerel SVG → **@svgr/cli** ile üretilen TSX + `lucide-react`                                                                    |
| Yardımcı         | `clsx` + `tailwind-merge` (`cn()`), `js-cookie`                                                                                |
| Paket yöneticisi | **yarn** (`yarn.lock`)                                                                                                         |

**Yok olanlar** (agent varsaymasın): test altyapısı yok (Vitest/Jest/Testing Library **yok**,
hiç test dosyası yok), CI yok (`.github/` yok), Prettier config dosyası yok, husky/lint-staged
yok, i18n kütüphanesi yok, Storybook yok, Docker yok.

---

## 3. Komutlar

```bash
yarn dev          # geliştirme sunucusu (http://localhost:3000)
yarn build        # production build
yarn start        # production sunucu
yarn lint         # eslint (flat config: eslint.config.mjs)
yarn build:icons  # src/icons/**.svg  ->  src/icons/tsx/**  (svgr)
```

### `yarn build` mevcut durumu (2 Ağu 2026 itibarıyla çalıştırılıp doğrulandı)

**Build geçiyor.** Önceden `/login` statik prerender aşamasında şu hatayla düşüyordu:

```
useSearchParams() should be wrapped in a suspense boundary at page "/login"
Export encountered an error on /(auth)/login/page: /login
```

`LoginForm`, `callbackUrl` için `useSearchParams()` okuyor; bu route'u client-side render'a
zorluyor ve Suspense sınırı olmadan Next sayfayı prerender edemiyordu. `app/(auth)/login/page.tsx`
artık formu bir `<Suspense>` içine alıyor. Sonuç: proje ilk kez dağıtılabilir bir production
build üretiyor.

`yarn build` artık **gerçek bir regresyon sinyalidir** — kırıldıysa senin değişikliğindendir.

### `yarn lint` mevcut durumu (22 Ağu 2026 itibarıyla çalıştırılıp doğrulandı)

**Lint şu an başarısız: 7 error, 8 warning.** Bunlar mevcut teknik borçtur, senin
değişikliğinden kaynaklanmaz. Kural: _dokunduğun dosyada_ yeni ihlal üretme, mevcutları
temizlemek istiyorsan ayrı iş olarak yap.

**Error'lar (7):**

| Kural                                 | Konumlar                                                                                                                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `react-hooks/set-state-in-effect` (6) | `app/page.tsx:13` · `app/profile/[username]/components/FollowListDialog.tsx:41` · `app/settings/avatar/AvatarSettingsClient.tsx:252` · `components/learn/DynamicPath.tsx:54` · `components/settings/avatar/HexInput.tsx:26` · `hooks/useCookieConsent.ts:75` |
| `react/no-unescaped-entities` (1)     | `app/profile/[username]/components/InviteCard.tsx:19`                                                                                                                                                                                                        |

**Warning'ler (8):**

| Kural                                   | Konumlar                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `@typescript-eslint/no-unused-vars` (5) | `app/(auth)/reset-password/ResetPasswordClient.tsx:16,17,19,21` · `components/ui/Sparkle.tsx:2` |
| `react-hooks/exhaustive-deps` (3)       | `app/settings/avatar/AvatarSettingsClient.tsx:254,256` · `components/learn/DynamicPath.tsx:70`  |

---

## 4. Ortam değişkenleri

`.env.example` → `.env.local` olarak kopyalanır. Sadece iki değişken vardır:

| Değişken               | Kullanım                                | Not                          |
| ---------------------- | --------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_API_URL`  | `src/lib/axios.ts` → axios `baseURL`    | Sonunda `/` **olmamalı**     |
| `NEXT_PUBLIC_SITE_URL` | `src/config/site.ts` → canonical/OG URL | Yoksa `https://namazgo.com/` |

Backend olmadan uygulama açılır ama veri çeken her ekran hata/boş durum gösterir.

---

## 5. Klasör yapısı ve import alias

`tsconfig.json` → `"@/*": ["./*"]` — alias **repo köküne** işaret eder, bu yüzden importlar
`@/src/...` biçimindedir (`@/components/...` **değil**).

```
src/
├── app/                # App Router: route'lar, layout, globals.css
│   ├── (auth)/         # login, register, forgot-password, reset-password, verify-otp
│   ├── learn/[id]/     # rehber detay
│   ├── profile/[username]/
│   ├── settings/{profile,account,avatar}/
│   ├── search/  worship/  terms/  privacy/  explicit-consent/
│   ├── layout.tsx      # root layout + provider zinciri
│   ├── error.tsx       # route seviyesinde hata sınırı — hatayı backend'e raporlar
│   ├── global-error.tsx# kök layout çökerse; kendi <html>/<body>'sini render eder
│   └── page.tsx        # "/" → oturum varsa Dashboard, yoksa Landing
├── components/         # domain klasörlerine bölünmüş bileşenler
│   ├── ui/             # paylaşılan primitive'ler (Button, Card, Dialog, Input, ...)
│   ├── dashboard/  worship/  learn/  stats/  settings/  layout/
│   ├── consent/  cookie/  legal/  landing/  common/
├── config/site.ts      # site adı, başlık şablonu, OG, tema rengi
├── constants/          # sabitler + React Query key fabrikaları + hata mesajı sözlüğü
├── hooks/              # React Query hook'ları + UI hook'ları (domain alt klasörleri)
├── icons/              # ham .svg  →  icons/tsx/ üretilmiş bileşenler (commit'li)
├── lib/                # axios, api-error, error-reporter, utils(cn), metadata, domain util'leri
├── providers/          # QueryProvider, CookieConsentProvider, ConsentGateProvider
├── services/           # axios çağrıları (endpoint katmanı)
├── store/auth.store.ts # tek Zustand store
├── styles/             # learn.css, worship.css (sayfa-özel keyframe'ler)
├── types/              # tipler + types/enums/
├── validations/        # zod şemaları
├── middleware.ts       # cookie tabanlı route koruması
└── instrumentation-client.ts  # window error/unhandledrejection → error-reporter
```

---

## 6. Uyulması gereken kalıplar

Yeni kod yazarken bu zincirin dışına çıkma:

### 6.1 Veri akışı — `service → hook → component`

```
services/*.service.ts   →  axiosInstance ile endpoint çağrısı, ApiResponse<T> ile tiplenir
        ↓
hooks/**/use*.ts        →  useQuery/useMutation, zarfı açar, key'i constants'tan alır
        ↓
components/**           →  sadece hook tüketir
```

- **Bileşen içinde doğrudan axios/fetch çağırma.** Her zaman service + hook.
- **Veri çekmek için `useEffect` kullanma.** React Query kullan.
- Zarf açma kalıbı (tüm hook'larda aynı):
  ```ts
  const { data } = await someService.call(params);
  const payload = data.data;
  if (!payload) throw new Error("... response missing data");
  return payload;
  ```
- Query key'leri **her zaman** `src/constants/*` içindeki fabrikadan al
  (`GAMIFICATION_QUERY_KEYS`, `WORSHIP_QUERY_KEYS`, `USER_STATS_QUERY_KEYS`,
  `CONSENT_QUERY_KEYS`). Bileşende inline dizi yazma.
- Parametre hazır değilse hook `enabled: false` + `["...","disabled"]` key'i ile devre dışı
  bırakılır (bkz. `useDailyPrayers`, `useWorshipTimes`).

### 6.2 Server / client bileşen ayrımı

`page.tsx` **server component**tir ve yalnızca metadata + ince bir sarmalayıcı içerir;
etkileşimli kısım kardeş dosyada `"use client"` ile durur:

```
app/worship/page.tsx        → metadata + <WorshipView/>
app/settings/account/page.tsx → metadata + <AccountSettingsClient/>
app/(auth)/login/page.tsx     → metadata + <LoginForm/>
```

Adlandırma: `*Client.tsx`, `*Form.tsx`, `*View.tsx`. Bu ayrımı bozma — `page.tsx`'e
`"use client"` ekleme (tek istisna mevcut `app/page.tsx`).

Dinamik route'larda `params` bir **Promise**'tir (Next 16):

```ts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
});
```

### 6.3 Metadata

Statik sayfalar `createMetadata({ title, description, path, noIndex? })` kullanır
(`src/lib/metadata.ts`). Dinamik sayfalar `generateMetadata` içinde `siteConfig.url` ile
canonical üretir. Root metadata `createRootMetadata()`. Yeni sayfa eklerken metadata ekle;
oturum arkasındaki özel sayfalarda `noIndex: true` kullan (örn. `/settings/account`).

### 6.4 Stil

- Tailwind utility class + CSS değişkenleri (`bg-[var(--color-bg)]`) birlikte kullanılır.
- Class birleştirme her zaman `cn()` (`src/lib/utils.ts`).
- Yeni renk/radius **hardcode etme**; `globals.css` `:root` içindeki token'ı kullan.
- Sayfa-özel karmaşık keyframe'ler `src/styles/*.css` içine, global olanlar `globals.css`'e.
- Detay: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)

### 6.5 İkonlar

1. Ham SVG'yi `src/icons/<grup>/` altına koy.
2. `yarn build:icons` çalıştır → `src/icons/tsx/<grup>/` altında TSX + `index.ts` barrel üretilir.
3. `import { Learn } from "@/src/icons/tsx/sidebar"` şeklinde kullan.

`src/icons/tsx/**` **üretilmiş** koddur ve commit'lidir — **elle düzenleme**, kaynağı düzenleyip
yeniden üret.

### 6.6 Hata mesajları

Backend `UPPER_SNAKE_CASE` hata kodu döner. Kullanıcıya gösterilecek Türkçe karşılık
`src/constants/error-messages.ts` sözlüğündedir; kod okuma yardımcıları
`src/lib/api-error.ts` içindedir (`getDomainErrorCode`, `getApiErrorMessage`,
`getValidationCodes`, `getHttpStatus`, `retryOnServerError`).
Yeni bir hata kodu ele alırken **sözlüğe ekle**, bileşene serbest metin yazma.

**`switch (errorCode)` bloklarının `default` dalı da sözlükten geçmeli.** Auth hook'larının altısı
bir süre `default`'ta sabit "Beklenmeyen bir hata oluştu." yazıyordu; bu yüzden `TOO_MANY_REQUESTS`
(429) ve `ACCOUNT_TEMPORARILY_LOCKED` gibi karşılığı **olan** kodlar kullanıcıya "bilinmeyen hata"
olarak görünüyor, kullanıcı da boşuna tekrar deniyordu. Doğru kalıp:
`setError("root", { message: resolveApiErrorMessage(error, "<gerçekten bilinmeyen için fallback>") })`.

### 6.7 Tipler

- `any` kullanma. Ortak zarf `ApiResponse<T>` (`src/types/api.types.ts`).
- Sabit değer kümeleri `src/types/enums/*.enums.ts` içinde **TypeScript enum**'dur
  (`PrayerType`, `PrayerKey`, `Madhab`, `PrayerQuizStatus`, ...).
  String literal yerine bu enum'ları kullan.

---

## 7. Kritik davranışlar (değiştirmeden önce oku)

### 7.1 Kimlik doğrulama iki katmanlıdır

| Katman                              | Kaynak                                | Not                                                                                 |
| ----------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| Middleware (`src/middleware.ts`)    | `auth-token` **cookie**'sinin varlığı | Sadece varlığa bakar, doğrulama yapmaz                                              |
| İstemci (`src/store/auth.store.ts`) | Zustand state                         | `partialize`: localStorage'a **sadece** `user`, `tempToken`, `pendingEmail` yazılır |

- **Refresh token istemciye hiç ulaşmaz.** Backend onu `refresh_token` adlı **httpOnly**
  çereze yazar; JavaScript okuyamaz, store'da ve localStorage'da yoktur. `/auth/refresh` ve
  `/auth/logout` gövdesiz çağrılır, çerez tarayıcı tarafından gönderilir. Bu yüzden axios
  instance'ı `withCredentials: true` ile kurulur — kaldırırsan oturum yenileme sessizce ölür.
- `accessToken` **persist edilmez**; bellekte ve `auth-token` cookie'sinde durur.
- `auth-token` cookie'si `js-cookie` ile **client-side** yazılır → `httpOnly` **değildir**,
  JS ile okunabilir. Middleware'in okuyabilmesi için bilinçli bir kısıt; ömrü kısa olduğu
  için refresh token'la aynı riski taşımaz. Auth akışına dokunacaksan bunu bilerek çalış.
- axios request interceptor sırası: store'daki `accessToken` → yoksa cookie.
- axios response interceptor: 401/403'te **tek uçuşlu (single-flight)** refresh yapar
  (`isRefreshing` + `failedQueue`), `/auth/refresh` ve `/auth/login` bu akıştan muaftır;
  refresh başarısızsa `clearAuth()` + `window.location.href = "/login"`.
  **`CONSENT_REQUIRED` / `CONSENT_OUTDATED` kodlu 403'ler bu akıştan hariçtir** — rıza duvarı
  bir kimlik hatası değildir; refresh denemek geçerli oturumu boşuna yeniler ve
  `ConsentGateProvider` modalını açamadan kullanıcıyı `/login`'e atardı.
- Parola değişimi backend'de `tokenVersion`'ı artırır ve yanıtta yeni bir `accessToken`
  döner; `useUpdateProfile` bunu `setAccessToken()` ile alır (refresh token çerezde yenilenir).
- Middleware yönlendirmeleri `src/constants/routes.ts`'ten okunur.
  **Dikkat:** `DEFAULT_UNAUTHENTICATED_REDIRECT` `/login` değil **`/`**'dir; giriş yapmamış
  kullanıcı korumalı bir sayfaya giderse `/?callbackUrl=<path>` adresine yönlenir ve `/`
  Landing ekranını gösterir. Bu mevcut ve kasıtlı görünen davranıştır — "bug" diye
  düzeltmeden önce sor.
  **`PUBLIC_ROUTES` eşleşmesi `/` için tam eşleşmedir**, diğerleri prefix. `startsWith`'i
  hepsine uygularsan her path `/` ile başladığı için `isPublicRoute` daima `true` olur ve
  koruma dalı sessizce ölü koda döner — bir süre öyleydi, tüm korumalı sayfalar oturumsuz
  açılıyordu.
- Kayıt akışı parola ile giriş akışından ayrıdır: `POST /auth/register` → **`tempToken`** →
  `setTempToken` → `/verify-otp` → `POST /otp/verify` (Authorization: `Bearer <tempToken>`).
  Doğrulama başarılıysa `setAuth()` + `router.replace("/")` ile kullanıcı **giriş yapmış**
  olarak ana sayfaya gider. `/verify-otp`'nin "tempToken yoksa /register'a at" koruması
  `accessToken` doluyken **çalışmamalıdır** — `setAuth()` tempToken'ı temizlediği için bu
  koruma bir kez başarılı doğrulamayı kayıt formuna geri atıyordu.

### 7.2 İki ayrı "consent" sistemi vardır — karıştırma

|                      | Yasal onay (blocking)                                                                                                                                                                                                  | Çerez onayı                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Kaynak               | Backend `/consent/status`, `/consent/accept`                                                                                                                                                                           | Tamamen client, `js-cookie` çerezi (versiyonlu, `COOKIE_CONSENT_VERSION = "1.0.0"`)              |
| Kod                  | `providers/ConsentGateProvider.tsx`, `components/consent/`                                                                                                                                                             | `hooks/useCookieConsent.ts`, `providers/CookieConsentProvider.tsx`, `components/cookie/`         |
| Tipler / kategoriler | 3 tip (`ConsentType`): `TERMS_OF_SERVICE` "Kullanım Koşulları" (`/terms`), `PRIVACY_POLICY` "Aydınlatma Metni" (`/privacy`, yalnızca "okudum" teyidi), `SPECIAL_CATEGORY_DATA` "Açık Rıza Metni" (`/explicit-consent`) | 2 kategori: `essential` (hep `true`) + `personalization` — analitik/pazarlama v2.0'da kaldırıldı |
| Etki                 | `blocked` veya `requiresReaccept` ise modal ile uygulamayı kilitler                                                                                                                                                    | Alt banner gösterir                                                                              |
| İstisna              | `/terms`, `/privacy` ve `/explicit-consent` yollarında gate gösterilmez (`CONSENT_GATE_EXCLUDED_PATHS`)                                                                                                                | —                                                                                                |

### 7.3 Hidrasyon

`app/page.tsx` Zustand persist hidrasyonunu beklemek için `hydrated` state'i kullanır ve o
ana kadar "NamazGo" splash gösterir. `ConsentGateProvider` ise aynı işi
`useSyncExternalStore` + `useAuthStore.persist.onFinishHydration` ile yapar. Auth durumuna
bakan yeni bir üst-seviye bileşen yazarsan hidrasyonu **mutlaka** bekle, yoksa SSR/CSR
uyuşmazlığı oluşur.

### 7.4 Provider zinciri (`src/app/layout.tsx`) — sıra anlamlıdır

```
QueryProvider → ToastProvider → CookieConsentProvider → ConsentGateProvider → {children}
                                                      → CookieBanner
```

`ConsentGateProvider` React Query kullandığı için `QueryProvider` içinde kalmalıdır.

`QueryProvider` ayrıca `AuthScopedCacheReset`'i render eder: `user.id` değiştiğinde
`queryClient.clear()` çağırır. Query key'ler kullanıcıya göre isimlendirilmediği için
(`USER_STATS_QUERY_KEYS.me()`, `CONSENT_QUERY_KEYS.status` …) bu temizlik olmadan hesap
değiştiren kullanıcı önceki kullanıcının verisini görüyordu. **Yeni bir query key eklerken ya
bu davranışa güven ya da anahtarı kullanıcıya göre isimlendir** — ikisinden birini yap.
Detay: `docs/ARCHITECTURE.md` §4.

### 7.5 Hata raporlama tek kanaldan geçer

Yakalanmamış tarayıcı hataları `src/lib/error-reporter.ts` üzerinden backend'e raporlanır
(`POST /telemetry/client-errors`; detay: `docs/ARCHITECTURE.md` §9.1). Kurallar:

- Yeni hata yakalama noktası eklersen **`reportClientError()` çağır** — doğrudan
  `telemetryService`'i veya `fetch`'i çağırma; dedupe, oturum limiti ve KVKK kırpması
  raporlayıcıda yaşar.
- `telemetryService` bilerek `axiosInstance` kullanmaz (refresh döngüsü riski) ve **kullanmaya
  çevirme**.
- Rapora asla query string, token, çerez veya kişisel veri ekleme; `url` alanı yalnızca
  `pathname`'dir.
- Raporlayıcı hata fırlatamaz — bu değişmezi bozan bir düzenleme uygulamanın kendisini bozar.

### 7.6 Layout

Oturum içi sayfalar `AppLayout` ile sarılır (sol `Sidebar` + opsiyonel `rightPanel`;
mobilde alt bar). `Sidebar`, `user` yoksa hiçbir şey render etmez. Sidebar'da
`Puan Tabloları`, `Görevler`, `Mağaza`, `İstatistik` öğeleri **yorum satırındadır** —
bu route'lar henüz yok.

---

## 8. Bilinen tutarsızlık: `.cursor/rules/project-info.mdc`

Repoda bulunan bu Cursor kuralı **ürün vizyonunu** iyi anlatır ancak **teknik olarak
güncel değildir**. Çakışma halinde **bu dosya (CLAUDE.md) esas alınır.**

Doğrulanmış farklar:

| `.cursor` kuralı diyor ki                   | Gerçek                                           |
| ------------------------------------------- | ------------------------------------------------ |
| React 18 + **Vite**                         | **Next.js 16 App Router**                        |
| **React Router v6**                         | Next.js dosya tabanlı routing                    |
| **react-i18next**, "hardcoded string yasak" | i18n yok, tüm metinler hardcoded Türkçe          |
| **Vitest + Testing Library**                | Test altyapısı hiç yok                           |
| `src/features/**` feature-based yapı        | `src/app` + `src/components` + katman klasörleri |
| Açık tema paleti (`--color-bg: #F7F4EF`)    | Koyu tema (`--color-bg: #070f12`)                |

Hâlâ geçerli olan kısımlar: ürün konsepti, Duolingo tarzı 3D buton dili, Fredoka (display)

- Nunito tipografisi (her ikisi de `next/font` ile self-host, bundle'a gömülü),
  primary/secondary/streak renk ailesi, animasyon önceliği,
  `any` yasağı, servis katmanı zorunluluğu.

---

## 9. Değişiklik yaparken

- **En küçük doğru değişikliği** yap; çevresel temizliğe girme.
- Mevcut mimariyi koru; yeniden tasarım istenmedikçe katman ekleme/çıkarma.
- Marjinal kazanç için yeni bağımlılık ekleme.
- Doğrulama: test yok, bu yüzden `yarn lint` ve `yarn build` tek otomatik kanıttır.
  Çalıştırmadıysan **çalıştırmadığını söyle**; "çalışıyor" deme.
- Kullanıcıya görünen tüm yeni metinler **Türkçe** olmalı.
- Auth, token, consent veya ödeme benzeri akışlara dokunmadan önce riski belirt.
- `src/icons/tsx/**`, `.next/`, `yarn.lock` üretilmiş/otomatik dosyalardır — elle düzenleme.
