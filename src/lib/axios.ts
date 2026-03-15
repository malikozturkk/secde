import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "../store/auth.store";
import { AuthTokensWithUser, ApiResponse } from "../types";

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

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    const is401 = error.response?.status === 401;
    const alreadyRetried = originalRequest?._retry;
    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");

    if (!is401 || alreadyRetried || isRefreshEndpoint) {
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

    const { refreshToken, clearAuth, setAuth } = useAuthStore.getState();

    try {
      const { data } = await axios.post<ApiResponse<AuthTokensWithUser>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        { refreshToken }
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
