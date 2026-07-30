# Agent çalışma protokolü

Bu projede çalışan her yapay zekâ agentının **her görevde** izlemesi gereken adımlar.
Kısa ve bağlayıcı özet: [../CLAUDE.md](../CLAUDE.md) §0

Buradaki kurallar "iyi olurdu" değil, **işin tanımının parçasıdır**. Kod çalışıyor ama
dokümanlar güncellenmemişse görev tamamlanmamıştır.

---

## 1. Görev döngüsü

```
   OKU  ──►  PLANLA  ──►  UYGULA  ──►  DOĞRULA  ──►  SENKRONİZE ET  ──►  RAPORLA
    │                                                      │
    └──────────  doküman ile kod çeliştiyse geri dön  ──────┘
```

### Adım 1 — OKU (atlanamaz)

1. `CLAUDE.md` — tamamı.
2. Görevin alanına ait doküman(lar) — [CLAUDE.md](../CLAUDE.md) §0.1 tablosu.
3. Doğrudan dokunacağın kaynak dosyalar.
4. Benzer işin **mevcut örneği**. Bu kod tabanı kalıp tutarlıdır; yeni bir kalıp icat etmeden
   önce eşdeğerini bul:

   | Yapacağın iş | Bak |
   |---|---|
   | Veri çeken hook | `src/hooks/worship/useWorshipTimes.ts` |
   | Mutation + cache invalidation | `src/hooks/streak/useAnswerPrayerQuestion.ts` |
   | Form + zod + hata eşleme | `src/app/(auth)/login/LoginForm.tsx` + `src/hooks/auth/useLogin.ts` |
   | Çok sorgulu karmaşık ekran | `src/hooks/worship/useWorshipController.ts` |
   | Server page + client bileşen ayrımı | `src/app/worship/page.tsx` + `WorshipView.tsx` |
   | Yeni servis | `src/services/worship.service.ts` |
   | Yükleme/hata/boş durum | `src/components/worship/states/` |

### Adım 2 — PLANLA

- Değişikliğin **en küçük doğru** halini belirle. Katman ekleme, dosya bölme, isim
  değiştirme gibi işler istenmedikçe kapsam dışıdır.
