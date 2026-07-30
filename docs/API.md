# Backend API sözleşmesi

Bu doküman, frontend'in **tükettiği** backend REST API'sini tarif eder. Kaynak:
`src/services/*.service.ts` ve `src/types/**`. Backend bu repoda değildir; buradaki bilgi
istemcinin ne beklediğini gösterir.

- Kök adres: `NEXT_PUBLIC_API_URL` (axios `baseURL`)
- İstemci: `src/lib/axios.ts` (`axiosInstance`)
- Varsayılan header: `Content-Type: application/json`
- Yetki: `Authorization: Bearer <accessToken>` — request interceptor otomatik ekler
  (istisna: OTP uçları `tempToken`'ı açıkça geçirir)

---

## 1. Yanıt zarfı

Tüm uçlar aynı zarfı döner (`src/types/api.types.ts`):

```ts
interface ApiResponse<T = null> {
  date: number;
  success: boolean;
  data: T | null;
  error: {
    code: number;
    message: string;
    attachment: unknown | null;
  } | null;
}
```

Hook'lar `data.data`'yı açar ve `null` ise `Error` fırlatır.

### Hata kodları

Kullanıcıya gösterilecek alan-hataları `UPPER_SNAKE_CASE` string kodlardır. İstemci bu kodu
yanıtın birden çok alanında arar (`error.code`, `error.errorCode`, `error.message`, `code`,
`message`, `error.attachment.code`) — bkz. `getDomainErrorCode`.

Tanınan kodlar: `src/types/enums/auth.enums.ts` (`AuthErrorCode`),
`src/types/enums/consent.enums.ts` (`ConsentErrorCode`).
Türkçe karşılıkları: `src/constants/error-messages.ts`.

**HTTP 401/403** özel anlam taşır: axios interceptor otomatik `/auth/refresh` denemesi yapar
(detay → [ARCHITECTURE.md §5.2](ARCHITECTURE.md#52-axios-interceptorları-srclibaxiosts)).

---

## 2. Auth — `src/services/auth.service.ts`

| Metot | Uç | Gövde / Parametre | `data` yanıtı |
|---|---|---|---|
| POST | `/auth/register` | `RegisterPayload` | `{ tempToken: string }` |
| POST | `/auth/login` | `{ identifier, password }` | `{ accessToken, refreshToken, user }` |
| POST | `/auth/refresh` | `{ refreshToken }` | `{ accessToken, refreshToken, user }` |
| GET | `/auth/{username}` | — | `UserDetail` |
| PATCH | `/auth/profile` | `UpdateProfilePayload` | `User` |
| POST | `/auth/logout` | `{ refreshToken }` | `null` |
| POST | `/auth/forgot-password` | `{ email }` | `{ message: "FORGOT_PASSWORD_EMAIL_SENT" }` |
| POST | `/auth/validate-reset-token` | `{ userId, token }` | `boolean` |
| POST | `/auth/reset-password` | `{ userId, token, newPassword, confirmPassword }` | `null` |
| POST | `/auth/{username}/follow` | — | `{ following: boolean }` (toggle) |
| GET | `/auth/{username}/followers` | — | `{ username, avatar, avatarCustomization }[]` |
| GET | `/auth/{username}/following` | — | `{ username, avatar, avatarCustomization }[]` |

### `RegisterPayload`

```ts
{
  username: string;          // 3–20, /^[a-zA-Z0-9_]+$/
  email: string;
  password: string;          // min 8
  gender: "MALE" | "FEMALE";
  country: string;           // şu an yalnızca "Türkiye"
  city: string;
  latitude: number;          // -90..90
  longitude: number;         // -180..180
  madhab: "SHAFI" | "HANAFI";
  language: "tr";
  termsAccepted: boolean;    // true olmalı
  privacyPolicyAccepted: boolean; // true olmalı
}
```

Doğrulama `src/validations/auth.validation.ts` (zod) içindedir; sunucu tarafı doğrulamasının
aynası değil, istemci ön kontrolüdür.

### `User` / `UserDetail`

```ts
User = {
  id, username, email,
  avatar: string | null,
  avatarCustomization: AvatarCustomization,
  country, city,
  madhab: "SHAFI" | "HANAFI",
  language: string
}

UserDetail = User & {
  followingCount, followerCount,
  isFollowing: boolean | null,
  mutualFollowers: { count, preview: {username, avatar, avatarCustomization}[] },
  createdAt, updatedAt?
}
```

`AvatarCustomization` = `{ gender, colors: {iris, pupil, hair, skin, lips, nose, earInner,
eyebrow, outfit, background}, accessories }` — avatar tamamen renk konfigürasyonundan
üretilir, sunucuda görsel yoktur (bkz. `DefaultAvatar`, `src/lib/avatar-utils.ts`).

---

## 3. OTP — `src/services/otp.service.ts`

| Metot | Uç | Header | `data` |
|---|---|---|---|
| POST | `/otp/verify` | `Authorization: Bearer <tempToken>` | `OtpVerifyResponseData` |
| POST | `/otp/resend` | `Authorization: Bearer <tempToken>` | `null` |

`tempToken` `/auth/register` yanıtından gelir ve store'da `tempToken` alanında tutulur.
Bu iki uç, interceptor'ın eklediği access token'ı **override eder**.

OTP kodu: 6 haneli, yalnızca rakam (zod `otpSchema`).

---

## 4. Consent — `src/services/consent.service.ts`

| Metot | Uç | Gövde | `data` |
|---|---|---|---|
| GET | `/consent/status` | — | `{ items: ConsentStatusItem[], blocked: boolean }` |
| POST | `/consent/accept` | `{ type, version }` | `null` |

```ts
ConsentStatusItem = {
  type: "TERMS_OF_SERVICE" | "PRIVACY_POLICY";
  acceptedVersion: string | null;
  currentVersion: string;
  requiresReaccept: boolean;
}
```

`blocked === true` veya herhangi bir maddede `requiresReaccept === true` ise istemci
uygulamayı engelleyici modal ile kilitler.

---

## 5. Worship (namaz vakitleri) — `src/services/worship.service.ts`

| Metot | Uç | Query | `data` |
|---|---|---|---|
| GET | `/worship` | `date` (yerel `YYYY-MM-DD`) | `WorshipData` |

```ts
WorshipData = {
  meta: {
    latitude, longitude, timezone,
    gregorianDate, hijriDate, hijriMonthName,
    calculationMethod, madhab
  },
  times: Record<"fajr"|"sunrise"|"dhuhr"|"asr"|"maghrib"|"isha", {
    time: string;              // görüntülenecek saat
    iso: string;
    remainingSeconds: number;
    isNext: boolean;
    isPassed: boolean;
  }>,
  nextPrayer: PrayerKey,
  nextPrayerAt: string,
  secondsUntilNext: number,
  lastPrayer: PrayerKey | null,
  dayProgressPercent: number,
  fasting: {
    isRamadan, isFastingTime,
    fastingStart, fastingEnd,
    remainingSeconds, progressPercent,
    ramadan: { day, totalDays } | null
  } | null
}
```

Konum ve hesaplama yöntemi istekte gönderilmez — backend, kullanıcının kayıtlı
konumu/mezhebi üzerinden hesaplar. İstemci tarafındaki konum (`useGeolocation`) kayıt ve
konum güncelleme akışlarında kullanılır.

---

## 6. Gamification (seri & quiz) — `src/services/gamification.service.ts`

| Metot | Uç | Gövde / Query | `data` |
|---|---|---|---|
| GET | `/gamification/daily-prayers` | `date` | `DailyPrayersResponse` |
| GET | `/gamification/prayer-questions/{prayerType}` | — | `PrayerQuestionsResponse` |
| POST | `/gamification/prayer-questions/{quizId}/questions/{questionId}/start` | — | `StartPrayerQuestionResponse` |
| POST | `/gamification/prayer-questions/{quizId}/questions/{questionId}/answer` | `{ optionId }` | `AnswerPrayerQuestionResponse` |
| POST | `/gamification/action` | `{ actionType, clientRequestId? }` | `GamificationActionResponse` |

Yol parametreleri `encodeURIComponent` ile kodlanır.

### Günlük vakitler

```ts
DailyPrayersResponse = {
  date, timezone,
  isFriday, isRamadan, isEidDay,
  prayers: PrayerCardDto[]
}

PrayerCardDto = {
  type: PrayerType;                 // FAJR | DHUHR | ASR | MAGHRIB | ISHA | JUMUAH | TERAVIH | BAYRAM
  category: PrayerCategory;         // OBLIGATORY | FRIDAY | TARAWEEH | EID
  isObligatory: boolean;
  scheduledAt, windowStartsAt, windowEndsAt: string;
  xpReward: number;
  isCompleted: boolean;
  canMarkAsCompleted: boolean;
  completedAt: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
}
```

### Quiz akışı

```
GET  /gamification/prayer-questions/{prayerType}
        → { quizId, expiresAt, quizStatus, isLocked, questions[] }
POST .../{quizId}/questions/{questionId}/start
        → soru "gösterildi" olarak işaretlenir, deadlineAt başlar
POST .../{quizId}/questions/{questionId}/answer  { optionId }
        → { quizId, quizStatus, result, isLocked, question, prayerCompletion? }
```

- Soru başına süre sınırı `timeLimitSeconds`; başlatıldıktan sonra `deadlineAt` dolar.
- Quiz durumu: `PENDING | PASSED | FAILED | EXPIRED`;
  soru durumu: `PENDING | SHOWN | CORRECT | INCORRECT | EXPIRED | LOCKED`;
  cevap sonucu: `CORRECT | INCORRECT | EXPIRED`.
- Yanıtta **`prayerCompletion` alanı varsa** vakit işaretlenmiş demektir; XP, seviye ve seri
  bilgisi bu nesnede döner:
  ```ts
  { prayerCompletionId, prayerType, prayerDate, completedAt,
    xpAwarded, xpAfter, level, leveledUp,
    streakAdvanced, currentStreak, longestStreak, isFirstOfDay }
  ```
- `isLocked === true` ise o vakit için quiz kilitlenmiştir.
- İstemci sabiti: `PRAYER_QUIZ_QUESTION_COUNT = 3`.

### Aksiyonlar

`actionType` şu an tek değer alır: `STREAK_FREEZE` (`GamificationActionType`).
Yanıt `streakFreezeUsage` içerir:
`{ currentStreak, longestStreak, freezesRemaining, protectedDates, alreadyApplied }`.
İstemci sabiti: `STREAK_FREEZE_MAX_SLOTS = 3`.

`clientRequestId` idempotency için opsiyonel gönderilir.

---

## 7. Users — `src/services/user.service.ts`

| Metot | Uç | Query | `data` |
|---|---|---|---|
| GET | `/users/search` | `query`, `pageSize`, `cursor?` | `SearchUsersResponse` |
| GET | `/users/me/stats` | — | `SelfStats` |
| GET | `/users/{username}/stats` | — | `PublicStats` |

```ts
SearchUsersResponse = {
  users: {
    username, avatar, avatarCustomization,
    isFollowing: boolean,
    mutualFollowers: { count, preview[] }
  }[],
  totalCount: number,
  nextCursor: number | null      // cursor tabanlı sayfalama
}
```

`cursor` yalnızca `null` değilse query'e eklenir.

### İstatistikler

```ts
PublicStats = {
  username, avatarCustomization, joinedAt,
  level:   { level, badgeKey, progressPercent },
  streak:  { current, longest },
  prayers: { totalCompleted, breakdown },
  social:  { followerCount, followingCount },
  isSelf:  boolean
}

// SelfStats, PublicStats'ı genişletir:
level   += { xp, totalXp, currentLevelXp, xpToNextLevel, totalXpForNextLevel }
streak  += { freezeCount, lastActiveDate }
prayers += { lastCompletedAt, quiz: { totalAttempts, passed, failed, accuracyPercent } }
```

`breakdown` anahtarları: `fajr, dhuhr, asr, maghrib, isha, jumuah, tarawih, eidFitr, eidAdha`.
**Dikkat:** burada `tarawih` yazımı kullanılır; `PrayerType` enum'unda karşılığı `TERAVIH`'tir.

---

## 8. Learn (rehberler) — `src/services/learn.service.ts`

| Metot | Uç | `data` |
|---|---|---|
| GET | `/guides/wudu` | `GuideData` |
| GET | `/guides/ghusl` | `GuideData` |
| GET | `/guides/fajr` | `GuideData` |
| GET | `/guides/dhuhr` | `GuideData` |
| GET | `/guides/asr` | `GuideData` |
| GET | `/guides/maghrib` | `GuideData` |
| GET | `/guides/isha` | `GuideData` |
| GET | `/guides/jumuah` | `GuideData` |
| POST | `/question/guide/check` | `GuideCheckQuestionResponse` |

```ts
GuideData = {
  id, title, description,
  steps: {
    id, name, shortDescription, description,
    recitation?, tips?, rekat?, bodyPart?, repeat?, isFard?,
    step, totalSteps,
    type: StepType,
    randomQuestion?: { id, question, options: string[] }
  }[]
}
```

`StepType` değerleri ikon ve görsel eşlemelerinin anahtarıdır
(`stepIconMap`, `stepImageMap` — `src/lib/utils.ts`):

- Namaz: `takbir`, `standing`, `ruku`, `after_standing`, `prostration`, `salutation`
- Cuma: `khutbah`
- Abdest: `wash_hands`, `wash_mouth`, `wash_nose`, `wash_face`, `wash_arms`, `anoint_head`,
  `wash_ears`, `wash_feet`
- Gusül: `intend`, `wash_private`, `full_ablution`, `wash_head`, `wash_body`, `control`

Backend yeni bir `StepType` gönderirse istemcide ikon/görsel eşlemesi **eksik kalır** —
`stepIconMap` ve `stepImageMap` `Record<StepType, ...>` olduğu için enum'a ekleme yapılırken
her iki harita da güncellenmelidir.

**Yeni rehber eklerken güncellenecek üç yer:** `learn.service.ts`, `hooks/learn/useGuide.ts`
(switch), `app/learn/learnNodes.tsx`.

---

## 9. Harici servis

| Servis | Kullanım | Kaynak |
|---|---|---|
| BigDataCloud reverse-geocode | Koordinat → ülke/şehir (kayıt ve konum seçimi) | `src/lib/geocode.ts` |

Bu çağrı `axiosInstance` üzerinden **geçmez**, anahtar gerektirmez ve 10 sn timeout'ludur.
