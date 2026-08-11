# Alan (domain) sözlüğü ve kuralları

Kod tabanı Türkçe bir dini ibadet alanını modeller; tip ve enum adları İngilizce, kullanıcıya
görünen metinler Türkçedir. Bu doküman iki dili eşler ve alanın kurallarını özetler.

---

## 1. Terim sözlüğü

| Kod (EN)                   | Türkçe        | Anlam                              |
| -------------------------- | ------------- | ---------------------------------- |
| `prayer` / `salah`         | namaz         | Günlük ibadet                      |
| `PrayerType` / `PrayerKey` | vakit         | Namaz vakti (Sabah, Öğle, ...)     |
| `wudu`                     | abdest        | Namaz öncesi arınma                |
| `ghusl`                    | gusül abdesti | Tam boy arınma                     |
| `fajr`                     | sabah / imsak | Gün doğumu öncesi vakit            |
| `sunrise`                  | güneş         | Vakit değil, sınır göstergesi      |
| `dhuhr`                    | öğle          | —                                  |
| `asr`                      | ikindi        | —                                  |
| `maghrib`                  | akşam         | İftar vakti ile aynı an            |
| `isha`                     | yatsı         | —                                  |
| `jumuah`                   | cuma          | Cuma namazı                        |
| `teravih` / `tarawih`      | teravih       | Ramazan gecesi namazı              |
| `bayram` / `eid`           | bayram        | Bayram namazı                      |
| `khutbah`                  | hutbe         | Cuma vaazı                         |
| `rekat`                    | rekât         | Namaz birimi                       |
| `fard` (`isFard`)          | farz          | Zorunlu adım                       |
| `recitation`               | okunuş        | Adımda okunacak metin              |
| `madhab`                   | mezhep        | `SHAFI` (Şafi) / `HANAFI` (Hanefi) |
| `hijri`                    | hicri         | İslami takvim                      |
| `ramadan`                  | ramazan       | —                                  |
| `fasting`                  | oruç          | —                                  |
| `suhoor` / `iftar`         | sahur / iftar | Oruç başı ve sonu                  |
| `streak`                   | seri          | Kesintisiz gün sayısı              |
| `streak freeze`            | seri dondurma | Seriyi bir gün koruma hakkı        |
| `xp` / `level`             | XP / seviye   | Oyunlaştırma                       |
| `badge`                    | rozet         | Seviye ünvanı                      |

**Yazım:** `PrayerType.Tarawih = "TARAWIH"` (gamification) ve `PrayerBreakdown.tarawih`
(istatistikler) aynı ibadeti gösterir; ikincisi birincinin camelCase karşılığıdır. Aynı ilişki
bayram için de geçerlidir: `EID_FITR` → `eidFitr`, `EID_ADHA` → `eidAdha`.

---

## 2. İki farklı "vakit" enum'u vardır

| Enum                             | Değerler                                                                                | Nerede                                      |
| -------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------- |
| `PrayerKey` (`worship.enums.ts`) | `fajr, sunrise, dhuhr, asr, maghrib, isha` — **küçük harf**                             | `/worship` sayfası, namaz vakitleri tablosu |
| `PrayerType` (`streak.enums.ts`) | `FAJR, DHUHR, ASR, MAGHRIB, ISHA, JUMUAH, TARAWIH, EID_FITR, EID_ADHA` — **BÜYÜK harf** | Seri/quiz/gamification                      |

`PrayerCategory` (`streak.enums.ts`): `DAILY` (beş vakit), `WEEKLY` (yalnız cuma), `RAMADAN`
(yalnız teravih), `EID` (bayram namazları). `StatusChip` bunu **durumun yanında** ikinci bir çip
olarak gösterir — durumu (Tamamlandı/Şimdi/Kaçırıldı) ezmez. `DAILY` için kategori çipi çıkmaz.

