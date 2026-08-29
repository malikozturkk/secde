# Mimari

NamazGo web istemcisinin katmanları, veri akışı ve kritik mekanizmaları.
Genel kurallar için → [../CLAUDE.md](../CLAUDE.md)

---

## 1. Genel görünüm

```
Tarayıcı
   │
   ├─ middleware.ts ............ cookie var mı? → route koruması (Edge)
   │
   └─ App Router (src/app)
         page.tsx (server) ..... metadata + ince sarmalayıcı
              │
              └─ *Client/*View/*Form (client)
                       │
                       ├─ hooks/** ......... React Query (server state)
                       │      └─ services/** ..... axiosInstance
                       │              └─ REST backend (NEXT_PUBLIC_API_URL)
                       │
                       └─ store/auth.store.ts ... Zustand (client state)
```

Bu repoda **hiç** API route, server action veya sunucu tarafı veri çekme yoktur. Tüm veri
istemciden, `axiosInstance` üzerinden gelir.

---

## 2. Katmanlar

| Katman    | Konum                             | Sorumluluk                                                              | Yapmaması gereken                             |
| --------- | --------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| Service   | `src/services/*.service.ts`       | Endpoint yolu, HTTP metodu, request/response tipi                       | State tutmak, hata mesajı üretmek             |
| Hook      | `src/hooks/**/use*.ts`            | React Query key/config, `ApiResponse` zarfını açmak, cache invalidation | JSX döndürmek                                 |
| Bileşen   | `src/components/**`, `src/app/**` | Sunum + etkileşim                                                       | Doğrudan axios/fetch çağırmak                 |
| Store     | `src/store/auth.store.ts`         | Oturum durumu, cookie yazma/silme                                       | Sunucu verisi cache'lemek                     |
| Lib       | `src/lib/**`                      | Saf yardımcılar, axios instance, view-model üreticileri                 | React'e bağımlı olmak (`utils` dosyaları saf) |
| Constants | `src/constants/**`                | Sabitler, query key fabrikaları, hata sözlüğü                           | İş mantığı                                    |

### Service örneği

```ts
// src/services/worship.service.ts
export const worshipService = {
  getTimes: (params: WorshipQueryParams) =>
    axiosInstance.get<ApiResponse<WorshipData>>("/worship", {
      params: { date: params.date },
    }),
};
```

### Hook örneği — zarf açma ve devre dışı bırakma kalıbı

```ts
// src/hooks/worship/useWorshipTimes.ts
export const useWorshipTimes = (params: WorshipQueryParams | null) =>
  useQuery<WorshipData>({
    queryKey: params
      ? WORSHIP_QUERY_KEYS.times(params)
      : ["worship", "times", "disabled"],
    queryFn: async () => {
      const response = await worshipService.getTimes(params!);
      const data = response.data.data;
      if (!data) throw new Error("Worship response missing data");
      return data;
    },
    enabled: params !== null,
    staleTime: WORSHIP_STALE_TIME,
    refetchInterval: WORSHIP_REFRESH_INTERVAL,
    refetchOnWindowFocus: true,
  });
```

Parametre `null` iken hook devre dışı kalır ama farklı bir key kullanır — böylece geçerli
sorgunun cache'i kirlenmez.

---

## 3. Controller hook kalıbı

Karmaşık ekranlarda birden çok query + yerel state tek bir "controller" hook'unda toplanır ve
`View` bileşeni yalnızca onu tüketir:

| Hook                   | Topladığı şey                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `useWorshipController` | Seçili tarih, gün ileri/geri/bugün gezinmesi, `useWorshipTimes`, gün değişimi izleme (`useDayChange`), manuel `refresh`               |
| `useStreakController`  | Bugünün tarihi, `useDailyPrayers` + `useSelfStats`, saniyelik tik (`useNowTicker`), view-model üretimi, kutlama (celebration) state'i |

DTO → view-model dönüşümü bileşende değil `src/lib/*-utils.ts` içindeki saf fonksiyonlarda
yapılır (`buildDailyPrayersViewModel`, `buildLocalDateString`, `addDays`, `roundCoordinate`).

**Takvim görünümleri.** Hafta şeridi ve ay ısı haritası geçmiş gün durumunu `usePrayerHistory`'den
gelen **gerçek** günlük sayımlardan üretir (`buildWeekStrip` / `buildMonthCalendar`), streak
sayısından türetmez. `DashboardView` haftalık aralığı (`buildWeekRange`), `MonthHeatmapSheet` ise
görüntülenen ayın aralığını (`buildMonthRange`) kendi sorgusuyla çeker; ay sorgusu yalnızca sayfa
açıkken etkindir (`isOpen ? range : null`). **Bugün** her ikisinde de canlı `daily-prayers`
sayılarından gelir — geçmiş verisi bugün için bayat olabilir.

Yeni karmaşık bir ekran eklerken bu kalıbı izle: **query hook'ları + saf util → controller
hook → View bileşeni.**

---

## 4. React Query yapılandırması

Varsayılanlar `src/providers/QueryProvider.tsx` içinde:

