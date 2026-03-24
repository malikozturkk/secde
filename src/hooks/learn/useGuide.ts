import { useQuery } from "@tanstack/react-query";
import { learnService } from "@/src/services/learn.service";

export const useGuide = (id: string) => {
  return useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      let response;
      switch (id) {
        case "wudu":
          response = await learnService.getWudu();
          break;
        case "ghusl":
          response = await learnService.getGhusl();
          break;
        case "fajr":
          response = await learnService.getFajr();
          break;
        case "dhuhr":
          response = await learnService.getDhuhr();
          break;
        case "asr":
          response = await learnService.getAsr();
          break;
        case "maghrib":
          response = await learnService.getMaghrib();
          break;
        case "isha":
          response = await learnService.getIsha();
          break;
        case "jumuah":
          response = await learnService.getJumuah();
          break;
        default:
          throw new Error("Invalid guide ID");
      }
      return response.data.data;
    },
    enabled: !!id,
  });
};
