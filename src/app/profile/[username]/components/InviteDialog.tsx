import React, { useState } from "react";
import { Dialog } from "@/src/components/ui/Dialog";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteDialog({ isOpen, onClose }: InviteDialogProps) {
  const [copied, setCopied] = useState(false);
  const inviteLink = "http://namazgo.com/register";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };
  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-[24px] font-black text-white mb-3 m-0 tracking-tight">
          Arkadaşlarını davet et
        </h2>

        <p className="text-[16px] font-bold text-[rgba(255,255,255,0.6)] mb-8 m-0 max-w-[320px] leading-[1.35]">
          Arkadaşlarını NamazGo&#39;ya davet ederek beraber gelişmenin ve
          öğrenmenin tadını çıkar!
        </p>

        <div className="w-full flex items-center justify-between bg-[#0f171a] border-2 border-[rgba(255,255,255,0.1)] rounded-2xl p-1 pl-4 mb-7 shadow-inner">
          <span className="text-[14px] text-[rgba(255,255,255,0.4)] font-extrabold truncate shrink">
            {inviteLink}
          </span>
          <button
            onClick={handleCopy}
            className="shrink-0 text-[#4fc3f7] font-extrabold text-[13px] border-none cursor-pointer tracking-wide uppercase px-5 py-[14px] rounded-[10px] flex items-center gap-2 relative"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "KOPYALANDI" : "LİNKİ KOPYALA"}
          </button>
        </div>

        <div className="w-full flex items-center gap-4 mb-6">
          <div className="h-[2px] flex-1 bg-[rgba(255,255,255,0.06)] rounded-full"></div>
          <span className="text-[12px] font-extrabold text-[rgba(255,255,255,0.3)] uppercase tracking-wide">
            Veya şurada paylaş...
          </span>
          <div className="h-[2px] flex-1 bg-[rgba(255,255,255,0.06)] rounded-full"></div>
        </div>

        <div className="w-full flex gap-3">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${inviteLink}`}
            target="_blank"
            className="flex-1 py-[14px] bg-[#1877F2] hover:bg-[#1860c2] text-white font-black text-[14px] rounded-xl border-b-4 border-[#1258b6] transition-all active:border-b-0 active:translate-y-1 tracking-wide"
          >
            FACEBOOK
          </Link>
          <Link
            href={`https://x.com/intent/post?url=${inviteLink}`}
            target="_blank"
            className="flex-1 py-[14px] bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-black text-[14px] rounded-xl border-b-4 border-[#167abe] transition-all active:border-b-0 active:translate-y-1 tracking-wide"
          >
            TWITTER
          </Link>
        </div>
      </div>
    </Dialog>
  );
}
