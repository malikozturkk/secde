"use client";

import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthStore } from "../../store/auth.store";
import AppLayout from "../../components/layout/AppLayout";

export const DashboardView = () => {
  const { mutate: logout, isPending } = useLogout();
  const { user } = useAuthStore();

  return (
    <AppLayout rightPanel={<div className="h-full bg-white/5 rounded-2xl border border-white/5 p-6 flex items-center justify-center text-white/50 font-bold tracking-wide">Right Panel (Dashboard)</div>}>
      <div>
        <div className="mb-4">
          <p className="text-xl">
            Hoşgeldin <b>{user?.username}</b>
          </p>
        </div>
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {isPending ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </AppLayout>
  );
};
