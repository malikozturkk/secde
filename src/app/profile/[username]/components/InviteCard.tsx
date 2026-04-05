import { InviteSearch } from "@/src/icons/tsx/mascot";
import { ChevronRight } from "lucide-react";
import InviteDialog from "./InviteDialog";
import { useState } from "react";

const InviteCard = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  return (
    <>
      <button
        className="border-2 cursor-pointer border-[rgba(255,255,255,0.15)] p-4 rounded-2xl flex flex-col overflow-hidden mb-4 bg-[#070F12] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
        onClick={() => setIsInviteOpen(true)}
      >
        <div className="flex gap-4 items-center">
          <InviteSearch className="shrink-0 w-14 h-14" />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Arkadaşlarını davet et</h2>
            <p className="text-sm text-gray-500 text-left">
              Arkadaşlarını NamazGo'ya davet ederek beraber gelişmenin ve
              öğrenmenin tadını çıkar!
            </p>
          </div>
          <ChevronRight strokeWidth={3} className="opacity-70 shrink-0" />
        </div>
      </button>

      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </>
  );
};
export default InviteCard;