`PrayerType` ve `PrayerCategory`, backend'deki Prisma enum'larının (`kible/prisma/schema.prisma`)
**birebir** kopyasıdır. Değer eklerken/değiştirirken önce şemayı kontrol et: sapma olduğunda
`PRAYER_META` / `PRAYER_COLORWAY` eşleşmez ve kart fallback'e düşer, quiz parametresi de backend'in
`ParseEnumPipe` guard'ına takılır.

Farklar önemlidir:

- `PrayerKey` **`sunrise`** içerir (kılınan bir namaz değil, vakit sınırı) ve cuma/teravih/bayram
  **içermez**.
- `PrayerType` `sunrise` içermez ama farz dışı vakitleri (cuma, teravih, bayram) içerir.
- `PRAYER_TYPE_TO_ICON_KEY` (`PrayerCard.tsx`) ikisi arasında köprü kurar: cuma → `dhuhr`,
  teravih → `isha`, bayram → `sunrise` ikonu.

Yeni kod yazarken hangi bağlamda olduğunu belirle ve doğru enum'u kullan; ikisi arasında
otomatik dönüşüm yoktur.

---

## 3. Namaz vakitleri (`/worship`)

- Kaynak: `GET /worship?date=YYYY-MM-DD` → `WorshipData`.
- Sıra `PRAYER_ORDER`, görsel yapılandırma `PRAYER_CONFIG` (etiket, ikon adı, renk, gölge).
- Etiketler: `fajr → "İmsak"`, `sunrise → "Güneş"`, `dhuhr → "Öğle"`, `asr → "İkindi"`,
  `maghrib → "Akşam"`, `isha → "Yatsı"`.
- Vakit durumu `PrayerState`: `passed` (Geçti) / `current` (Şu an) / `upcoming` (Bekliyor)
  — etiketler `PRAYER_STATE_LABEL`.
- Durum ekranları `components/worship/states/` altındadır: `LoadingState`, `ErrorState`,
  `EmptyState`, `InfoState`.
  **Not:** `WorshipPageState` enum'u (`normal`, `loading`, `error`, `empty`, `geo-denied`,
  `no-location`) tanımlıdır ancak şu an kod tabanında **hiçbir yerde kullanılmıyor** —
  ölü koddur; ona göre karar ver.
- Yenileme: `WORSHIP_STALE_TIME` 60 sn, `WORSHIP_REFRESH_INTERVAL` 5 dk,
  geri sayım tiki `COUNTDOWN_TICK_MS` 1 sn, gün değişimi kontrolü `DAY_CHANGE_CHECK_MS` 30 sn.
- Gün değişince (`useDayChange`) seçili tarih bugüne çekilir — kullanıcı başka bir güne
  bakıyorsa müdahale edilmez.

### Konum ve şehirler

- `TURKISH_CITIES` (`constants/worship.ts`) ve `TR_CITIES` (`constants/registration.ts`)
  Türkiye illerini koordinatlarıyla listeler; varsayılan `DEFAULT_CITY` **İstanbul**.
- Tüm şehirlerde `timezone: "Europe/Istanbul"`.
- Kayıt formu `country` alanını `"Türkiye"` ile sınırlar (`COUNTRY_OPTIONS`,
  zod `refine`) — **şu an yalnızca Türkiye desteklenmektedir**.
- Dil seçeneği tek: `tr` (`LANGUAGE_OPTIONS`).
- Tarayıcı konumu `useGeolocation` ile alınır, `lib/geocode.ts` en yakın ile eşler.

### Hicri / oruç

`WorshipData.meta` hicri tarihi ve ay adını, `WorshipData.fasting` oruç bilgisini taşır
(`isRamadan`, `isFastingTime`, `fastingStart`, `fastingEnd`, `progressPercent`,
`ramadan: { day, totalDays }`). Ramazan dışında `fasting` `null` olabilir.

---

## 4. Seri (streak) ve günlük vakitler

Kaynak: `GET /gamification/daily-prayers?date=...` → `DailyPrayersResponse`.
Görünüm modeli: `buildDailyPrayersViewModel` (`src/lib/streak-utils.ts`).

### Vakit kartı durumu — `PrayerCardState`

Durum **istemcide**, DTO + o anki zamandan türetilir (`buildPrayerCardViewModel`):

