import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type { OtpVerifyPayload, OtpVerifyResponseData } from "@/src/types/otp.types";

export const otpService = {
  verify: (payload: OtpVerifyPayload, tempToken: string) =>
    axiosInstance.post<ApiResponse<OtpVerifyResponseData>>(
      "/otp/verify",
      payload,
      {
        headers: { Authorization: `Bearer ${tempToken}` },
      }
    ),

  resend: (tempToken: string) =>
    axiosInstance.post<ApiResponse<null>>(
      "/otp/resend",
      {},
      {
        headers: { Authorization: `Bearer ${tempToken}` },
      }
    ),
};
