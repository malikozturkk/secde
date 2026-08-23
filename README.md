# NamazGo

Oyunlaştırılmış namaz takip ve öğrenme uygulaması — Next.js 16 App Router ile geliştirilmiş
web istemcisi.

Kullanıcı; günlük namaz vakitlerini konumuna göre görür, kıldığı vakitleri kısa quizlerle
işaretleyip **seri (streak)** tutar, seviye/XP kazanır ve abdest, gusül abdesti ile beş vakit
namazın rehberlerini adım adım öğrenir.

> Repo dizin adı `secde`, ürün adı **NamazGo**'dur.

---

## Hızlı başlangıç

Gereksinim: Node.js 20+ ve `yarn`.

```bash
yarn install
cp .env.example .env.local   # değerleri kendi ortamına göre doldur
yarn dev
```

Uygulama <http://localhost:3000> adresinde açılır.

Bu repo **yalnızca frontend**tir. Veri çeken tüm ekranlar için ayrı bir REST backend'in
`NEXT_PUBLIC_API_URL` adresinde çalışıyor olması gerekir; backend olmadan uygulama açılır
fakat veri gerektiren ekranlar hata/boş durum gösterir.

### Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Evet | Backend REST API kök adresi. axios `baseURL` olarak kullanılır. Sonunda `/` olmamalı. |
| `NEXT_PUBLIC_SITE_URL` | Hayır | Uygulamanın herkese açık kök adresi (canonical + Open Graph). Varsayılan: `https://namazgo.com/` |

`NEXT_PUBLIC_` öneki olan değişkenler tarayıcıya gönderilir — gizli anahtar koyma.

---

## Komutlar

| Komut | Açıklama |
|---|---|
| `yarn dev` | Geliştirme sunucusu |
| `yarn build` | Production build |
| `yarn start` | Production sunucu |
| `yarn lint` | ESLint (flat config) |
| `yarn build:icons` | `src/icons/**.svg` dosyalarından `src/icons/tsx/**` React bileşenlerini üretir (svgr) |

> Not: `yarn lint` şu anda mevcut teknik borç nedeniyle hatayla sonuçlanıyor
> (7 error / 10 warning). Ayrıntı ve kural listesi için [CLAUDE.md](CLAUDE.md#3-komutlar).

---

## Teknoloji

| Konu | Seçim |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19.2.3 |
| Dil | TypeScript 5 (`strict`) |
| Stil | Tailwind CSS v4 (CSS-first, `@theme inline`) |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 (`persist`) |
| HTTP | axios (interceptor'lı tek instance) |
| Form / doğrulama | react-hook-form + zod v4 |
| Animasyon | framer-motion + CSS keyframes |
| İkonlar | Yerel SVG → svgr ile üretilen TSX, ayrıca lucide-react |

Test altyapısı, CI ve i18n kütüphanesi bu projede **bulunmuyor**.

---

## Sayfalar

| Route | Erişim | Açıklama |
|---|---|---|
| `/` | Herkese açık | Oturum varsa Dashboard (seri/günlük vakitler), yoksa Landing |
| `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-otp` | Herkese açık | Kimlik doğrulama akışı |
| `/learn` | Herkese açık | Rehber yol haritası (abdest, gusül, beş vakit, cuma) |
| `/learn/[id]` | Herkese açık | Adım adım interaktif rehber |
| `/tools` | Herkese açık | Araç merkezi |
| `/tools/qibla`, `/tools/dhikr`, `/tools/zakat` | Herkese açık | Kıble pusulası, zikirmatik, zekât hesaplayıcı |
| `/worship` | Korumalı | Günün namaz vakitleri, geri sayım, hicri tarih, oruç bilgisi |
| `/profile/[username]` | Korumalı | Profil, istatistikler, takip/takipçi |
| `/search` | Korumalı | Kullanıcı arama |
| `/settings/profile`, `/settings/account`, `/settings/avatar` | Korumalı | Ayarlar |
| `/settings/data` | Korumalı | KVKK: veri kopyası indirme (m.11) ve açık rıza geri çekme (m.6) |
| `/terms`, `/privacy` | Herkese açık | Yasal metinler: Kullanım Koşulları ve "Kişisel Verilere İlişkin Aydınlatma Metni" |
| `/explicit-consent` | Herkese açık | KVKK m.6 açık rıza metni (özel nitelikli veriler: mezhep + ibadet kayıtları). Kayıt formundan linklenir; `PUBLIC_ROUTES` içindedir |

Erişim kontrolü `src/middleware.ts` içinde `auth-token` cookie'sinin varlığına göre yapılır.
Rehberler ve araçlar bilinçli olarak herkese açıktır — arama motorlarından gelen ziyaretçi
kayıt olmadan içeriği görebilir. Hiçbir prefix'e uymayan yol yönlendirilmez, Next'in 404'ü
render edilir.

---

## Proje yapısı

```
src/
├── app/          # App Router route'ları, root layout, globals.css
├── components/   # ui/ (primitive'ler) + domain klasörleri
├── config/       # site konfigürasyonu
├── constants/    # sabitler, query key fabrikaları, hata mesajları
├── hooks/        # React Query ve UI hook'ları
├── icons/        # ham SVG + svgr ile üretilmiş TSX bileşenler
├── lib/          # axios, hata yardımcıları, cn(), metadata, domain util'leri
├── providers/    # Query, çerez onayı, yasal onay sağlayıcıları
├── services/     # API endpoint katmanı
├── store/        # Zustand auth store
├── styles/       # sayfa-özel CSS
├── types/        # tipler ve enum'lar
└── validations/  # zod şemaları
```

Import alias'ı repo köküne işaret eder: `import { cn } from "@/src/lib/utils"`.

---

## Dokümantasyon

| Dosya | Amaç |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Yapay zekâ agentları ve yeni geliştiriciler için ana referans: zorunlu kurallar (§0), kalıplar, kritik davranışlar |
| [AGENTS.md](AGENTS.md) | Claude dışı agentlar (Cursor, ChatGPT, Gemini) için giriş noktası |
| [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) | Agent çalışma protokolü: görev döngüsü, doküman senkronizasyon matrisi, kırmızı çizgiler, kontrol listesi |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Katmanlar, veri akışı, auth ve consent mekanizmaları |
| [docs/API.md](docs/API.md) | Frontend'in tükettiği backend endpoint sözleşmesi |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Tasarım token'ları, tipografi, bileşen ve animasyon kuralları |
| [docs/DOMAIN.md](docs/DOMAIN.md) | Alan terimleri sözlüğü (TR/EN), seri ve quiz kuralları |

---

## Katkı notları

- Veri çekme zinciri her zaman **service → hook → component** olmalı; bileşende doğrudan
  axios/fetch veya `useEffect` ile veri çekme yok.
- `src/icons/tsx/**` üretilmiş koddur; kaynak SVG'yi düzenleyip `yarn build:icons` çalıştır.
- Kullanıcıya görünen tüm metinler Türkçe'dir.
- Renk, radius ve gölge değerleri `src/app/globals.css` içindeki CSS değişkenlerinden gelir.