| Öncelik | Koşul                                                                          | Durum                                                             |
| ------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| 1       | `isCompleted`                                                                  | `completed` — tamamlandı                                          |
| 2       | `isLocked`                                                                     | `marking-locked` — işaretleme kilitli (quiz başarısız/süre doldu) |
| 3       | Pencere yok **veya** `now < windowStartsAt`                                    | `locked` — henüz açılmadı                                         |
| 4       | Kendi vaktinde + `canMarkAsCompleted` + `now >= scheduledAt`                   | `current` — şu an işaretlenebilir                                 |
| 5       | Kendi vaktinde + `canMarkAsCompleted` + `now < scheduledAt`                    | `eligible` — uygun                                                |
| 6       | Kendi vaktinde + `!canMarkAsCompleted`                                         | `locked`                                                          |
| 7       | Kaza penceresinde (`windowEndsAt` … `markWindowEndsAt`) + `canMarkAsCompleted` | `late` — kaza olarak işaretlenebilir                              |
| 8       | Kaza penceresinde + `!canMarkAsCompleted`                                      | `missed`                                                          |
| 9       | `markWindowEndsAt` geçti                                                       | `missed` — kaçırıldı                                              |

Ayrıca `secondsUntilOpens` (açılışa kalan), `secondsUntilCloses` (**kendi vaktinin**
kapanışına kalan), `secondsUntilMarkCloses` (işaretlemenin tamamen kapanmasına kalan) ve
`windowProgressPercent` (0–100 arası kırpılmış) hesaplanır. İlerleme çubuğu **aktif dilimi**
gösterir: kendi vaktindeyken `[windowStartsAt, windowEndsAt]`, kaza penceresindeyken
`[windowEndsAt, markWindowEndsAt]`. Saat biçimlendirme `tr-TR`,
`{hour: "2-digit", minute: "2-digit"}`.

### Vaktinde / Geç (Kaza) işaretleme

Bir namaz, **bir sonraki günlük vakit başlayana kadar** işaretlenebilir:

- Kendi vakti içinde işaretlenirse `completionStatus = ON_TIME` → çip **"Vaktinde"**.
- Vakti çıkmış ama sonraki vakit girmemişse `completionStatus = LATE` → çip **"Geç (Kaza)"**,
  ve XP'nin yarısı kazanılır (`lateXpReward`). Günün ilk namaz bonusu cezalandırılmaz.
- Sonraki vakit girince artık işaretlenemez (`missed`).

Kart bu durumu üç yerde gösterir: `StatusChip` (çip metni), `PrayerCard` (kaza penceresinde
"KAZA ET" butonu + üstü çizili tam XP) ve `QuizSuccess` (kazanılan XP + "vaktinde kılamadın"
açıklaması). **Seri her iki durumda da aynı şekilde ilerler** — fark yalnızca XP'dedir.

### Metinler ve karakterler

- Seri uzunluğuna göre mesaj: `STREAK_MESSAGES` (eşikler: 100, 30, 7, 1, 0).
- Özel durum mesajları: `STREAK_FRESH_DAY_MESSAGE`, `STREAK_DAY_COMPLETED_MESSAGE`.
- Kahraman balon metinleri: `STREAK_HERO_BUBBLES`; karakter havuzu
  `STREAK_HERO_CHARACTER_POOL` (`ataman`, `zeyd`, `nura`, `ay`, `nura_sitting`).
- Her vakit için görsel kimlik `PRAYER_META`: etiket, üst-etiket, renk, gölge, tint,
  karakter, ipucu metni.
- Kahraman varyantı `StreakHeroVariant`: `normal`, `cuma`, `ramazan`, `bayram`.

### Seri dondurma

`POST /gamification/action` `{ actionType: "STREAK_FREEZE" }`. İstemci en fazla
`STREAK_FREEZE_MAX_SLOTS = 3` slot gösterir. Yanıt `streakFreezeUsage` ile kalan hak,
korunan tarihler ve `alreadyApplied` bilgisini döner.

