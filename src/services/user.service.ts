import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  SearchUsersParams,
  SearchUsersResponse,
} from "../types/user.types";
import type { SelfStats, PublicStats } from "../types/user-stats.types";

export const userService = {
  searchUsers: (params: SearchUsersParams) =>
    axiosInstance.get<ApiResponse<SearchUsersResponse>>("/users/search", {
      params: {
        query: params.query,
        pageSize: params.pageSize,
        ...(params.cursor != null ? { cursor: params.cursor } : {}),
      },
    }),

  getSelfStats: () =>
    axiosInstance.get<ApiResponse<SelfStats>>("/users/me/stats"),

  getUserStats: (username: string) =>
    axiosInstance.get<ApiResponse<PublicStats>>(
      `/users/${encodeURIComponent(username)}/stats`
    ),
};