- Hangi dokümanların güncelleneceğini **şimdiden** not et
  ([senkronizasyon matrisi](#3-doküman-senkronizasyon-matrisi)).
- Belirsizlik varsa: belirsizlikten bağımsız kısmı yap, belirsiz kısım için varsayımını
  yazılı belirt veya sor. Yanlış varsayımla ilerlemek işi çöpe atacaksa **sor**.

### Adım 3 — UYGULA

[CLAUDE.md](../CLAUDE.md) §6 kalıplarına uy. Kısa hatırlatma:

- `service → hook → component` zinciri dışına çıkma.
- Query key'i `src/constants/**` fabrikasından al, inline dizi yazma.
- `ApiResponse` zarfını hook içinde aç, `null` ise `Error` fırlat.
- `page.tsx` server component kalsın; etkileşim `*Client/*Form/*View` dosyasına.
- Enum kullan, `any` kullanma, Türkçe metin yaz, token kullan, `cn()` ile birleştir.

### Adım 4 — DOĞRULA

| Yaptığın şey | Minimum doğrulama |
|---|---|
| Herhangi bir kod değişikliği | `yarn lint` — dokunduğun dosyada **yeni** ihlal olmamalı |
| Yeni sayfa / route / build'i etkileyen değişiklik | `yarn build` |
| SVG ekleme/değiştirme | `yarn build:icons` |
| Backend'e bağlı davranış | Backend olmadan doğrulanamaz — bunu **açıkça söyle** |

`yarn lint` bu repoda **zaten hatalı** (bilinen borç, [CLAUDE.md](../CLAUDE.md) §3).
Doğru okuma yöntemi: senin dosyalarında yeni satır var mı, toplam sayı arttı mı.

### Adım 5 — SENKRONİZE ET

[Matris](#3-doküman-senkronizasyon-matrisi) üzerinden geç. Karşılığı olan her satır için
ilgili dokümanı güncelle. Yeni bir doküman dosyası eklediysen `README.md`, `AGENTS.md` ve
`CLAUDE.md §0.1` tablosuna da ekle — yoksa kimse okumaz.

### Adım 6 — RAPORLA

[Rapor şablonu](#5-rapor-şablonu) bölümüne bak.

---

## 2. Doküman kuralları

### 2.1 Ne yazılır

- **Yalnızca kodda doğrulanmış** bilgi. Dosya/satır göstererek doğrulayabildiğin şey.
- Bir davranış tuhaf ama kasıtlı görünüyorsa: olduğu gibi yaz + "değiştirmeden önce sor" notu.
- Ölü kod, bilinen borç, tutarsız isimlendirme: **etiketleyerek** yaz. Gizleme.

### 2.2 Ne yazılmaz

- Varsayım, tahmin, "muhtemelen", "genelde şöyle yapılır".
- Yol haritası, TODO, "ileride eklenecek" — bunlar issue'ya aittir, dokümana değil.
- Kodun kendisinin daha iyi anlattığı satır satır açıklama.
- Aynı bilginin ikinci kopyası. Tekrarlamak yerine **link ver** (`docs/X.md §N`).

### 2.3 Doküman sahipliği

| Dosya | Kapsamı | Kapsamı DEĞİL |
|---|---|---|
| `CLAUDE.md` | Kurallar, kalıplar, kritik davranışlar, hızlı referans | Uzun anlatım, endpoint listesi |
| `AGENTS.md` | Claude dışı agentlar için giriş + özet kurallar | Detay (link verir) |
| `README.md` | İnsan geliştirici: kurulum, komut, route, yapı | Kalıp dayatması, iç mekanizma |
| `docs/ARCHITECTURE.md` | Katmanlar, akışlar, mekanizmalar | Endpoint sözleşmesi, tasarım |
| `docs/API.md` | Backend sözleşmesi, tipler, hata kodları | İstemci mimarisi |
| `docs/DESIGN_SYSTEM.md` | Token, bileşen, animasyon, ikon | İş mantığı |
| `docs/DOMAIN.md` | Alan terimleri, kurallar, enum eşlemeleri | Kod kalıpları |
| `docs/AGENT_WORKFLOW.md` | Bu protokol | Proje bilgisi |

Bir bilgi iki dosyaya da uyuyorsa: **sahibi olan dosyaya yaz, diğerinden link ver.**

### 2.4 Doküman ile kod çelişirse

1. **Kod kazanır.**
2. Dokümanı düzelt — aynı görevde, kullanıcı istemese bile. Bu kapsam aşımı değil, bakımdır.
3. Çelişkiyi raporunda belirt (yanlış bilgiye göre karar verilmiş olabilir).

---

## 3. Doküman senkronizasyon matrisi

Değişikliğin türünü bul, karşısındaki **tüm** dosyaları güncelle.

| # | Değişiklik | Güncelle |
|---|---|---|
| 1 | Yeni / silinen / yeniden adlandırılan route | `README.md` Sayfalar · `docs/ARCHITECTURE.md` §8 |
| 2 | Yeni endpoint, değişen payload veya response tipi | `docs/API.md` (ilgili servis bölümü) |
| 3 | Yeni hata kodu | `src/constants/error-messages.ts` · `src/types/enums/*.enums.ts` · `docs/API.md` §1 |
| 4 | Yeni enum değeri / domain kavramı | `docs/DOMAIN.md` (+ tel üzerinden gidiyorsa `docs/API.md`) |
| 5 | Yeni UI primitive (`components/ui/`) | `docs/DESIGN_SYSTEM.md` §4 |
| 6 | Yeni tasarım token'ı veya animasyon utility'si | `src/app/globals.css` · `docs/DESIGN_SYSTEM.md` §2, §5 |
| 7 | Yeni ikon grubu | `docs/DESIGN_SYSTEM.md` §8 (+ `yarn build:icons` çalıştır) |
| 8 | Auth / token / middleware / interceptor davranışı | `docs/ARCHITECTURE.md` §5 · `CLAUDE.md` §7.1 |
| 9 | Consent (yasal veya çerez) davranışı | `docs/ARCHITECTURE.md` §6 · `CLAUDE.md` §7.2 |
| 10 | Provider ekleme/sıralama | `docs/ARCHITECTURE.md` §7 · `CLAUDE.md` §7.4 |
| 11 | Query key, staleTime, invalidation stratejisi | `docs/ARCHITECTURE.md` §4 |
| 12 | Yeni bağımlılık / sürüm yükseltme | `CLAUDE.md` §2 · `README.md` Teknoloji |
| 13 | Yeni env değişkeni | `.env.example` · `CLAUDE.md` §4 · `README.md` Ortam değişkenleri |
| 14 | Yeni `package.json` script'i | `CLAUDE.md` §3 · `README.md` Komutlar |
| 15 | Lint durumunun değişmesi (hata/uyarı sayısı) | `CLAUDE.md` §3 tabloları |
| 16 | Yeni rehber (guide) | `learn.service.ts` · `hooks/learn/useGuide.ts` · `app/learn/learnNodes.tsx` · `docs/API.md` §8 · `docs/DOMAIN.md` §6 |
| 17 | Yeni `StepType` | `types/learn.types.ts` · `stepIconMap` · `stepImageMap` (`lib/utils.ts`) · `docs/API.md` §8 |
| 18 | Test/CI altyapısı kurulması | `CLAUDE.md` §2 ve §3 · `README.md` · `docs/AGENT_WORKFLOW.md` §1 Adım 4 |
| 19 | Yeni doküman dosyası | `README.md` Dokümantasyon · `AGENTS.md` · `CLAUDE.md` §0.1 |
| 20 | `.cursor/rules/project-info.mdc` güncellenmesi | `CLAUDE.md` §8 çakışma tablosu |

---

## 4. Kırmızı çizgiler

Bunları **hiçbir koşulda** kendi inisiyatifinle yapma:

| Yasak | Neden |
|---|---|
| `src/icons/tsx/**` dosyalarını elle düzenlemek | Üretilmiş kod; ilk `yarn build:icons`'ta kaybolur |
| `yarn.lock`, `.next/`, `next-env.d.ts` düzenlemek | Üretilmiş/otomatik |
| Yeni bağımlılık eklemek | Önce gerekçe + onay |
| İstenmeden `git commit` / `push` / PR açmak | Kullanıcının kararı |
| `.env.local` içeriğini raporda/dokümanda göstermek | Gizli değer sızdırma |
| Sırrı silerek "düzeltmek" | Git geçmişindeki sır zaten yanmıştır; rotasyon gerekir — bildir |
| İstenmeyen refactor / format / dosya taşıma | Kapsam ihlali, diff'i kirletir |
| Auth veya consent akışını "sadeleştirmek" | §7 kritik davranışlar; önce riski belirt |
| Gerçek kullanıcı verisi ile fixture/örnek üretmek | Sentetik veri kullan |
| Doğrulamadan "çalışıyor" demek | Bu repoda test yok; kanıt yalnızca lint/build |

---

## 5. Rapor şablonu

Her görev sonunda şunları ver — süslemeden:

```
Ne yapıldı
  - <değişiklik> (<dosya:satır>)

Doğrulama
  - Çalıştırıldı:      yarn lint → <sonuç>   /   yarn build → <sonuç>
  - Kod okunarak:      <doğrulanmadan çıkarılan sonuçlar>
  - Doğrulanmadı:      <backend gerektiren / çalıştırılamayan kısımlar>

Doküman senkronizasyonu
  - Güncellendi:       <dosya> — <ne değişti>
  - Gerekmedi:         <matriste karşılığı olmadığı için>

Yapılmadı / açık kalan
  - <kapsamın dışında bırakılan veya bloke olan kısım + neden>

Dikkat
  - <risk, tespit edilen ama düzeltilmeyen sorun, gereken karar>
```

Eksik bilgi varsa **hangi girdinin eksik olduğunu adıyla söyle** (dosya, env değişkeni,
endpoint) — tahmin üretme.

---

## 6. Hızlı kontrol listesi

Görevi bitirdim demeden önce:

- [ ] `CLAUDE.md` ve alanımın dokümanını okudum
- [ ] Mevcut kalıbın örneğine baktım, yeni kalıp icat etmedim
- [ ] `service → hook → component` zincirine uydum
- [ ] `any` yok, enum kullandım, Türkçe metin yazdım, token kullandım
- [ ] Üretilmiş dosyalara elle dokunmadım
- [ ] Kapsam dışına çıkmadım, bağımlılık eklemedim
- [ ] `yarn lint` çalıştırdım, dokunduğum dosyada yeni ihlal yok
- [ ] Senkronizasyon matrisini gözden geçirdim, gerekli dokümanları güncelledim
- [ ] Dokümana yalnızca doğruladığım bilgiyi yazdım
- [ ] Raporumda doğrulanan / okunan / doğrulanmayan ayrımını yaptım
- [ ] İstenmeden commit/push yapmadım
