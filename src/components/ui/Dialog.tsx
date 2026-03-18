import React, { useEffect } from "react";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  header,
  children,
  maxWidth = "md",
  className = "",
}: DialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative w-full ${maxWidthClass} bg-[#131f24] border-2 border-[rgba(255,255,255,0.15)] rounded-3xl flex flex-col shadow-2xl overflow-hidden ng-animate-pop ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex relative items-center justify-center min-h-[60px] border-b-2 border-[#1a2b2a]">
          <button
            onClick={onClose}
            className="absolute left-4 text-[rgba(255,255,255,0.4)] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-white/5"
            aria-label="Kapat"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
          <div className="flex-1 px-14 flex items-center justify-center h-full">
            {header}
          </div>
        </div>
        <div className="overflow-y-auto max-h-[75vh] w-full">{children}</div>
      </div>
    </div>
  );
}
