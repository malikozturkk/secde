# AGENTS.md

Bu repo üzerinde çalışan **tüm** yapay zekâ agentları (Cursor, ChatGPT, Gemini, Copilot,
Claude Code vb.) için giriş noktası.

## Önce bunu oku

Projenin tam ve güncel kuralları **[CLAUDE.md](CLAUDE.md)** dosyasındadır. İçerik agent'a özel
değildir; dosya adı yalnızca Claude Code'un otomatik okuması içindir. Kod yazmadan önce
oradaki şu bölümleri oku:

- **§0 Her görevde uygulanacak kurallar — ZORUNLU** (oku → uygula → dokümanı güncelle → dürüst raporla)
- §2 Stack — projede **olmayan** şeyler dahil (test, CI, i18n yok)
- §5 Klasör yapısı ve import alias'ı (`@/src/...`)
- §6 Uyulması gereken kalıplar (service → hook → component zinciri)
- §7 Kritik davranışlar (auth, consent, hidrasyon, provider sırası)
- §8 `.cursor/rules/project-info.mdc` ile çakışma tablosu

Adım adım protokol, doküman senkronizasyon matrisi, kırmızı çizgiler ve kontrol listesi:
**[docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md)**

## Derinlemesine dokümanlar

| Dosya | İçerik |
|---|---|
| [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) | Görev döngüsü, doküman senkronizasyon matrisi, kırmızı çizgiler, rapor şablonu |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Katmanlar, veri akışı, auth ve consent mekanizmaları |
| [docs/API.md](docs/API.md) | Backend endpoint sözleşmesi ve yanıt zarfı |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Token'lar, tipografi, bileşen ve animasyon kuralları |
| [docs/DOMAIN.md](docs/DOMAIN.md) | Alan terimleri (TR/EN), seri ve quiz kuralları |

## Özet kurallar

0. **Her görevde:** önce dokümanları oku → kalıba uy → değişikliğe karşılık gelen dokümanı
   **aynı görevde** güncelle → neyi doğrulayıp neyi doğrulamadığını ayırarak raporla.
   Kod değişip doküman değişmediyse iş bitmemiştir.
1. **Kaynak önceliği:** kod > CLAUDE.md > docs/ > `.cursor/rules/project-info.mdc`.
   Doküman kod ile çelişirse kod kazanır **ve dokümanı düzeltmek senin işindir**.
   Cursor kuralı ürün vizyonu için geçerlidir ama **teknik olarak eskidir** (Vite, React
   Router, i18next, Vitest, açık tema iddiaları gerçek değildir).
2. **Veri çekme:** her zaman `services/*.service.ts` → `hooks/**/use*.ts` (React Query) →
   bileşen. Bileşende doğrudan axios/fetch veya veri çeken `useEffect` yok.
3. **Server/client ayrımı:** `page.tsx` server component + metadata; etkileşim kardeş
   `*Client.tsx` / `*Form.tsx` / `*View.tsx` dosyasında `"use client"` ile.
4. **Stil:** Tailwind v4 utility + `globals.css` içindeki CSS değişkenleri. Renk/radius
   hardcode etme, class birleştirmede `cn()` kullan.
5. **Tipler:** `any` yok; sabit kümeler `src/types/enums/*.enums.ts` enum'larından.
6. **Metinler:** kullanıcıya görünen her şey Türkçe, hardcoded (i18n katmanı yok).
7. **Üretilmiş dosyalar:** `src/icons/tsx/**` elle düzenlenmez — SVG'yi değiştirip
   `yarn build:icons` çalıştır. `.next/` ve `yarn.lock` da elle düzenlenmez.
8. **Doğrulama:** test yok. Tek otomatik kanıt `yarn lint` ve `yarn build`. Çalıştırmadıysan
   "çalışıyor" deme. (`yarn lint` mevcut teknik borç nedeniyle zaten hatalı — detay CLAUDE.md §3.)
9. **Riskli alanlar:** auth/token akışı (`src/lib/axios.ts`, `src/store/auth.store.ts`,
   `src/middleware.ts`) ve consent gate'i değiştirmeden önce riski açıkça belirt.
