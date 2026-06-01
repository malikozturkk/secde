import { AxiosError, isAxiosError } from "axios";
import type { ApiResponse } from "@/src/types";

export const getHttpStatus = (error: unknown): number | undefined => {
  if (isAxiosError(error)) return error.response?.status;
  return undefined;
};

export const getApiErrorCode = (error: unknown): number | undefined => {
  if (!isAxiosError(error)) return undefined;
  const data = (error as AxiosError<ApiResponse<unknown>>).response?.data;
  return data?.error?.code ?? undefined;
};

export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (!isAxiosError(error)) return undefined;
  const data = (error as AxiosError<ApiResponse<unknown>>).response?.data;
  return data?.error?.message ?? undefined;
};

export const isNotFound = (error: unknown): boolean =>
  getHttpStatus(error) === 404;

export const isUnauthorized = (error: unknown): boolean => {
  const status = getHttpStatus(error);
  return status === 401 || status === 403;
};

export const isServerError = (error: unknown): boolean => {
  const status = getHttpStatus(error);
  return status !== undefined && status >= 500;
};

export const retryOnServerError =
  (max = 2) =>
  (failureCount: number, error: unknown): boolean =>
    isServerError(error) && failureCount < max;

const UPPER_SNAKE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

const looksLikeCode = (value: unknown): value is string =>
  typeof value === "string" && value.length >= 3 && UPPER_SNAKE.test(value);

export const getDomainErrorCode = (error: unknown): string | undefined => {
  let candidates: unknown[] = [];

  if (isAxiosError(error)) {
    const data = (error as AxiosError<ApiResponse<unknown>>).response?.data as
      | (ApiResponse<unknown> & {
          code?: unknown;
          message?: unknown;
          error?: {
            code?: unknown;
            message?: unknown;
            errorCode?: unknown;
            attachment?: unknown;
          };
        })
      | undefined;
    const attachment = data?.error?.attachment as
      | { code?: unknown }
      | null
      | undefined;
    candidates = [
      data?.error?.code,
      data?.error?.errorCode,
      data?.error?.message,
      data?.code,
      data?.message,
      attachment?.code,
    ];
  } else if (error && typeof error === "object") {
    const o = error as {
      code?: unknown;
      errorCode?: unknown;
      message?: unknown;
      error?: { code?: unknown; message?: unknown };
    };
    candidates = [
      o.code,
      o.errorCode,
      o.error?.code,
      o.error?.message,
      o.message,
    ];
  }

  for (const candidate of candidates) {
    if (looksLikeCode(candidate)) return candidate;
  }
  return undefined;
};
