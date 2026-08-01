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

| Metot | Uç                           | Gövde / Parametre                                 | `data` yanıtı                                 |
| ----- | ---------------------------- | ------------------------------------------------- | --------------------------------------------- |
| POST  | `/auth/register`             | `RegisterPayload`                                 | `{ tempToken: string }`                       |
| POST  | `/auth/login`                | `{ identifier, password }`                        | `{ accessToken, refreshToken, user }`         |
| POST  | `/auth/refresh`              | `{ refreshToken }`                                | `{ accessToken, refreshToken, user }`         |
| GET   | `/auth/{username}`           | —                                                 | `UserDetail`                                  |
| PATCH | `/auth/profile`              | `UpdateProfilePayload`                            | `User`                                        |
| POST  | `/auth/logout`               | `{ refreshToken }`                                | `null`                                        |
| POST  | `/auth/forgot-password`      | `{ email }`                                       | `{ message: "FORGOT_PASSWORD_EMAIL_SENT" }`   |
| POST  | `/auth/validate-reset-token` | `{ userId, token }`                               | `boolean`                                     |
| POST  | `/auth/reset-password`       | `{ userId, token, newPassword, confirmPassword }` | `null`                                        |
| POST  | `/auth/{username}/follow`    | —                                                 | `{ following: boolean }` (toggle)             |
| GET   | `/auth/{username}/followers` | —                                                 | `{ username, avatar, avatarCustomization }[]` |
| GET   | `/auth/{username}/following` | —                                                 | `{ username, avatar, avatarCustomization }[]` |

### `RegisterPayload`

```ts
{
  username: string; // 3–20, /^[a-zA-Z0-9_]+$/
  email: string;
  password: string; // min 8
  gender: "MALE" | "FEMALE";
  country: string; // şu an yalnızca "Türkiye"
  city: string;
  latitude: number; // -90..90
  longitude: number; // -180..180
  madhab: "SHAFI" | "HANAFI";
  language: "tr";
  termsAccepted: boolean; // true olmalı
  privacyPolicyAccepted: boolean; // true olmalı
}
```

Doğrulama `src/validations/auth.validation.ts` (zod) içindedir; sunucu tarafı doğrulamasının
aynası değil, istemci ön kontrolüdür.

### `UpdateProfilePayload`

```ts
{
  username?, avatar?, currentPassword?, newPassword?, language?,
  // Konum + mezhep: namaz vakitleri bunlardan türetildiği için kayıt sonrası da
  // değiştirilebilir. Dördü birlikte gönderilir; eksik gönderim backend'de
  // INCOMPLETE_LOCATION_UPDATE ile reddedilir. `madhab` tek başına gönderilebilir.
  country?, city?, latitude?, longitude?,
  madhab?: "SHAFI" | "HANAFI"
}
```

`/settings/account` bu payload'ı kayıt formundaki `LocationField` bileşeniyle üretir — şehir
seçimi koordinatları da beraberinde getirir.

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

| Metot | Uç            | Header                              | `data`                  |
| ----- | ------------- | ----------------------------------- | ----------------------- |
| POST  | `/otp/verify` | `Authorization: Bearer <tempToken>` | `OtpVerifyResponseData` |
| POST  | `/otp/resend` | `Authorization: Bearer <tempToken>` | `null`                  |

`tempToken` `/auth/register` yanıtından gelir ve store'da `tempToken` alanında tutulur.
Bu iki uç, interceptor'ın eklediği access token'ı **override eder**.

OTP kodu: 6 haneli, yalnızca rakam (zod `otpSchema`).

---

## 4. Consent — `src/services/consent.service.ts`

| Metot | Uç                | Gövde               | `data`                                             |
| ----- | ----------------- | ------------------- | -------------------------------------------------- |
| GET   | `/consent/status` | —                   | `{ items: ConsentStatusItem[], blocked: boolean }` |
| POST  | `/consent/accept` | `{ type, version }` | `null`                                             |

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

| Metot | Uç         | Query                       | `data`        |
| ----- | ---------- | --------------------------- | ------------- |
| GET   | `/worship` | `date` (yerel `YYYY-MM-DD`) | `WorshipData` |

```ts
WorshipData = {
  meta: {
    latitude,
    longitude,
    timezone,
    gregorianDate,
    hijriDate,
    hijriMonthName,
    calculationMethod,
    madhab,
  },
  times: Record<
    "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha",
    {
      time: string; // görüntülenecek saat
      iso: string;
      remainingSeconds: number;
      isNext: boolean;
      isPassed: boolean;
    }
  >,
  nextPrayer: PrayerKey,
  nextPrayerAt: string,
  secondsUntilNext: number,
  lastPrayer: PrayerKey | null,
  dayProgressPercent: number,
  fasting:
    {
      isRamadan,
      isFastingTime,
      fastingStart,
      fastingEnd,
      remainingSeconds,
      progressPercent,
      ramadan: { day, totalDays } | null,
    } | null,
};
```

