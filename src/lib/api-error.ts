import { AxiosError, isAxiosError } from "axios";
import type { ApiResponse } from "@/src/types/api.types";

export const getHttpStatus = (error: unknown): number | undefined => {
  if (isAxiosError(error)) return error.response?.status;
  return undefined;
};

export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (!isAxiosError(error)) return undefined;
  const data = (error as AxiosError<ApiResponse<unknown>>).response?.data;
  return data?.error?.message ?? undefined;
};

const isServerError = (error: unknown): boolean => {
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

export const getValidationCodes = (error: unknown): string[] => {
  if (!isAxiosError(error)) return [];
  const attachment = (error as AxiosError<ApiResponse<unknown>>).response?.data
    ?.error?.attachment;

  const raw: string[] = [];
  const pushFrom = (value: unknown): void => {
    if (typeof value === "string") {
      raw.push(...value.split(/[;,]/));
    } else if (value && typeof value === "object" && "code" in value) {
      const code = (value as { code?: unknown }).code;
      if (typeof code === "string") raw.push(code);
    }
  };

  if (Array.isArray(attachment)) attachment.forEach(pushFrom);
  else pushFrom(attachment);

  return raw.map((code) => code.trim().toUpperCase()).filter(Boolean);
};

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
