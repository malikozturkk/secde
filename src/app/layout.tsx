import { createRootMetadata } from "@/src/lib/metadata";
import QueryProvider from "../providers/QueryProvider";
import { ConsentGateProvider } from "../providers/ConsentGateProvider";
import { CookieConsentProvider } from "../providers/CookieConsentProvider";
import CookieBanner from "../components/cookie/CookieBanner";
import "./globals.css";

export const metadata = createRootMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryProvider>
          <CookieConsentProvider>
            <ConsentGateProvider>{children}</ConsentGateProvider>
            <CookieBanner />
          </CookieConsentProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
