export const siteConfig = {
  name: "NamazGo",
  defaultTitle: "NamazGo — Namaz Yolculuğun Başlasın",
  titleTemplate: "%s | NamazGo",
  description:
    "Oyunlaştırılmış namaz öğrenme platformu. Abdest, namaz ve ibadetleri adım adım öğren, seri tut, seviye atla!",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://namazgo.com").replace(
    /\/+$/,
    ""
  ),
  locale: "tr_TR",
  ogImage: "/og-default.png",
  themeColor: "var(--ng-green)",
} as const;
