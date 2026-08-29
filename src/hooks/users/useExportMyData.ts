"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/services/auth.service";

export const useExportMyData = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await authService.exportMyData();
      const payload = data.data;
      if (!payload) throw new Error("users/me/export response missing data");
      return payload;
    },
    onSuccess: (payload) => {
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "namazgo-verilerim.json";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    },
  });
};
