import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  ConsentStatusResponse,
  AcceptConsentPayload,
} from "@/src/types/consent.types";

export const consentService = {
  getStatus: () =>
    axiosInstance.get<ApiResponse<ConsentStatusResponse>>("/consent/status"),

  accept: (payload: AcceptConsentPayload) =>
    axiosInstance.post<ApiResponse<null>>("/consent/accept", payload),
};
