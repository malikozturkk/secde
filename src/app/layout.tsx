import type { Metadata } from "next";
import QueryProvider from "../providers/QueryProvider";

export const metadata: Metadata = {
  title: "App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
