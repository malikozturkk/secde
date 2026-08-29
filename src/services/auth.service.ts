import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  RegisterPayload,
  RegisterResponseData,
  LoginPayload,
  LoginResponseData,
  RefreshTokenResponseData,
  UpdateProfilePayload,
  UpdateProfileResponseData,
  ForgotPasswordPayload,
  ForgotPasswordResponseData,
  ValidateResetTokenPayload,
  ValidateResetTokenResponseData,
  ResetPasswordPayload,
} from "@/src/types/auth.types";
import type {
  FollowListParams,
  FollowListResponseData,
} from "@/src/types/auth.types";
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

  refresh: () =>
    axiosInstance.post<ApiResponse<RefreshTokenResponseData>>("/auth/refresh"),

  updateProfile: (payload: UpdateProfilePayload) =>
    axiosInstance.patch<ApiResponse<UpdateProfileResponseData>>(
      "/auth/profile",
      payload
    ),

  logout: () => axiosInstance.post<ApiResponse<null>>("/auth/logout"),

  deleteAccount: () => axiosInstance.delete<ApiResponse<null>>("/auth/me"),

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

  getFollowers: (username: string, params?: FollowListParams) =>
    axiosInstance.get<ApiResponse<FollowListResponseData>>(
      `/auth/${username}/followers`,
      { params }
    ),

  getFollowing: (username: string, params?: FollowListParams) =>
    axiosInstance.get<ApiResponse<FollowListResponseData>>(
      `/auth/${username}/following`,
      { params }
    ),

  exportMyData: () =>
    axiosInstance.get<ApiResponse<Record<string, unknown>>>("/users/me/export"),
};