Akış: `FreezeCard` → **SERİYİ DONDUR** → `FreezeConfirmDialog` (onay) →
`useGamificationAction().mutate` → başarıda `controller.refresh()`. Hata mesajı modalın
içinde gösterilir.

Buton, `useStreakRisk` yanıtındaki **`canFreezeNow`** ile kapılanır (ek olarak hak > 0 ve
pencere açık). `canFreezeNow` iki durumda true'dur: seri **kopmuşken**
(`daysSinceLastActive ≥ 2`, 3 günlük pencere içinde) **veya** seri kopmadan sonra yeniden
başlatılmışken backend'in sakladığı bir **kurtarılabilir seri** varken (`recoverableStreak
> 0`). İkinci durumda dondurma, kaybedilen seriyi geri getirip mevcut seriyle
**birleştirir** (4 kayıp + bugün 1 = 5) — yani o günün namazını kılmış olmak kurtarma
hakkını yakmaz; onay diyaloğu birleşik toplamı gösterir. `atRisk` (gap = 1: seri hâlâ
ayakta, gece yarısı kopacak) **kapı olarak kullanılmaz**, çünkü backend o durumda
`STREAK_NOT_AT_RISK` (409) döner. Dondurulacak bir gün yokken kart "Serin güvende —
dondurulacak gün yok." yazar ve buton `disabled` kalır.

Kartın altındaki durum satırı (`statusLabel`) sırayla şu koşullara bakar:

| Koşul                                       | Metin                                             |
| ------------------------------------------- | ------------------------------------------------- |
| `freezeWindowExpired`                       | "Dondurma penceresi kapandı."                     |
| `canFreezeNow` **ve** `recoverableStreak>0` | "Kaybettiğin {n} günlük seriyi kurtarabilirsin." |
| `!canFreezeNow` **ve** hak > 0              | "Serin güvende — dondurulacak gün yok."           |
| Son kullanım tarihi var                     | "Son kullanım: {tarih}"                           |
| Hak > 0                                     | "Henüz kullanılmadı."                             |
| Aksi halde (hak = 0)                        | "Dondurma hakkın yok."                            |

Hak **0** iken "Henüz kullanılmadı." yazmak yanlıştı: kullanıcıya hak birikiyormuş izlenimi
veriyordu, oysa `streakFreezeCount` hiçbir yerde artmıyor. Sıfır hak artık açıkça söyleniyor.

> Bu akış bir süre **erişilemezdi**: `FreezeCard`'ın tek butonu hiç geçilmeyen bir prop'a
> bağlıydı ve `action.mutate` hiçbir yerden çağrılmıyordu. Backend tarafı ise çalışıyordu.
> Hak **kazanma** mekanizması hâlâ yok: `streakFreezeCount` backend'de hiçbir yerde
> artmıyor, dolayısıyla buton pratikte devre dışı kalır. Planlanan yol ücretli mağaza;
> otomatik kilometre taşı ödülü bilinçli olarak eklenmedi.

### Seri kopması ve kurtarma

Seri, kullanıcı namaz işaretlemeyi beklemeden düşer: backend `currentStreak` alanını
`lastActiveDate` ile bugün arasındaki farktan türetir, bu yüzden kopmuş bir seri uygulama
açılır açılmaz **0** görünür (`GET /gamification/streak-risk`, bkz. `docs/API.md`).

Akış: `useStreakRisk` → `isBroken` ise `useStreakBreakNotice` modalı açar →
`StreakBrokenDialog`. Modal üç durumu ayırır:

| Durum                 | Modal                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| `canFreezeNow`        | **SERİMİ KURTAR (n gün)** + **ŞİMDİ DEĞİL**                              |
| Hak yok               | "Dondurma hakkın kalmadı, bu seri geri alınamıyor." + **YENİDEN BAŞLA**  |
| `freezeWindowExpired` | "Dondurma için geç kaldın, bu seri geri alınamıyor." + **YENİDEN BAŞLA** |

Kurtarma butonu `FreezeCard` ile aynı ucu çağırır (`STREAK_FREEZE`); ayrı bir endpoint yoktur.

Kopmadan sonra kullanıcı önce namaz kılarsa seri 1'den yeniden başlar ama kurtarma
kaybolmaz: backend kaybedilen seriyi saklar, `streak-risk` yanıtında `isBroken: false`
iken `recoverableStreak > 0` ve `canFreezeNow: true` döner. Bu durumda `StreakBrokenDialog`
açılmaz (o yalnızca `isBroken` ile açılır); kurtarma `FreezeCard` üzerinden yapılır ve
dondurma iki seriyi birleştirir. Sıra fark etmez: önce dondur sonra kıl da, önce kıl sonra
dondur da aynı toplamı verir.

Modal, kapatıldığında o **kopma olayı** için susturulur: `useStreakBreakNotice` kapatılan
kopmanın `lastActiveDate` değerini localStorage'a yazar
(`STREAK_BREAK_NOTICE_STORAGE_KEY`). Seri tekrar koparsa `lastActiveDate` değişeceği için
modal yeniden çıkar. Okuma `useSyncExternalStore` ile yapılır — efekt içinde `setState`
yok, bu yüzden `react-hooks/set-state-in-effect` kuralına takılmaz.

`atRisk` (boşluk = 1, seri bu gece kopacak) backend'den geliyor ancak arayüzde
**henüz kullanılmıyor**.

### Yenileme aralıkları

`DAILY_PRAYERS_STALE_TIME_MS` 60 sn · `DAILY_PRAYERS_REFRESH_INTERVAL_MS` 5 dk ·
`STREAK_TICK_INTERVAL_MS` 1 sn (canlı geri sayım).

---

## 5. Vakit quizi

Bir vakti işaretlemek quiz akışından geçer:

```
1. GET  /gamification/prayer-questions/{PRAYER_TYPE}
       → quizId, expiresAt, quizStatus, isLocked, questions[]
