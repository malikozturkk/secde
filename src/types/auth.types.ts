export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
}

export interface UserDetail extends User {
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokensWithUser extends AuthTokens {
  user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface UpdateProfilePayload {
  username?: string;
  avatar?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ValidateResetTokenPayload {
  userId: string;
  token: string;
}

export interface ResetPasswordPayload {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LogoutPayload {
  refreshToken: string;
}

export interface RegisterResponseData {
  tempToken: string;
}

export type LoginResponseData = AuthTokensWithUser;
export type RefreshTokenResponseData = AuthTokensWithUser;

export type ProfileResponseData = UserDetail;
export type UpdateProfileResponseData = User;

export interface ForgotPasswordResponseData {
  message: "FORGOT_PASSWORD_EMAIL_SENT";
}

export type ValidateResetTokenResponseData = boolean;
