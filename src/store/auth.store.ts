import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User, AuthTokensWithUser } from "../types";
import { AUTH_COOKIE_NAME } from "../constants/routes";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tempToken: string | null;
  user: User | null;
  setAuth: (data: AuthTokensWithUser) => void;
  setTempToken: (token: string) => void;
  clearTempToken: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      tempToken: null,
      user: null,

      setAuth: ({ accessToken, refreshToken, user }) => {
        Cookies.set(AUTH_COOKIE_NAME, accessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        set({ accessToken, refreshToken, user, tempToken: null });
      },

      setTempToken: (token) => set({ tempToken: token }),

      clearTempToken: () => set({ tempToken: null }),

      clearAuth: () => {
        Cookies.remove(AUTH_COOKIE_NAME);
        set({
          accessToken: null,
          refreshToken: null,
          tempToken: null,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
