import { axiosInstance } from "../lib/axios";
import type {
  ApiResponse,
  OtpVerifyPayload,
  OtpVerifyResponseData,
} from "../types";

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
