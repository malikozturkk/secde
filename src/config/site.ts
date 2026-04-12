/**
 * Merkezi site yapılandırması.
 *
 * Tüm genel sabitler burada tek bir yerde tanımlanır.
 * İleride i18n desteği eklendiğinde bu değerler kolayca
 * bir çeviri katmanının arkasına taşınabilir.
 */

export const siteConfig = {
  name: "NamazGo",
  defaultTitle: "NamazGo — Namaz Yolculuğun Başlasın",
  titleTemplate: "%s | NamazGo",
  description:
    "Oyunlaştırılmış namaz öğrenme platformu. Abdest, namaz ve ibadetleri adım adım öğren, seri tut, seviye atla!",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namazgo.com/",
  locale: "tr_TR",
  ogImage: "/og-default.png",
  themeColor: "#25b49a",
} as const;

export type SiteConfig = typeof siteConfig;