```ts
{ queries: { retry: 1, staleTime: 1000 * 60 * 5 } }
```

`QueryClient` `useState` içinde oluşturulur (her render'da yeniden yaratılmaz).

### Hesap değişiminde önbellek sıfırlama

`QueryProvider` içindeki `AuthScopedCacheReset` bileşeni `useAuthStore`'daki `user.id`'yi izler
ve kimlik değiştiğinde `queryClient.clear()` çağırır.

Gerekçe: query key'ler kullanıcıya göre isimlendirilmez — `USER_STATS_QUERY_KEYS.me()`,
`CONSENT_QUERY_KEYS.status`, `GAMIFICATION_QUERY_KEYS.dailyPrayers({ date })` her kullanıcı için
aynı anahtardır. Bir hesaptan çıkıp başka hesaba girildiğinde önbellek aynı anahtarları taşıdığı
için yeni kullanıcı, sayfa elle yenilenene kadar **önceki kullanıcının** serisini,
istatistiklerini ve consent durumunu görüyordu.

Ayrıntılar:

- Hidrasyon (`useAuthHydrated()`) beklenir; persist hidre olmadan `user` daima `null` görünür ve
  her açılışta gereksiz bir temizlik tetiklenirdi.
- Hidrasyondan sonraki ilk `user.id` yalnızca referans olarak saklanır, temizlik yapılmaz.
- Token yenileme de `setAuth()` çağırır ama `user.id` değişmediği için önbellek korunur.
- Çıkış (`user.id → null`) de bir kimlik değişimidir: önceki kullanıcının verisi bellekte
  bırakılmaz.

Sorguya özel ayarlar ilgili `constants` dosyasından gelir:

| Sabit                                            | Değer | Kaynak                                                |
| ------------------------------------------------ | ----- | ----------------------------------------------------- |
| `DAILY_PRAYERS_STALE_TIME_MS`                    | 60 sn | `constants/streak.ts`                                 |
| `DAILY_PRAYERS_REFRESH_INTERVAL_MS`              | 5 dk  | `constants/streak.ts`                                 |
| `PRAYER_HISTORY_STALE_TIME_MS`                   | 5 dk  | `constants/streak.ts`                                 |
| `PRAYER_HISTORY_MAX_RANGE_DAYS`                  | 62    | `constants/streak.ts` — backend sabitiyle aynı olmalı |
| `STREAK_TICK_INTERVAL_MS`                        | 1 sn  | `constants/streak.ts`                                 |
| `WORSHIP_STALE_TIME`, `WORSHIP_REFRESH_INTERVAL` | —     | `constants/worship.ts`                                |

### Query key fabrikaları

```ts
GAMIFICATION_QUERY_KEYS.all                       // ["gamification"]
GAMIFICATION_QUERY_KEYS.dailyPrayers({ date })    // ["gamification","daily-prayers",{date}]
GAMIFICATION_QUERY_KEYS.prayerHistory({ from, to })// ["gamification","prayer-history",{from,to}]
GAMIFICATION_QUERY_KEYS.prayerQuestions({ prayerType })
GAMIFICATION_QUERY_KEYS.streakRisk()              // ["gamification","streak-risk"]
WORSHIP_QUERY_KEYS.all / .times(params)
LEADERBOARD_QUERY_KEYS.all / .list(params)        // QA B1
USER_STATS_QUERY_KEYS.me() / .user(username)
CONSENT_QUERY_KEYS.status
```

### Mutation sonrası cache güncelleme

`useAnswerPrayerQuestion` iki aşamalı çalışır ve iyi bir örnektir:

1. `setQueryData` ile quiz sorularını **yerinde** günceller (yeniden istek atmadan).
2. Yanıt `prayerCompletion` içeriyorsa `daily-prayers` + kendi istatistikleri + profil
   istatistiklerini `invalidateQueries` ile tazeler.

Yeni mutation yazarken: neyin yerinde güncelleneceğini, neyin invalidate edileceğini bilinçli seç.

**QA M3 — eksik invalidation gerçek bir hataydı.** Seri dondurma `200` dönüyor, sağ panel ve seri
sayacı anında güncelleniyor ama hafta şeridindeki korunan gün boş kalıyordu: kar tanesi
`prayer-history`'den geliyor ve o sorgu invalidate edilmiyordu. `useGamificationAction` artık
`prayerHistoryAll`, `dailyPrayersAll` ve `LEADERBOARD_QUERY_KEYS.all` sorgularını da tazeliyor;
`useAnswerPrayerQuestion` da tamamlama sonrası aynısını yapıyor.

**QA M9 — `retry` politikası.** `QueryProvider` varsayılanı `retry: 1`, yani _her_ hatayı bir kez
tekrarlar. Var olmayan bir profil bu yüzden uç başına iki adet 404 üretiyordu. `useProfile`,
`useGetFollowers` ve `useGetFollowing` artık `retryOnServerError()` kullanıyor — yalnızca 5xx
tekrarlanır. Yeni sorgular için varsayılan bu olmalı.

---

## 5. Kimlik doğrulama

### 5.1 Durum nerede tutulur

| Veri           | Yer                                                    | Kalıcı mı                      |
| -------------- | ------------------------------------------------------ | ------------------------------ |
| `accessToken`  | Zustand state + `auth-token` cookie                    | localStorage'a **yazılmaz**    |
| `refreshToken` | Backend'in yazdığı `refresh_token` **httpOnly** çerezi | İstemci hiç görmez             |
| `user`         | Zustand state + localStorage                           | Evet                           |
| `tempToken`    | Zustand state + localStorage (`auth-storage`)          | Evet (kayıt/OTP akışı boyunca) |
| `pendingEmail` | Zustand state + localStorage (`auth-storage`)          | Evet (kayıt/OTP akışı boyunca) |

`partialize` yalnızca `user`, `tempToken` ve `pendingEmail`'i persist eder.

Refresh token istemci koduna **hiç ulaşmaz**: `/auth/login`, `/otp/verify` ve `/auth/refresh`
yanıt gövdesinde göndermez, `Set-Cookie: refresh_token=…; HttpOnly` ile yazar. Bu yüzden
`axiosInstance` `withCredentials: true` ile kurulur ve `/auth/refresh` ile `/auth/logout`
**gövdesiz** çağrılır. Bir XSS artık uzun ömürlü oturumu çalamaz.

`pendingEmail`, `/verify-otp` ekranının kodun hangi adrese gittiğini yazabilmesi için tutulur;
`setTempToken(token, email)` ile yazılır, `setAuth` / `clearTempToken` / `clearAuth` üçünde de
`tempToken` ile birlikte temizlenir. E-posta adresi kişisel veridir — yalnızca doğrulama ekranında
gösterilir, hiçbir isteğe eklenmez.

Cookie `js-cookie` ile client tarafında yazılır:
`secure: production`, `sameSite: "lax"`. **`httpOnly` değildir** — JS ile okunabilir.
Auth akışına dokunacak değişikliklerde bu kısıtı göz önünde bulundur.

### 5.2 axios interceptor'ları (`src/lib/axios.ts`)

**Request:** `Authorization: Bearer <accessToken>` — önce store, yoksa cookie.

**Response (401/403):**

```
401/403 geldi
 ├─ zaten retry edildi? ──────────────┐
 ├─ istek /auth/refresh mi? ──────────┤
 ├─ istek /auth/login mi? ────────────┤→ hatayı olduğu gibi fırlat
 ├─ hata kodu CONSENT_REQUIRED /  ────┘
 │  CONSENT_OUTDATED mı?
 │
 ├─ şu an başka bir refresh sürüyor? → isteği failedQueue'ya koy, token gelince tekrar dene
 │
 └─ değilse: isRefreshing = true
      POST /auth/refresh   (gövdesiz — refresh_token çerezi otomatik gider)
        ├─ başarılı → setAuth({ accessToken, user }), kuyruğu boşalt, isteği tekrar dene
        └─ başarısız → kuyruğu reddet, clearAuth(), window.location.href = "/login"
```

Bu **tek uçuşlu (single-flight)** refresh'tir: eşzamanlı 401'ler tek bir refresh isteği doğurur.
Bu mekanizmayı sadeleştirmeye çalışırken kuyruk mantığını bozma.

### 5.3 Middleware (`src/middleware.ts`)

Yalnızca `auth-token` cookie'sinin **varlığına** bakar; token doğrulaması yapmaz.

```ts
PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/terms",
  "/privacy",
  "/explicit-consent",
  "/learn",
  "/tools",
];
PROTECTED_ROUTES = ["/worship", "/search", "/profile", "/settings"];
KNOWN_ROUTE_PREFIXES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];
AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];
DEFAULT_AUTHENTICATED_REDIRECT = "/";
DEFAULT_UNAUTHENTICATED_REDIRECT = "/";
```

- Oturumlu kullanıcı `AUTH_ROUTES`'a girerse → `/`
- Oturumsuz kullanıcı public olmayan **bilinen** bir yola girerse → `/?callbackUrl=<path>`
- Hiçbir prefix'e uymayan yol → `NextResponse.next()`, yani Next'in kendi 404'ü

**Bilinmeyen yol 404 döner, yönlendirilmez.** Eskiden "public değilse korumalıdır" mantığı
`/asdf` gibi hiç var olmayan adresleri de yakalıyordu; oturumsuz ziyaretçi 404 yerine
`307 → /` alıyordu (soft-404) ve `not-found.tsx` pratikte hiç görünmüyordu. Yeni bir route
eklerken **`PUBLIC_ROUTES` veya `PROTECTED_ROUTES`'a da ekle** — yoksa sayfa var olsa bile
oturumsuz ziyaretçiye açık kalır ya da 404 sanılır. Tersi de geçerli: **henüz `src/app/` altında
karşılığı olmayan bir kökü önden ekleme.** `/ramadan` bir süre `PROTECTED_ROUTES`'ta duruyordu ve
sayfa yokken oturumsuz ziyaretçiye `404` yerine `307 → /?callbackUrl=/ramadan` dönüyordu —
yani var olmayan bir sayfayı var gibi gösterip route envanterini sızdırıyordu. Çıkarıldı; Ramazan
modu sayfası yazıldığında geri eklenecek.

`sanitizeCallbackUrl()` (`src/constants/routes.ts`) `callbackUrl`'i yalnızca tek `/` ile
başlayan yollara izin verir; `//evil.com`, `/\evil.com` ve mutlak URL'ler
`DEFAULT_AUTHENTICATED_REDIRECT`'e düşer. Açık yönlendirme (open redirect) buradan kapatıldı —
`useLogin` ve `LoginForm` bu fonksiyondan geçmeden `router.push` yapmamalı.

**Content-Security-Policy middleware'de üretilir.** Politika `src/lib/csp.ts` içinde tanımlıdır ve
`middleware.ts` her yanıta `Content-Security-Policy` başlığı olarak koyar. `next.config.ts` artık
CSP yayınlamaz — iki politika birden yayınlanırsa tarayıcı ikisini de uygular ve kesişimlerini alır;
sıkılaştırmayı tek yerden yönetmek için kaynak tektir. **Nonce kullanılmıyor**: denendi ve üretim
build'inde uygulamayı tamamen kırdığı için geri alındı; gerekçesi §11'de.

**Not:** `DEFAULT_UNAUTHENTICATED_REDIRECT` `/login` değil `/`'dir; `/` oturumsuzken Landing
gösterdiği için akış tutarlıdır. Buna karşılık axios refresh hatası `/login`'e yönlendirir.
İki farklı yol kasıtlı görünüyor — "tutarsızlık" diye tek taraflı değiştirme.

**QA H4 — `matcher` yetersizdi.** Yalnızca `_next/*`, `favicon.ico` ve üç görsel uzantısı hariç
tutuluyordu; dolayısıyla `robots.txt`, `sitemap.xml` ve `site.webmanifest` de auth kontrolünden
geçiyor ve oturumsuz ziyaretçide `307 → /?callbackUrl=…` dönüyordu. `<head>` içinde
`<link rel="manifest">` olduğu için PWA manifest'i herkeste bozuktu.

Matcher artık Next iç yollarını, adıyla bilinen SEO/PWA dosyalarını ve statik uzantıları
(`.ico`, `.txt`, `.xml`, `.webmanifest`, `.woff2`, görseller, medya) hariç tutuyor. Yeni bir kök
seviyesi statik dosya eklerken bu listeye de eklemeyi unutma.

`app/robots.ts` ve `app/sitemap.ts` eklendi. Oturum arkasındaki yollar (`/settings/`, `/profile/`,
`/search`, `/worship`) hem `robots.txt` içinde disallow, hem de sayfa `metadata`'sında
`noIndex: true` — bunlar oturumsuz ziyaretçiyi zaten yönlendiriyor, indexlenmeleri yalnızca
soft-404 üretir (QA M8).

### 5.4 Kayıt ve OTP akışı

```
POST /auth/register  →  { tempToken }
        ↓  setTempToken(tempToken, email)
   /verify-otp  ──  POST /otp/verify   (Authorization: Bearer <tempToken>)
                └─  POST /otp/resend   (Authorization: Bearer <tempToken>)
        ↓
   oturum tokenları  →  setAuth()  →  router.replace("/")  (oturum açık)
```

`useOtpVerify` başarı sonrası `push` değil **`replace`** kullanır: `/verify-otp` geçmişte
kalsaydı geri tuşu `tempToken`'ı tüketilmiş sayfaya döner ve kullanıcıyı `/register`'a
düşürürdü.

`tempToken` isteğe **açıkça** header olarak verilir (`otp.service.ts`), interceptor'dan
gelmez. Şifre sıfırlama ayrı akıştır: `/auth/forgot-password` →
`/auth/validate-reset-token` → `/auth/reset-password`.

### 5.5 Hidrasyon

Zustand `persist` istemcide asenkron hidre olur. Auth durumuna bakan üst-seviye bileşenler
hidrasyonu beklemek zorundadır:

| Yer                                                  | Yöntem                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `src/app/page.tsx`                                   | `useState` + `useEffect` ile `hydrated` bayrağı, o ana kadar splash |
| `src/providers/ConsentGateProvider.tsx`              | `useAuthHydrated()` (paylaşılan hook)                               |
| `src/app/(auth)/verify-otp/VerifyOtpForm.tsx`        | `useAuthHydrated()` — QA B6                                         |
| `src/app/settings/account/AccountSettingsClient.tsx` | `useAuthHydrated()` — QA M4                                         |

`useAuthHydrated` (`hooks/auth/useAuthHydrated.ts`) `useSyncExternalStore` +
`useAuthStore.persist.onFinishHydration()` sarmalayıcısıdır; daha önce yalnızca
`ConsentGateProvider` içinde satır içi duruyordu.

Persist edilmiş bir değerin **yokluğuna** bakıp yönlendirme yapan her yer bunu beklemek zorundadır:

- **QA B6** — `/verify-otp` beklemiyordu, bu yüzden ilk client render'da `tempToken` hâlâ null
  görünüyor ve sayfa `/register`'a atıyordu. Kullanıcı 10 dakika kilitleniyordu.
- Aynı yönlendirme **başarılı doğrulamadan sonra** da yanlış tetikleniyordu: `setAuth()`
  `tempToken`'ı `null` yapınca efekt yeniden çalışıp `router.replace("/register")` diyor ve
  `useOtpVerify`'ın ana sayfaya yönlendirmesini eziyordu. Kullanıcı gerçekte giriş yapmış
  olmasına rağmen kayıt formuna dönüyordu. Efekt artık `accessToken` doluysa hiç yönlendirmez —
  yani "kimliği doğrulanmış kullanıcı" durumu `tempToken` yokluğundan önce gelir.
- **QA M4** — `/settings/account` `user`'a göre `<Select>` mi düz `<div>` mi render edeceğine karar
  veriyordu. `Select` `useId()` çağırdığı için sunucu ve istemci farklı hook sırası yürütüyor ve
  React "This won't be patched up" hydration hatası veriyordu.

Beklemezsen SSR/CSR uyuşmazlığı ve yanlış "oturum yok" durumu oluşur.

---

## 6. Consent (onay) mekanizmaları

Birbirinden bağımsız **iki** sistem vardır.

### 6.1 Yasal onay — engelleyici

`ConsentGateProvider` → `useConsentStatus` → `GET /consent/status`

- Yalnızca hidre olmuş ve `refreshToken` sahibi kullanıcı için çalışır (`enabled`).
- `staleTime: 0`, `refetchOnWindowFocus: true`, `retry: 1`.
- `data.blocked === true` **veya** herhangi bir maddede `requiresReaccept === true` ise
  `ConsentGateModal` gösterilir ve uygulama kilitlenir.
- Yükleniyor / hata / veri yok durumlarında **engellemez** (fail-open) — children geçer.
- `/terms`, `/privacy` ve `/explicit-consent` yollarında modal gösterilmez (kullanıcı, onaylaması
  istenen metni okuyabilsin diye). İstisna listesi: `CONSENT_GATE_EXCLUDED_PATHS`
  (`providers/ConsentGateProvider.tsx`).
- Onay `POST /consent/accept` ile gönderilir (`useAcceptConsent`).

Consent tipi **üçtür** (`types/consent.types.ts` → `ConsentType`):

| Tip                     | Etiket (`CONSENT_LABELS`) | Metin yolu (`CONSENT_PATHS`) | Modal eylem etiketi (`ACTION_LABELS`) |
| ----------------------- | ------------------------- | ---------------------------- | ------------------------------------- |
| `TERMS_OF_SERVICE`      | Kullanım Koşulları        | `/terms`                     | "Kabulünüz gerekiyor"                 |
| `PRIVACY_POLICY`        | Aydınlatma Metni          | `/privacy`                   | "Bilgilendirme — okumanız yeterli"    |
| `SPECIAL_CATEGORY_DATA` | Açık Rıza Metni           | `/explicit-consent`          | "Açık rızanız gerekiyor"              |

KVKK 2026/347 İlke Kararı ayrımı koda işlenmiştir: aydınlatma metni "kabul" edilmez —
`ConsentCheckbox` PRIVACY_POLICY için yalnızca "okudum" teyidi gösterir; açık rıza
(`SPECIAL_CATEGORY_DATA`, mezhep tercihi + ibadet kayıtları) ayrı bir kutu ve ayrı bir
irade beyanıdır. `ConsentGateModal` başlığı "Yasal metinlerimiz güncellendi", onay butonu
"Onayla ve devam et"tir; her madde için eylem etiketi yukarıdaki `ACTION_LABELS`'tan gelir.

İlgili sabitler: `CONSENT_PATHS`, `CONSENT_LABELS` (`constants/consent.ts`),
hata kodları `types/enums/consent.enums.ts` (kayıt akışında
`SPECIAL_CATEGORY_CONSENT_NOT_ACCEPTED` dahil).

### 6.2 Çerez onayı — bilgilendirici

Tamamen istemci tarafı: `useCookieConsent` → `js-cookie` ile **versiyonlu** çerez kaydı
(`namazgo-cookie-consent`, 365 gün, `sameSite: "lax"`). `COOKIE_CONSENT_VERSION = "1.0.0"`;
kayıtlı versiyon güncel versiyondan farklıysa banner tekrar gösterilir.

Kategori **ikidir** (`CookiePreferences`): `essential` (her zaman `true`'ya zorlanır) ve
`personalization`. v2.0'da analitik/pazarlama kategorileri kaldırıldı — uygulamada bu
çerezler hiç yok (KVKK Çerez Rehberi: yalnızca gerçekten kullanılan çerezler için tercih
sunulur); ileride analitik/pazarlama çerezi eklenirse kategori geri eklenip versiyon
artırılmalıdır. `CookieBanner` da yalnızca bu iki kategoriyi listeler ("Zorunlu Çerezler",
"Kişiselleştirme (Yerel Kayıtlar)").

Context olarak `CookieConsentProvider` ile dağıtılır,
`useCookieConsentContext()` ile okunur (provider dışında çağrılırsa hata fırlatır).

---

## 7. Layout ve navigasyon

`src/app/layout.tsx` provider zinciri — **sıra anlamlıdır**:

```
<QueryProvider>
  <ToastProvider>
    <CookieConsentProvider>
      <ConsentGateProvider>{children}</ConsentGateProvider>
      <CookieBanner />
    </CookieConsentProvider>
  </ToastProvider>
</QueryProvider>
```

`ConsentGateProvider` React Query kullandığı için `QueryProvider`'ın içinde kalmalıdır.

`AppLayout` (`components/layout/AppLayout.tsx`) oturum içi sayfaların iskeletidir:
sol sabit `Sidebar` (`--sidebar-width: 256px`), ortada kaydırılabilir `main`, opsiyonel
368px genişliğinde `rightPanel`. `lg` altında sidebar alt bara dönüşür
(`--mobile-bar-height: 80px`) ve düzen tek sütun olur.

`Sidebar` `user` yoksa hiçbir şey render etmez. Aktif route tespiti: `/` için tam eşitlik,
diğerleri için `startsWith`. Navigasyonda `Puan Tabloları`, `Görevler`, `Mağaza`,
`İstatistik` öğeleri **yorum satırındadır** — bu route'lar henüz mevcut değildir.

---

## 8. Route envanteri

| Route                                | Dosya                         | Tip                                                                                                     |
| ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `/`                                  | `app/page.tsx`                | Client — hidrasyon sonrası Landing / Dashboard                                                          |
| `/login`                             | `app/(auth)/login/`           | Server page + `LoginForm`                                                                               |
| `/register`                          | `app/(auth)/register/`        | Server page + `RegisterForm`, `LocationField`                                                           |
| `/verify-otp`                        | `app/(auth)/verify-otp/`      | Server page + `VerifyOtpForm`                                                                           |
| `/forgot-password`                   | `app/(auth)/forgot-password/` | Server page + form                                                                                      |
| `/reset-password`                    | `app/(auth)/reset-password/`  | Server page + `ResetPasswordClient`                                                                     |
| `/learn`                             | `app/learn/page.tsx`          | Server, `revalidate = 3600`, `LEARN_NODES` statik listesinden render                                    |
| `/learn/[id]`                        | `app/learn/[id]/`             | `generateMetadata` + `GuideClient`                                                                      |
| `/worship`                           | `app/worship/page.tsx`        | Server page + `WorshipView`                                                                             |
| `/profile/[username]`                | `app/profile/[username]/`     | `generateMetadata` + `ProfileClient`                                                                    |
| `/search`                            | `app/search/page.tsx`         | Server page + `Suspense` fallback + `SearchPageContent`                                                 |
| `/settings/profile\|account\|avatar` | `app/settings/*/`             | Server page (`noIndex`) + `*Client`                                                                     |
| `/terms`, `/privacy`                 | `app/terms/`, `app/privacy/`  | Server page + içerik bileşeni                                                                           |
| `/explicit-consent`                  | `app/explicit-consent/`       | Server page + `ExplicitConsentContent` (`LegalLayout`) — `PUBLIC_ROUTES`'ta, kayıt öncesi de okunabilir |
| `/faq`                               | `app/faq/`                    | Server, `revalidate = 86400`, `FAQ_CATEGORIES` sabitinden render — client JS yok                        |
| `/prayer-times`                   | `app/prayer-times/`        | Server, `revalidate = 3600`, `CITY_ROUTES` listesi + hub SSS                                            |
| `/prayer-times/[city]`           | `app/prayer-times/[city]/`| `generateStaticParams` (81 il) + `generateMetadata`; vakitleri sunucuda `fetch` ile çeker, ISR 1 saat    |
| `/duas`                            | `app/duas/`                 | Server, `revalidate = 86400`, `DUAS` sabitinden render                                                  |
| `/duas/[slug]`                     | `app/duas/[slug]/`          | `generateStaticParams` (15 dua) + `generateMetadata`                                                    |

`/learn/[id]` içeriği `useGuide(id)` hook'unda `switch` ile ilgili `learnService` metoduna
yönlenir; geçersiz id `Error("Invalid guide ID")` fırlatır. Yeni rehber eklerken hem
`learn.service.ts`, hem `useGuide` switch'i, hem de `app/learn/learnNodes.tsx` güncellenmelidir.

### 8.1 SEO içerik sayfaları

`/faq`, `/prayer-times*` ve `/duas*` diğer sayfalardan iki noktada ayrılır:

1. **Tamamen server component'tirler.** İçerik `"use client"` görmez, akordiyonlar native
   `<details>` ile çalışır, hiç client JS yüklemezler. Amaç metnin **ilk HTML'de** bulunmasıdır —
   hidrasyona bağlı içerik arama motoru için garanti değildir. Bu sayfalara `"use client"` ekleme.
2. **Yapısal veri (JSON-LD) taşırlar.** `src/lib/jsonld.ts` şema üreticilerini,
   `components/seo/JsonLd.tsx` bunları `<script type="application/ld+json">` olarak basar.
   Kök layout `Organization` + `WebSite`, `SeoPageShell` ise `BreadcrumbList` şemasını otomatik
   ekler; sayfa kendi `FAQPage`/`ItemList` şemasını `jsonLd` prop'uyla verir.

**Değişmez kural:** JSON-LD'ye yazılan her soru-cevap sayfada da **görünür** olmalıdır. Yalnızca
şemada bulunan içerik Google'ın yapısal veri politikasını ihlal eder ve zengin sonucun tamamen
kapatılmasına yol açar. Bu yüzden `FaqAccordion` cevabı kısaltmaz ve `buildCityFaq()` çıktısı hem
şemaya hem gövdeye aynı diziden verilir.

Vakit sayfaları backend'in oturumsuz `GET /worship/public/prayer-times` ucunu **sunucu tarafında**
tüketir (`services/public-prayer-times.service.ts`). Bu servis bilinçli olarak `axiosInstance`
kullanmaz: çağrı tarayıcıda değil render/ISR sürecinde yapılır ve auth interceptor'ları orada
anlamsızdır (aynı gerekçe `telemetry.service.ts` için de geçerlidir). Ağ hatasında `null` döner,
fırlatmaz — tek bir hata tüm production build'i düşürmemelidir; sayfa bilgilendirme gösterir ve
bir sonraki revalidate turunda kendini onarır.

`export const revalidate` değeri Next tarafından **statik olarak** okunur; sabit import edilemez,
birebir sayı olmalıdır. `PRAYER_TIMES_REVALIDATE_SECONDS` ile sayfa literalleri elle eşit tutulur.

---

## 9. Hata yönetimi

```
axios hatası
   ↓
lib/api-error.ts        getHttpStatus / getApiErrorMessage / getDomainErrorCode / getValidationCodes
   ↓
constants/error-messages.ts   UPPER_SNAKE kod → Türkçe kullanıcı mesajı
   ↓
Bileşen (Toast, form setError, ErrorState bileşenleri)
```

- `getDomainErrorCode` yanıtın birden çok alanında (`error.code`, `error.errorCode`,
  `error.message`, `code`, `message`, `error.attachment.code`) `UPPER_SNAKE` kalıbına uyan ilk
  değeri arar — backend kodu farklı alanlarda dönebildiği için.
- `retryOnServerError(max)` yalnızca 5xx'te yeniden dener.
- Form hataları react-hook-form `setError` ile alana veya `root`'a yazılır (bkz. `useLogin`).

### 9.1 Hata raporlama (client → backend telemetri)

Yakalanmamış tarayıcı hataları backend'e raporlanır ve sunucu logunda `CLIENT_ERROR` satırı olarak
izlenir (`POST /telemetry/client-errors`, bkz. `docs/API.md` §10):

```
src/instrumentation-client.ts     window "error" + "unhandledrejection" dinleyicileri
src/app/error.tsx                 route seviyesinde React render hatası (layout korunur)
src/app/global-error.tsx          kök layout çökerse (kendi <html>/<body>'sini render eder)
   ↓
src/lib/error-reporter.ts         dedupe + oturum başına ≤10 rapor + alan kırpma + döngü koruması
   ↓
src/services/telemetry.service.ts fetch keepalive — bilerek axiosInstance DIŞINDA
```

- **KVKK:** URL'nin yalnızca `pathname`'i gönderilir — query string ve hash (reset-password
  token'ı, `callbackUrl`) asla gönderilmez. Çerez/oturum bilgisi taşınmaz.
- **Döngü koruması:** telemetri endpoint'inin kendi hatası raporlanmaz; `fetch` hatası sessizce
  yutulur; aynı `source:message` ikilisi oturumda bir kez gider; `"Script error."` (cross-origin,
  bilgi taşımaz) atlanır.
- `telemetryService` `axiosInstance` kullanmaz: interceptor'lardan geçse 401'de refresh kuyruğunu
  tetiklerdi ve raporlayıcının kendisi hata üretip döngü oluşturabilirdi; `keepalive` sayfa
  kapanırken bile isteği tamamlar.
- Raporlama backend'in erişim loguna ek **hata** telemetrisidir; başarılı işlemler zaten backend
  tarafında her istek için loglanır (kible `ARCHITECTURE.md` → Logging).

---

## 10. Konum (il seçimi)

Uygulama kullanıcıdan **hiçbir zaman** GPS/koordinat (enlem/boylam) almaz. Kayıt ve
`/settings/account` ekranında kullanıcı yalnızca **ilini** seçer (`LocationField`, `TR_CITIES`
listesi); backend'e sadece `country` + `city` gönderilir. Namaz vakti, kıble ve saat dilimi
için gereken koordinatlar backend'de seçilen ilden türetilir.

- Tarayıcı Geolocation API'si (`navigator.geolocation`) **kullanılmaz**; `useGeolocation` hook'u
  kaldırılmıştır.
- BigDataCloud ters coğrafi kodlama (reverse-geocode) **kaldırılmıştır**; `lib/geocode.ts` artık
  yalnızca saf yerel yardımcılar içerir: `matchTrCity` (il adı normalize edip `TR_CITIES`'e eşler),
  `nearestTrCity` / `haversineKm` (backend'in döndüğü koordinattan en yakın il etiketini bulmak
  için worship ekranında kullanılır). Dışarıya ağ isteği yapılmaz.
- `/tools/qibla` kıbleyi kayıtlı ile göre hesaplar (cihaz konumu seçeneği yoktur); pusula yönü
  `useDeviceCompass` (`deviceorientation`) ile okunur — bu koordinat değil, yön sensörüdür.

**Şu an yalnızca Türkiye desteklenir** (kayıt zod şeması `country`'yi `"Türkiye"` ile sınırlar).

---

## 11. Güvenlik başlıkları (`next.config.ts`)

`poweredByHeader: false` — `X-Powered-By: Next.js` artık gönderilmiyor. `headers()` tüm yollara
(`/:path*`) şu başlıkları ekler:

| Başlık                      | Değer                                            |
| --------------------------- | ------------------------------------------------ |
| `Content-Security-Policy`   | aşağıya bak                                      |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload`   |
| `X-Content-Type-Options`    | `nosniff`                                        |
| `X-Frame-Options`           | `DENY`                                           |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                |
| `Permissions-Policy`        | kamera/mikrofon/ödeme kapalı, sensörler `(self)` |

`Permissions-Policy` içinde `accelerometer`, `gyroscope` ve `magnetometer` **`(self)`
bırakılmıştır**: üçü de `useDeviceCompass` (`deviceorientation` / `deviceorientationabsolute`) için
gerekir — tarayıcılar bu olayları üç sensör iznine birden bağlar, yani birini `()` yapmak
`/tools/qibla` pusulasını sessizce öldürür. `geolocation` artık **`()`** (kapalı): uygulama tarayıcı
konum servisini hiç kullanmıyor. Kapalı olanlar: `camera`, `display-capture`, `geolocation`,
`microphone`, `payment`, `usb`.

CSP direktifleri:

- `default-src 'self'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`,
  `object-src 'none'`, `upgrade-insecure-requests`
- `img-src 'self' data: blob:` — avatar/OG üretimi data URI kullanıyor
- `font-src 'self'` / `style-src 'self' 'unsafe-inline'` — fontlar `next/font` ile bundle'a
  gömülü ve kendi origin'imizden servis edilir; Google Fonts'a (`fonts.gstatic.com` /
  `fonts.googleapis.com`) artık istek gitmez, bu yüzden bu origin'ler CSP'den de çıkarıldı
- `connect-src` `'self'` + `NEXT_PUBLIC_API_URL`'in **origin**'i. Backend adresi değişirse başlık
  kendiliğinden uyar; ortam değişkeni geçersizse origin boş kalır ve API çağrıları CSP'ye takılır.
  (BigDataCloud kaldırıldığı için artık `api.bigdatacloud.net` yoktur.)
- `script-src 'self' 'unsafe-inline'`, dev'de ek olarak `'unsafe-eval'`

`script-src 'unsafe-inline'` **bilinen ve açık bir tavizdir**: Next'in App Router'ı hidrasyon
verisini satır içi `<script>` ile gönderir.

**Nonce denendi ve geri alındı — tekrar denemeden önce oku.** `middleware.ts` bir süre istek başına
nonce üretip `script-src 'nonce-…' 'strict-dynamic'` yayınladı. `next dev`'de doğru çalışıyordu,
çünkü dev sunucusu her sayfayı istek anında render eder. **Üretim build'inde uygulama bembeyaz
açılıyordu:** Next nonce'u yalnızca dinamik render edilen (`ƒ`) yanıtların HTML'ine basar, bu
uygulamanın sayfalarının neredeyse tamamı ise statik ön-render'dır (`○` / `●` — `/`, `/login`,
`/learn`, `/tools/*`, `/terms`, `/settings/*` …). Statik HTML build anında üretildiği için
içindeki script etiketlerinde nonce yoktur, oysa middleware her yanıta taze bir nonce yazar; üstelik
`'strict-dynamic'` varken tarayıcı `'self'`i yok sayar, dolayısıyla **tüm** script'ler bloklanır.
Ölçüm: `next start` + `/login` → 22 script, 0'ında nonce; dinamik render edilen `/reset-password`
→ 14 script, 14'ünde nonce. Statik ön-render'dan vazgeçmek de çözüm değil — `/learn` ve `/tools/*`
bilinçli olarak statik ve indekslenebilir. Bu boşluğu kapatmanın yolu nonce değil; satır içi
script'i tamamen ortadan kaldıran bir render stratejisi ya da `require-trusted-types-for 'script'`.

Buna karşılık politikanın geri kalanı gerçek koruma sağlar: `script-src 'self'` dış kaynaklı script
yüklenmesini engeller (`<script src="//saldirgan">` kapalı), `object-src 'none'` + `base-uri 'self'`

- `form-action 'self'` + `frame-ancestors 'none'` klasik kaçış yollarını kapatır, dar `connect-src`
  veri sızdırma kanalını daraltır. Yeni bir üçüncü taraf origin'i (analitik, harita, font) eklemeden
  önce ilgili direktifi burada güncelle — aksi halde tarayıcı isteği sessizce bloklar.
