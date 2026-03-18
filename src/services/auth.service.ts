import { axiosInstance } from "../lib/axios";
import type {
  ApiResponse,
  RegisterPayload,
  RegisterResponseData,
  LoginPayload,
  LoginResponseData,
  RefreshTokenPayload,
  RefreshTokenResponseData,
  UpdateProfilePayload,
  UpdateProfileResponseData,
  ForgotPasswordPayload,
  ForgotPasswordResponseData,
  ValidateResetTokenPayload,
  ValidateResetTokenResponseData,
  ResetPasswordPayload,
  LogoutPayload,
} from "../types";
import { ProfileResponseData } from "../types/auth.types";

export const authService = {
  register: (payload: RegisterPayload) =>
    axiosInstance.post<ApiResponse<RegisterResponseData>>(
      "/auth/register",
      payload
    ),

  login: (payload: LoginPayload) =>
    axiosInstance.post<ApiResponse<LoginResponseData>>("/auth/login", payload),

  getProfile: (username: string) =>
    axiosInstance.get<ApiResponse<ProfileResponseData>>(`/auth/${username}`),

  refresh: (payload: RefreshTokenPayload) =>
    axiosInstance.post<ApiResponse<RefreshTokenResponseData>>(
      "/auth/refresh",
      payload
    ),

  updateProfile: (payload: UpdateProfilePayload) =>
    axiosInstance.patch<ApiResponse<UpdateProfileResponseData>>(
      "/auth/profile",
      payload
    ),

  logout: (payload: LogoutPayload) =>
    axiosInstance.post<ApiResponse<null>>("/auth/logout", payload),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    axiosInstance.post<ApiResponse<ForgotPasswordResponseData>>(
      "/auth/forgot-password",
      payload
    ),

  validateResetToken: (payload: ValidateResetTokenPayload) =>
    axiosInstance.post<ApiResponse<ValidateResetTokenResponseData>>(
      "/auth/validate-reset-token",
      payload
    ),

  resetPassword: (payload: ResetPasswordPayload) =>
    axiosInstance.post<ApiResponse<null>>("/auth/reset-password", payload),

  toggleFollow: (username: string) =>
    axiosInstance.post<ApiResponse<{ following: boolean }>>(
      `/auth/${username}/follow`
    ),

  getFollowers: (username: string) =>
    axiosInstance.get<
      ApiResponse<{ username: string; avatar: string | null }[]>
    >(`/auth/${username}/followers`),

  getFollowing: (username: string) =>
    axiosInstance.get<
      ApiResponse<{ username: string; avatar: string | null }[]>
    >(`/auth/${username}/following`),
};
