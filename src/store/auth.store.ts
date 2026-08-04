import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User, AuthTokensWithUser } from "@/src/types/auth.types";
import { AUTH_COOKIE_NAME } from "../constants/routes";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tempToken: string | null;
  pendingEmail: string | null;
  user: User | null;
  setAuth: (data: AuthTokensWithUser) => void;
  setUser: (user: User) => void;
  setTempToken: (token: string, email?: string | null) => void;
  clearTempToken: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      tempToken: null,
      pendingEmail: null,
      user: null,

      setAuth: ({ accessToken, refreshToken, user }) => {
        Cookies.set(AUTH_COOKIE_NAME, accessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        set({
          accessToken,
          refreshToken,
          user,
          tempToken: null,
          pendingEmail: null,
        });
      },

      setUser: (user) => set({ user }),

      setTempToken: (token, email) =>
        set((state) => ({
          tempToken: token,
          pendingEmail: email ?? state.pendingEmail,
        })),

      clearTempToken: () => set({ tempToken: null, pendingEmail: null }),

      clearAuth: () => {
        Cookies.remove(AUTH_COOKIE_NAME);
        set({
          accessToken: null,
          refreshToken: null,
          tempToken: null,
          pendingEmail: null,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
        tempToken: state.tempToken,
        pendingEmail: state.pendingEmail,
      }),
    }
  )
);
