import { Suspense } from "react";
import { createMetadata } from "@/src/lib/metadata";
import SearchPageContent from "./SearchPageContent";
import AppLayout from "@/src/components/layout/AppLayout";

export const metadata = createMetadata({
  title: "Kullanıcı Ara",
  description:
    "NamazGo topluluğunda kullanıcı ara, arkadaşlarını bul ve takip et.",
  path: "/search",
});

function SearchPageFallback() {
  return (
    <AppLayout
      rightPanel={
        <div className="w-full flex flex-col gap-4">
          <div className="ng-animate-ske rounded-2xl h-[200px] w-full border-2 border-white/10" />
          <div className="ng-animate-ske rounded-2xl h-[140px] w-full border-2 border-white/10" />
        </div>
      }
    >
      <style>{`
        @keyframes ng-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .ng-animate-ske {
          background: linear-gradient(90deg, #1c2e35 25%, #223540 50%, #1c2e35 75%);
          background-size: 1200px 100%;
          animation: ng-shimmer 1.8s infinite linear;
        }
      `}</style>
      <div className="max-w-xl mx-auto w-full flex flex-col gap-3">
        <div className="ng-animate-ske rounded-full h-14 w-full" />
        <div className="ng-animate-ske rounded-2xl h-[88px] w-full" />
        <div className="ng-animate-ske rounded-2xl h-[88px] w-full" />
      </div>
    </AppLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}