2. POST .../{quizId}/questions/{questionId}/start     ← soru gösterilir, süre başlar
3. POST .../{quizId}/questions/{questionId}/answer    ← { optionId }
       → yanıtta prayerCompletion varsa vakit işaretlenmiştir
```

- İstemci sabiti: `PRAYER_QUIZ_QUESTION_COUNT = 3`.
- Her sorunun kendi `timeLimitSeconds` ve `deadlineAt` değeri vardır.
- Durum enum'ları: `PrayerQuizStatus` (`PENDING/PASSED/FAILED/EXPIRED`),
  `PrayerQuestionStatus` (`PENDING/SHOWN/CORRECT/INCORRECT/EXPIRED/LOCKED`),
  `PrayerAnswerResult` (`CORRECT/INCORRECT/EXPIRED`).
- Yanlış cevap durumunda kullanıcıya gösterilen metin
  (`constants/error-messages.ts`): _"Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar
  deneyebilirsin."_ — yani **quiz geçilmeden vakit işaretlenmez**.
- `isLocked` olduğunda o vakit için işaretleme kilitlenir (`marking-locked` kart durumu).
- Kutlama animasyonu `useStreakController` içinde `celebration` state'i ile 1.5 sn gösterilir.

UI: `components/dashboard/quiz/` (`PrayerQuizModal`, `QuizOption`, `QuizProgress`,
`QuizSuccess`, `ConfettiBurst`).

---

## 6. Öğrenme rehberleri (`/learn`)

- Yol haritası **statik** olarak `src/app/learn/learnNodes.tsx` içindeki `LEARN_NODES`
  dizisinden render edilir (sayfa `revalidate = 3600`).
- Düğüm sırası: abdest (`wudu`), gusül (`ghusl`), sabah, öğle, ikindi, akşam, yatsı ve
  öne çıkarılmış cuma düğümü (`isFeatured`).
- Rehber içeriği `/learn/[id]` sayfasında `useGuide(id)` ile backend'den çekilir
  (`GET /guides/{id}`).
- **Sayfa başlığı ve açıklaması içerikten değil `GUIDE_TITLES`'tan üretilir**
  (`src/constants/guides.ts`): `generateMetadata` sunucuda çalışır, rehber içeriği ise
  istemcide çekilir; bu yüzden sekiz sayfa da aynı jenerik `metadata`'yı paylaşıyordu.
  `GUIDE_TITLES` her `GuideId` için Türkçe adı verir (`wudu → "Abdest"`, `jumuah → "Cuma
