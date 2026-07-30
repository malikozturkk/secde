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

| Katman | Konum | Sorumluluk | Yapmaması gereken |
|---|---|---|---|
| Service | `src/services/*.service.ts` | Endpoint yolu, HTTP metodu, request/response tipi | State tutmak, hata mesajı üretmek |
| Hook | `src/hooks/**/use*.ts` | React Query key/config, `ApiResponse` zarfını açmak, cache invalidation | JSX döndürmek |
| Bileşen | `src/components/**`, `src/app/**` | Sunum + etkileşim | Doğrudan axios/fetch çağırmak |
| Store | `src/store/auth.store.ts` | Oturum durumu, cookie yazma/silme | Sunucu verisi cache'lemek |
| Lib | `src/lib/**` | Saf yardımcılar, axios instance, view-model üreticileri | React'e bağımlı olmak (`utils` dosyaları saf) |
| Constants | `src/constants/**` | Sabitler, query key fabrikaları, hata sözlüğü | İş mantığı |

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
    queryKey: params ? WORSHIP_QUERY_KEYS.times(params) : ["worship", "times", "disabled"],
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

| Hook | Topladığı şey |
|---|---|
| `useWorshipController` | Seçili tarih, gün ileri/geri/bugün gezinmesi, `useWorshipTimes`, gün değişimi izleme (`useDayChange`), manuel `refresh` |
| `useStreakController` | Bugünün tarihi, `useDailyPrayers` + `useSelfStats`, saniyelik tik (`useNowTicker`), view-model üretimi, kutlama (celebration) state'i |

DTO → view-model dönüşümü bileşende değil `src/lib/*-utils.ts` içindeki saf fonksiyonlarda
yapılır (`buildDailyPrayersViewModel`, `buildLocalDateString`, `addDays`, `roundCoordinate`).

Yeni karmaşık bir ekran eklerken bu kalıbı izle: **query hook'ları + saf util → controller
hook → View bileşeni.**

---

## 4. React Query yapılandırması

Varsayılanlar `src/providers/QueryProvider.tsx` içinde:

```ts
{ queries: { retry: 1, staleTime: 1000 * 60 * 5 } }
```

