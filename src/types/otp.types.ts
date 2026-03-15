import type { AuthTokensWithUser } from "./auth.types";

export interface OtpVerifyPayload {
  code: string;
}

export type OtpVerifyResponseData = AuthTokensWithUser;