Namazı"`, …) ve başlık `"{ad} Rehberi"` olur. Değerler backend'in
  `src/guides/strategies/*.strategy.ts` dosyalarındaki `title` alanlarıyla birebir aynıdır —
  yeni rehber eklenirken bu eşleme de genişletilmeli, metin uydurulmamalıdır.
- Her adım (`GuideStep`) bir `StepType` taşır; bu tip `stepIconMap` (SVG bileşeni) ve
  `stepImageMap` (`/public/learn/*.png` görseli) üzerinden görselleştirilir.
- Adım alanları: `name`, `shortDescription`, `description`, opsiyonel `recitation` (okunuş),
  `tips`, `rekat`, `bodyPart`, `repeat`, `isFard`, ve opsiyonel `randomQuestion`.
- Rehber içi soru kontrolü: `POST /question/guide/check` (`useCheckGuideQuestion`).
- Akış bileşenleri: `components/learn/guide/` — `PathOverview`, `StepProgressCard`,
  `QuestionCard`, `CelebrationPhase`, `SummaryPhase`, `CompletionScreen`.

---

## 7. Seviye, XP ve rozetler

- `SelfStats.level`: `level`, `badgeKey`, `progressPercent`, `xp`, `totalXp`,
  `currentLevelXp`, `xpToNextLevel`, `totalXpForNextLevel`.
- Rozet anahtarı → Türkçe etiket eşlemesi `resolveBadgeLabel` (`constants/user-stats.ts`).
  Bilinmeyen anahtar `humanizeBadgeKey` ile okunabilir hale getirilir (kırılmaz).
  Bilinen anahtarlar: `beginner, first_step, novice, rookie, explorer, traveler, committed,
consistent, steadfast, early_bird, night_owl, disciplined, devoted, dedicated, master,
champion, legend`.
- Dashboard kahramanı için ayrı bir seviye ünvanı tablosu vardır:
  `STREAK_HERO_LEVEL_LABEL_FALLBACK = "Sabır Yolcusu"`.
- Vakit dağılımı `PRAYER_BREAKDOWN_META` ile renk/etiket alır
  (`fajr, dhuhr, asr, maghrib, isha, jumuah, tarawih, eidFitr, eidAdha`).
- **Vaktinde kılınan namaz oranı** `prayers.punctuality` alanından gelir ve
  `PunctualityCard` (`components/stats/PunctualityCard.tsx`) ile profil ekranında
  gösterilir. Halka rengi `QuizAccuracyCard` ile aynı eşikleri kullanır (≥70 primary,
  ≥40 secondary, altı kırmızı).
- XP yalnızca `prayerCompletion` yanıtıyla değişir (`xpAwarded`, `xpAfter`, `leveledUp`);
  `status === "LATE"` ise `xpBeforePenalty` tam XP'yi taşır ve fark kullanıcıya gösterilir.

---

## 8. Sosyal

- Takip **toggle**'dır: `POST /auth/{username}/follow` → `{ following: boolean }`.
- Takipçi/takip listeleri ayrı uçlardan gelir ve `FollowListDialog` ile gösterilir.
- `mutualFollowers` (ortak takipçiler) hem arama sonucunda hem profilde döner; önizleme
  listesi avatar göstermek içindir.
- Kullanıcı arama cursor tabanlıdır (`nextCursor`); arama girişi `useDebouncedValue(value, 350)`
  ile 350 ms geciktirilir (`app/search/SearchPageContent.tsx`).
- Avatarlar sunucuda görsel olarak tutulmaz; `avatarCustomization` renk konfigürasyonundan
  `DefaultAvatar` bileşeniyle çizilir (`src/lib/avatar-utils.ts`).

