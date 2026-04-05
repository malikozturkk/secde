import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "../types";
import type { SearchUsersParams, SearchUsersResponse } from "../types/user.types";

export const userService = {
  searchUsers: (params: SearchUsersParams) =>
    axiosInstance.get<ApiResponse<SearchUsersResponse>>("/users/search", {
      params: {
        query: params.query,
        pageSize: params.pageSize,
        ...(params.cursor != null ? { cursor: params.cursor } : {}),
      },
    }),
};
