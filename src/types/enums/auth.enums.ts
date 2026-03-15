export enum AuthErrorCode {
  // ─── Register ───────────────────────────────────────────────────────────────
  EMAIL_REQUIRED = "EMAIL_REQUIRED",
  USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  ACTIVE_REGISTRATION_EXISTS = "ACTIVE_REGISTRATION_EXISTS",

  // ─── Login ──────────────────────────────────────────────────────────────────
  IDENTIFIER_REQUIRED = "IDENTIFIER_REQUIRED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",

  // ─── Logout ─────────────────────────────────────────────────────────────────
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  TOKEN_ALREADY_INVALIDATED = "TOKEN_ALREADY_INVALIDATED",
  REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",

  // ─── Me ─────────────────────────────────────────────────────────────────────
  USER_NOT_FOUND = "USER_NOT_FOUND",

  // ─── Refresh Token ──────────────────────────────────────────────────────────
  INVALID_OR_EXPIRED_REFRESH_TOKEN = "INVALID_OR_EXPIRED_REFRESH_TOKEN",

  // ─── OTP Guard ──────────────────────────────────────────────────────────────
  MISSING_TOKEN = "MISSING_TOKEN",
  INVALID_TOKEN_PURPOSE = "INVALID_TOKEN_PURPOSE",
  INVALID_OR_EXPIRED_TOKEN = "INVALID_OR_EXPIRED_TOKEN",

  // ─── OTP Resend ─────────────────────────────────────────────────────────────
  NO_PENDING_REGISTRATION = "NO_PENDING_REGISTRATION",
  REGISTRATION_EXPIRED = "REGISTRATION_EXPIRED",
  INSUFFICIENT_TIME_FOR_NEW_OTP = "INSUFFICIENT_TIME_FOR_NEW_OTP",
  ACTIVE_OTP_EXISTS = "ACTIVE_OTP_EXISTS",

  // ─── OTP Verify ─────────────────────────────────────────────────────────────
  OTP_NOT_FOUND = "OTP_NOT_FOUND",
  OTP_EXPIRED = "OTP_EXPIRED",
  INVALID_OTP_CODE = "INVALID_OTP_CODE",

  // ─── General ────────────────────────────────────────────────────────────────
  UNAUTHORIZED = "UNAUTHORIZED",
}
