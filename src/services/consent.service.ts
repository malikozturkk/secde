import { axiosInstance } from "../lib/axios";
import type {
  ApiResponse,
  ConsentStatusResponse,
  AcceptConsentPayload,
} from "../types";

export const consentService = {
  getStatus: () =>
    axiosInstance.get<ApiResponse<ConsentStatusResponse>>("/consent/status"),

  accept: (payload: AcceptConsentPayload) =>
    axiosInstance.post<ApiResponse<null>>("/consent/accept", payload),
};
