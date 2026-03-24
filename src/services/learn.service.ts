import { axiosInstance } from "../lib/axios";
import {
  ApiResponse,
  GuideCheckQuestionResponse,
  GuideData,
  GuideCheckQuestionPayload,
} from "../types";

export const learnService = {
  getWudu: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/wudu"),
  getGhusl: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/ghusl"),
  getFajr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/fajr"),
  getDhuhr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/dhuhr"),
  getAsr: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/asr"),
  getMaghrib: () =>
    axiosInstance.get<ApiResponse<GuideData>>("/guides/maghrib"),
  getIsha: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/isha"),
  getJumuah: () => axiosInstance.get<ApiResponse<GuideData>>("/guides/jumuah"),
  checkGuideQuestion: (body: GuideCheckQuestionPayload) =>
    axiosInstance.post<ApiResponse<GuideCheckQuestionResponse>>(
      "/question/guide/check",
      body
    ),
};
