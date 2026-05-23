import { axiosInstance } from "../lib/axios";
import type {
  ApiResponse,
  WorshipData,
  WorshipQueryParams,
} from "../types";

export const worshipService = {
  getTimes: (params: WorshipQueryParams) =>
    axiosInstance.get<ApiResponse<WorshipData>>("/worship", {
      params: {
        lat: params.lat,
        lng: params.lng,
        date: params.date,
        tz: params.tz,
        ...(params.method ? { method: params.method } : {}),
        ...(params.madhab ? { madhab: params.madhab } : {}),
      },
    }),
};
