import { Nunito, Fredoka } from "next/font/google";
import { createRootMetadata } from "@/src/lib/metadata";
import QueryProvider from "../providers/QueryProvider";
import { ToastProvider } from "../components/ui/Toast";
import { ConsentGateProvider } from "../providers/ConsentGateProvider";
import { CookieConsentProvider } from "../providers/CookieConsentProvider";
import CookieBanner from "../components/cookie/CookieBanner";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata = createRootMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <QueryProvider>
          <ToastProvider>
            <CookieConsentProvider>
              <ConsentGateProvider>{children}</ConsentGateProvider>
              <CookieBanner />
            </CookieConsentProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