Konum ve hesaplama yöntemi istekte gönderilmez — backend, kullanıcının kayıtlı
konumu/mezhebi üzerinden hesaplar. İstemci tarafındaki konum (`useGeolocation`) kayıt ve
konum güncelleme akışlarında kullanılır.

---

## 6. Gamification (seri & quiz) — `src/services/gamification.service.ts`

| Metot | Uç                                                                      | Gövde / Query                      | `data`                         |
| ----- | ----------------------------------------------------------------------- | ---------------------------------- | ------------------------------ |
| GET   | `/gamification/daily-prayers`                                           | `date`                             | `DailyPrayersResponse`         |
| GET   | `/gamification/prayer-history`                                          | `from`, `to`                       | `PrayerHistoryResponse`        |
| GET   | `/gamification/prayer-questions/{prayerType}`                           | —                                  | `PrayerQuestionsResponse`      |
| POST  | `/gamification/prayer-questions/{quizId}/questions/{questionId}/start`  | —                                  | `StartPrayerQuestionResponse`  |
| POST  | `/gamification/prayer-questions/{quizId}/questions/{questionId}/answer` | `{ optionId }`                     | `AnswerPrayerQuestionResponse` |
| POST  | `/gamification/action`                                                  | `{ actionType, clientRequestId? }` | `GamificationActionResponse`   |

Yol parametreleri `encodeURIComponent` ile kodlanır.

### Günlük vakitler

```ts
DailyPrayersResponse = {
  date, timezone,
  isFriday, isRamadan, isEidDay,
  prayers: PrayerCardDto[]
}

PrayerCardDto = {
  type: PrayerType;                 // FAJR | DHUHR | ASR | MAGHRIB | ISHA | JUMUAH | TARAWIH | EID_FITR | EID_ADHA
  category: PrayerCategory;         // DAILY | WEEKLY | RAMADAN | EID
  isObligatory: boolean;
  scheduledAt, windowStartsAt: string;
  windowEndsAt: string;             // kendi vaktinin bitişi — buraya kadar "Vaktinde"
  markWindowEndsAt: string;         // sonraki günlük vaktin başlangıcı — işaretlemenin son anı
  xpReward: number;                 // vaktinde işaretleme XP'si
  lateXpReward: number;             // geç (kaza) işaretleme XP'si — genelde yarısı
  isCompleted: boolean;
  canMarkAsCompleted: boolean;      // artık MARK penceresine bakar, kendi vaktine değil
  isLateWindow: boolean;            // hâlâ işaretlenebilir ama kaza olarak kaydedilir
  completionStatus: PrayerCompletionStatus | null;  // ON_TIME | LATE — tamamlanınca dolar
  completedAt: string | null;
  streakContribution: boolean;
  pendingQuizId: string | null;
  isLocked: boolean;
}
```

`markWindowEndsAt`, kendi penceresi zaten bir sonraki vakte kadar süren namazlarda
`windowEndsAt` ile aynıdır. Gerçek kaza kuyruğu yalnızca **FAJR** (şuruk → öğle) ve
**CUMA** (öğle + 15 dk → ikindi) için oluşur. Teravih ve bayram namazları başka bir
vaktin kuyruğunu kısaltmaz.

### Geçmiş gün verisi (hafta şeridi & ay takvimi)

Hafta şeridi ve ay ısı haritası **yalnızca** bu uçtan beslenir; `currentStreak`/`lastActiveDate`
üzerinden geçmiş gün durumu **türetilmez**.

```ts
PrayerHistoryResponse = {
  from: string;                     // YYYY-MM-DD
  to: string;                       // YYYY-MM-DD — istenenden erken olabilir (gelecek günler düşer)
  timezone: string;
  days: PrayerHistoryDay[]
}

PrayerHistoryDay = {
  date: string;                     // YYYY-MM-DD
  completedCount: number;           // o gün işaretlenen vakit sayısı
  totalCount: number;               // o günün slot sayısı (cuma/ramazan/bayramda değişir)
  isComplete: boolean;
  isFrozen: boolean;                // seri dondurma ile korunmuş gün
}
```

Aralık en fazla **62 gün** (`PRAYER_HISTORY_MAX_RANGE_DAYS`); aşılırsa backend
`PRAYER_HISTORY_RANGE_TOO_LARGE`, geçersiz aralıkta `INVALID_DATE_RANGE` döner.

