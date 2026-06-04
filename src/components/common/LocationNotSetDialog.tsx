"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Button } from "@/src/components/ui/Button";

interface LocationNotSetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_ROUTE = "/settings/profile";

export const LocationNotSetDialog: React.FC<LocationNotSetDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="sm"
      header={
        <span className="text-base font-black text-white">Konum gerekli</span>
      }
    >
      <div className="flex flex-col items-center gap-4 px-6 py-7 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border-2 border-[#25B49A]/30 bg-[#25B49A]/10 text-[#25B49A]">
          <MapPin size={28} />
        </div>

        <h2 className="m-0 text-xl font-black text-white">
          Konumun ayarlı değil
        </h2>

        <p
          className="m-0 max-w-[320px] text-sm font-medium leading-relaxed text-[rgba(255,255,255,0.6)]"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Namaz vakitlerini ve günlük görevlerini gösterebilmemiz için hesabında
          bir konum kayıtlı olmalı. Ayarlardan konumunu belirleyebilirsin.
        </p>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => {
            onClose();
            router.push(SETTINGS_ROUTE);
          }}
        >
          Ayarlara git
        </Button>
      </div>
    </Dialog>
  );
};
