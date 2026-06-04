import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "@/src/types/api.types";
import type {
  WorshipData,
  WorshipQueryParams,
} from "@/src/types/worship.types";

export const worshipService = {
  getTimes: (params: WorshipQueryParams) =>
    axiosInstance.get<ApiResponse<WorshipData>>("/worship", {
      params: {
        date: params.date,
      },
    }),
};
