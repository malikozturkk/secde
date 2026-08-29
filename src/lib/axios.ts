import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "../store/auth.store";
import type { AuthTokensWithUser } from "@/src/types/auth.types";
import type { ApiResponse } from "@/src/types/api.types";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../constants/routes";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

const CONSENT_ERROR_CODES = new Set(["CONSENT_REQUIRED", "CONSENT_OUTDATED"]);

const isConsentError = (error: AxiosError): boolean => {
  const body = error.response?.data as ApiResponse<unknown> | undefined;
  const code = body?.error?.message;
  return typeof code === "string" && CONSENT_ERROR_CODES.has(code);
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    const token = accessToken ?? Cookies.get(AUTH_COOKIE_NAME) ?? null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    const status = error.response?.status;
    const isAuthExpired = status === 401 || status === 403;
    const alreadyRetried = originalRequest?._retry;
    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");
    const isLoginEndpoint = originalRequest?.url?.includes("/auth/login");

    if (
      !isAuthExpired ||
      isConsentError(error) ||
      alreadyRetried ||
      isRefreshEndpoint ||
      isLoginEndpoint
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { clearAuth, setAuth } = useAuthStore.getState();

    try {
      const { data } = await axios.post<ApiResponse<AuthTokensWithUser>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        undefined,
        { withCredentials: true }
      );

      const tokens = data.data!;
      setAuth(tokens);

      processQueue(null, tokens.accessToken);
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
