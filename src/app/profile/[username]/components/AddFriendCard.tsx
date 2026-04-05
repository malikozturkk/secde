import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import InviteDialog from "./InviteDialog";
import { InviteProfile } from "@/src/icons/tsx/mascot";
import { Search } from "@/src/icons/tsx/general";

export default function AddFriendCard() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <div className="border-2 border-[rgba(255,255,255,0.15)] rounded-2xl flex flex-col overflow-hidden bg-[#070F12] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-[17px] font-extrabold text-white m-0">
            Arkadaş ekle
          </h2>
        </div>

        <div className="flex flex-col pb-2">
          <Link
            href="/search"
            className="flex items-center gap-4 px-5 py-3 transition-colors no-underline group"
          >
            <Search width={48} height={48} />
            <div className="flex-1">
              <span className="font-extrabold text-[15px] text-white">
                Arkadaşlarını bul
              </span>
            </div>
            <ChevronRight
              size={20}
              className="text-white opacity-30 transition-opacity"
              strokeWidth={2.5}
            />
          </Link>

          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-4 px-5 py-3 transition-colors bg-transparent border-none w-full cursor-pointer text-left group"
          >
            <InviteProfile width={48} height={48} />
            <div className="flex-1">
              <span className="font-extrabold text-[15px] text-white">
                Arkadaşlarını davet et
              </span>
            </div>
            <ChevronRight
              size={20}
              className="text-white opacity-30 transition-opacity"
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      <InviteDialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </>
  );
}
