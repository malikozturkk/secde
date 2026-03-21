import { axiosInstance } from "../lib/axios";
import { ApiResponse } from "../types";
import { GuideData } from "../types/learn.types";

export const learnService = {
  // Wudu & Ghusl
  getWudu: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/wudu"),
  getGhusl: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/ghusl"),

  // Namaz
  getFajr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/fajr"),
  getDhuhr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/dhuhr"),
  getAsr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/asr"),
  getMaghrib: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/maghrib"),
  getIsha: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/isha"),
  getJumuah: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/jumuah"),
};