Kullanım: `usePrayerHistory` → `buildWeekStrip` / `buildMonthCalendar`
(`src/lib/dashboard-utils.ts`). Aralıklar `buildWeekRange()` ve `buildMonthRange()` ile üretilir.
**Bugün** için geçmiş verisi değil, canlı `daily-prayers` sayıları kullanılır (daha tazedir).

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
  {
    prayerCompletionId,
      prayerType,
      prayerDate,
      completedAt,
      status, // ON_TIME | LATE — quiz geçildiği anda belirlenir
      xpAwarded,
      xpBeforePenalty, // LATE ise xpBeforePenalty > xpAwarded
      xpAfter,
      level,
      leveledUp,
      streakAdvanced,
      currentStreak,
      longestStreak,
      isFirstOfDay;
  }
  ```
  `status === "LATE"` ise vakit çıkmıştı: XP'nin yarısı kazanılır (günün ilk namaz bonusu
  cezalandırılmaz) ve `QuizSuccess` ekranı bunu kullanıcıya gösterir. Seri her iki durumda
  da aynı şekilde ilerler.
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

| Metot | Uç                        | Query                          | `data`                |
| ----- | ------------------------- | ------------------------------ | --------------------- |
| GET   | `/users/search`           | `query`, `pageSize`, `cursor?` | `SearchUsersResponse` |
| GET   | `/users/me/stats`         | —                              | `SelfStats`           |
| GET   | `/users/{username}/stats` | —                              | `PublicStats`         |

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
  username,
  avatarCustomization,
  joinedAt,
  level: { level, badgeKey, progressPercent },
  streak: { current, longest },
  prayers: { totalCompleted, breakdown, punctuality },
  social: { followerCount, followingCount },
  isSelf: boolean,
};

punctuality = {
  onTime: number, // kendi vakti içinde işaretlenen namaz sayısı
  late: number, // kaza olarak işaretlenen namaz sayısı
  onTimePercent: number, // onTime / (onTime + late), yuvarlanmış; hiç yoksa 0
};

// SelfStats, PublicStats'ı genişletir:
level += { xp, totalXp, currentLevelXp, xpToNextLevel, totalXpForNextLevel };
streak += { freezeCount, lastActiveDate };
prayers += {
  lastCompletedAt,
  quiz: { totalAttempts, passed, failed, accuracyPercent },
};
```

`breakdown` anahtarları: `fajr, dhuhr, asr, maghrib, isha, jumuah, tarawih, eidFitr, eidAdha` —
`PrayerType` değerlerinin camelCase karşılıkları (`TARAWIH` → `tarawih`, `EID_FITR` → `eidFitr`).

`punctuality` profil ekranında `PunctualityCard` ("Vaktinde Kılınan Namaz Oranı") ile gösterilir.

`lastActiveDate` bir **takvim günüdür** (`"2026-07-31"`), zaman damgası değil. Backend bunu
`LocalDate.fromPersisted(...).toISO()` ile üretir; `YYYY-MM-DD` string karşılaştırması güvenlidir.

---

## 8. Learn (rehberler) — `src/services/learn.service.ts`

| Metot | Uç                      | `data`                       |
| ----- | ----------------------- | ---------------------------- |
| GET   | `/guides/wudu`          | `GuideData`                  |
| GET   | `/guides/ghusl`         | `GuideData`                  |
| GET   | `/guides/fajr`          | `GuideData`                  |
| GET   | `/guides/dhuhr`         | `GuideData`                  |
| GET   | `/guides/asr`           | `GuideData`                  |
| GET   | `/guides/maghrib`       | `GuideData`                  |
| GET   | `/guides/isha`          | `GuideData`                  |
| GET   | `/guides/jumuah`        | `GuideData`                  |
| POST  | `/question/guide/check` | `GuideCheckQuestionResponse` |

```ts
GuideData = {
  id, title, description,
  steps: {
    id, name, shortDescription, description,
    recitation?, tips?, rekat?, bodyPart?, repeat?, isFard?,
    step, totalSteps,
    type: StepType,
    randomQuestion?: {
      id: string;
      question: string;
      options: { id: string; text: string }[]   // doğru şık işaretlenmez
    }
  }[]
}
```

### Rehber sorusu kontrolü

```ts
POST /question/guide/check
  body     { questionId: string; optionId: string }
  response { isCorrect: boolean; correctOptionId: string }
```

Doğrulama **şık id'si** üzerinden yapılır; metin karşılaştırması yoktur. `correctOptionId` her
çağrıda döner, böylece yanlış cevapta doğru şık işaretlenebilir (`QuestionCard`).

Hata kodları: `QUIZ_OPTION_INVALID` (400 — şık bu soruya ait değil), `QUESTION_NOT_FOUND` (404).

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

| Servis                       | Kullanım                                       | Kaynak               |
| ---------------------------- | ---------------------------------------------- | -------------------- |
| BigDataCloud reverse-geocode | Koordinat → ülke/şehir (kayıt ve konum seçimi) | `src/lib/geocode.ts` |

Bu çağrı `axiosInstance` üzerinden **geçmez**, anahtar gerektirmez ve 10 sn timeout'ludur.