`QueryClient` `useState` içinde oluşturulur (her render'da yeniden yaratılmaz).

Sorguya özel ayarlar ilgili `constants` dosyasından gelir:

| Sabit | Değer | Kaynak |
|---|---|---|
| `DAILY_PRAYERS_STALE_TIME_MS` | 60 sn | `constants/streak.ts` |
| `DAILY_PRAYERS_REFRESH_INTERVAL_MS` | 5 dk | `constants/streak.ts` |
| `STREAK_TICK_INTERVAL_MS` | 1 sn | `constants/streak.ts` |
| `WORSHIP_STALE_TIME`, `WORSHIP_REFRESH_INTERVAL` | — | `constants/worship.ts` |

### Query key fabrikaları

```ts
GAMIFICATION_QUERY_KEYS.all                       // ["gamification"]
GAMIFICATION_QUERY_KEYS.dailyPrayers({ date })    // ["gamification","daily-prayers",{date}]
GAMIFICATION_QUERY_KEYS.prayerQuestions({ prayerType })
WORSHIP_QUERY_KEYS.all / .times(params)
USER_STATS_QUERY_KEYS.me() / .user(username)
CONSENT_QUERY_KEYS.status
```

### Mutation sonrası cache güncelleme

`useAnswerPrayerQuestion` iki aşamalı çalışır ve iyi bir örnektir:

1. `setQueryData` ile quiz sorularını **yerinde** günceller (yeniden istek atmadan).
2. Yanıt `prayerCompletion` içeriyorsa `daily-prayers` + kendi istatistikleri + profil
   istatistiklerini `invalidateQueries` ile tazeler.

Yeni mutation yazarken: neyin yerinde güncelleneceğini, neyin invalidate edileceğini bilinçli seç.

---

## 5. Kimlik doğrulama

### 5.1 Durum nerede tutulur

| Veri | Yer | Kalıcı mı |
|---|---|---|
| `accessToken` | Zustand state + `auth-token` cookie | localStorage'a **yazılmaz** |
| `refreshToken` | Zustand state + localStorage (`auth-storage`) | Evet |
| `user` | Zustand state + localStorage | Evet |
| `tempToken` | Zustand state | Hayır (kayıt/OTP akışı için geçici) |

`partialize` yalnızca `refreshToken` ve `user`'ı persist eder.

Cookie `js-cookie` ile client tarafında yazılır:
`secure: production`, `sameSite: "lax"`. **`httpOnly` değildir** — JS ile okunabilir.
Auth akışına dokunacak değişikliklerde bu kısıtı göz önünde bulundur.

### 5.2 axios interceptor'ları (`src/lib/axios.ts`)

**Request:** `Authorization: Bearer <accessToken>` — önce store, yoksa cookie.

**Response (401/403):**

```
401/403 geldi
 ├─ zaten retry edildi? ──────────────┐
 ├─ istek /auth/refresh mi? ──────────┤→ hatayı olduğu gibi fırlat
 ├─ istek /auth/login mi? ────────────┘
 │
 ├─ şu an başka bir refresh sürüyor? → isteği failedQueue'ya koy, token gelince tekrar dene
 │
 └─ değilse: isRefreshing = true
      POST /auth/refresh { refreshToken }
        ├─ başarılı → setAuth(tokens), kuyruğu boşalt, orijinal isteği tekrar dene
        └─ başarısız → kuyruğu reddet, clearAuth(), window.location.href = "/login"
```

Bu **tek uçuşlu (single-flight)** refresh'tir: eşzamanlı 401'ler tek bir refresh isteği doğurur.
Bu mekanizmayı sadeleştirmeye çalışırken kuyruk mantığını bozma.

### 5.3 Middleware (`src/middleware.ts`)

Yalnızca `auth-token` cookie'sinin **varlığına** bakar; token doğrulaması yapmaz.

```ts
PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password",
                 "/reset-password", "/verify-otp", "/terms", "/privacy"]
AUTH_ROUTES   = ["/login", "/register", "/forgot-password", "/reset-password"]
DEFAULT_AUTHENTICATED_REDIRECT   = "/"
DEFAULT_UNAUTHENTICATED_REDIRECT = "/"
```

- Oturumlu kullanıcı `AUTH_ROUTES`'a girerse → `/`
- Oturumsuz kullanıcı public olmayan bir yola girerse → `/?callbackUrl=<path>`

**Not:** `DEFAULT_UNAUTHENTICATED_REDIRECT` `/login` değil `/`'dir; `/` oturumsuzken Landing
gösterdiği için akış tutarlıdır. Buna karşılık axios refresh hatası `/login`'e yönlendirir.
İki farklı yol kasıtlı görünüyor — "tutarsızlık" diye tek taraflı değiştirme.

`matcher` statik dosyaları ve yaygın görsel uzantılarını hariç tutar.

### 5.4 Kayıt ve OTP akışı

```
POST /auth/register  →  { tempToken }
        ↓  setTempToken(tempToken)
   /verify-otp  ──  POST /otp/verify   (Authorization: Bearer <tempToken>)
                └─  POST /otp/resend   (Authorization: Bearer <tempToken>)
        ↓
   oturum tokenları  →  setAuth()
```

`tempToken` isteğe **açıkça** header olarak verilir (`otp.service.ts`), interceptor'dan
gelmez. Şifre sıfırlama ayrı akıştır: `/auth/forgot-password` →
`/auth/validate-reset-token` → `/auth/reset-password`.

### 5.5 Hidrasyon

Zustand `persist` istemcide asenkron hidre olur. Auth durumuna bakan üst-seviye bileşenler
hidrasyonu beklemek zorundadır:

| Yer | Yöntem |
|---|---|
| `src/app/page.tsx` | `useState` + `useEffect` ile `hydrated` bayrağı, o ana kadar splash |
| `src/providers/ConsentGateProvider.tsx` | `useSyncExternalStore` + `useAuthStore.persist.onFinishHydration()` |

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
- `/terms` ve `/privacy` yollarında modal gösterilmez (kullanıcı metni okuyabilsin diye).
- Onay `POST /consent/accept` ile gönderilir (`useAcceptConsent`).

İlgili sabitler: `CONSENT_PATHS`, `CONSENT_LABELS` (`constants/consent.ts`),
hata kodları `types/enums/consent.enums.ts`.

### 6.2 Çerez onayı — bilgilendirici

Tamamen istemci tarafı: `useCookieConsent` → localStorage'da **versiyonlu** kayıt
(`COOKIE_CONSENT_VERSION`). Versiyon değişirse banner tekrar gösterilir. `essential` tercihi
her zaman `true`'ya zorlanır. Context olarak `CookieConsentProvider` ile dağıtılır,
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

| Route | Dosya | Tip |
|---|---|---|
| `/` | `app/page.tsx` | Client — hidrasyon sonrası Landing / Dashboard |
| `/login` | `app/(auth)/login/` | Server page + `LoginForm` |
| `/register` | `app/(auth)/register/` | Server page + `RegisterForm`, `LocationField` |
| `/verify-otp` | `app/(auth)/verify-otp/` | Server page + `VerifyOtpForm` |
| `/forgot-password` | `app/(auth)/forgot-password/` | Server page + form |
| `/reset-password` | `app/(auth)/reset-password/` | Server page + `ResetPasswordClient` |
| `/learn` | `app/learn/page.tsx` | Server, `revalidate = 3600`, `LEARN_NODES` statik listesinden render |
| `/learn/[id]` | `app/learn/[id]/` | `generateMetadata` + `GuideClient` |
| `/worship` | `app/worship/page.tsx` | Server page + `WorshipView` |
| `/profile/[username]` | `app/profile/[username]/` | `generateMetadata` + `ProfileClient` |
| `/search` | `app/search/page.tsx` | Server page + `Suspense` fallback + `SearchPageContent` |
| `/settings/profile\|account\|avatar` | `app/settings/*/` | Server page (`noIndex`) + `*Client` |
| `/terms`, `/privacy` | `app/terms/`, `app/privacy/` | Server page + içerik bileşeni |

`/learn/[id]` içeriği `useGuide(id)` hook'unda `switch` ile ilgili `learnService` metoduna
yönlenir; geçersiz id `Error("Invalid guide ID")` fırlatır. Yeni rehber eklerken hem
`learn.service.ts`, hem `useGuide` switch'i, hem de `app/learn/learnNodes.tsx` güncellenmelidir.

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

---

## 10. Konum (geolocation)

`useGeolocation` (`hooks/worship/`) tarayıcı Geolocation API'sini sarar:

- Güvenli bağlam kontrolü (`isSecureContext`, `localhost`/`127.0.0.1`/`[::1]` istisnası).
- İki aşamalı deneme: önce hızlı (`enableHighAccuracy: false`, 8 sn, 5 dk cache), başarısızsa
  hassas (`true`, 15 sn, cache yok).
- `navigator.permissions.query` ile izin durumu proaktif izlenir.
- Tüm hata sebepleri `GeolocationStatus` enum'una ve Türkçe mesaja eşlenir.

`lib/geocode.ts` BigDataCloud reverse-geocode servisiyle koordinatı ülke/şehre çevirir ve
`TR_CITIES` listesine haversine mesafesiyle eşler. **Şu an yalnızca Türkiye desteklenir**
(kayıt zod şeması `country`'yi `"Türkiye"` ile sınırlar).