---

## 9. Tarih ve yerelleştirme

- Tarihler API'ye **yerel** `YYYY-MM-DD` biçiminde gönderilir — `buildLocalDateString`
  (`src/lib/worship-utils.ts`). `toISOString()` kullanma; UTC kaymasına yol açar.
- Gün gezinmesi `addDays` ile yapılır.
- Saat biçimi `tr-TR` locale ve 2 haneli saat/dakika.
- Ay ve gün adları `MONTHS_TR`, `DAYS_LONG_TR` (`constants/worship.ts`) — `Intl` yerine
  bu sabitler kullanılır.
- Göreli zaman ("2 gün önce") `src/lib/relative-time.ts` içinde Türkçe üretilir.

---

## Lider tablosu (QA B1)

`GET /leaderboard`. Panonun sağ panelindeki kart daha önce `useLeaderboardPreview` içindeki sabit
kodlanmış beş kişiyi ("Mehmet K. / İstanbul / 35", "Ayşe D. / Ankara / 28", …) gerçek kullanıcı gibi
gösteriyordu. O hook silindi.

| Enum                | Değerler                          | Türkçe başlık                                         |
| ------------------- | --------------------------------- | ----------------------------------------------------- |
| `LeaderboardMetric` | `STREAK` · `XP` · `PRAYERS`       | Seri Liderleri · XP Liderleri · En Çok Vakit Kılanlar |
| `LeaderboardScope`  | `GLOBAL` · `CITY` · `FOLLOWING`   | —                                                     |
| `LeaderboardPeriod` | `ALL_TIME` · `WEEKLY` · `MONTHLY` | —                                                     |

Etiketler `types/enums/leaderboard.enums.ts` içindeki `LEADERBOARD_METRIC_LABELS` /
`LEADERBOARD_METRIC_UNIT` sabitlerinde. `scope = CITY` iken başlık "İstanbul · Seri Liderleri"
biçimine döner.

Kartın boş, hata ve "listede değilsin" durumları ayrı ayrı ele alınır — sahte satırla doldurulmaz:

- veri yok → "Henüz kimse tabloya girmedi. İlk sen ol!"
- hata → "Lider tablosu şu an yüklenemedi."
- kullanıcı ilk sayfada değil → "Sen 12. sıradasın · 3 gün"

## Quiz: süre dolması ile yanlış cevap

İkisi de aynı sonucu doğurur ve arayüz de öyle anlatmalıdır:

| Sonuç        | Vakit bugün kapanır mı? | Kullanıcıya söylenecek                                   |
| ------------ | ----------------------- | -------------------------------------------------------- |
| Yanlış cevap | **evet**                | "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek." |
| Süre doldu   | **evet**                | "Süre doldu. Bu vakit yarına kadar işaretlenemeyecek."   |

`constants/error-messages.ts` içindeki `QUIZ_ANSWER_INCORRECT` ve kardeşleri eskiden "tekrar
deneyebilirsin" diyordu; bu gerçeğin tersiydi (QA M12) ve düzeltildi.

## Saat dilimi (QA B4)

Namaz saatleri **kullanıcının kayıtlı konumunun** saat diliminde gösterilir, cihazınkinde değil.
Backend `meta.timezone` / `timezone` gönderir; biçimlendirme `lib/time-format.ts` üzerinden yapılır
ve `timeZone` argümanı **zorunludur**.

Bu bir kozmetik detay değil: Madrid'e kayıtlı bir hesap, İstanbul'daki bir cihazda sabah namazını
06:24 (doğrusu 05:24), New York'taki bir cihazda 23:24 — yani bir önceki gün — olarak görüyordu.
Yurt dışına çıkan her kullanıcı etkileniyordu.

Yeni bir yerde saat gösterecekseniz `formatTimeInZone` / `formatOptionalTimeInZone` kullanın;
`toLocaleTimeString` doğrudan çağrılmamalı. "Bugün mü?" sorusu için `localDateInZone` var —
gece yarısına yakın cihazın tarihi ile konumun tarihi ayrışabilir.
