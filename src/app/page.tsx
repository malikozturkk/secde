"use client";

import { useLogout } from "../hooks/auth/useLogout";
import { useAuthStore } from "../store/auth.store";
import AppLayout from "../components/layout/AppLayout";

export default function Home() {
  const { mutate: logout, isPending } = useLogout();
  const { user } = useAuthStore();

  return (
    <AppLayout>
      <div>
        <div>
          <p>
            Hoşgeldin <b>{user?.username}</b>
          </p>
        </div>
        <button onClick={() => logout()} disabled={isPending}>
          {isPending ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </AppLayout>
  );
}
