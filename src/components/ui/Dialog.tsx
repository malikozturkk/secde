"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  MOTION_FADE,
  MOTION_REDUCED,
  MOTION_SPRING,
} from "@/src/constants/motion";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const MAX_WIDTH_CLASS: Record<NonNullable<DialogProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Dialog({
  isOpen,
  onClose,
  header,
  children,
  maxWidth = "md",
  className = "",
}: DialogProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const panelTransition = prefersReduced ? MOTION_REDUCED : MOTION_SPRING.ui;
  const hidden = prefersReduced
    ? { opacity: 0, scale: 1, y: 0 }
    : { opacity: 0, scale: 0.94, y: 12 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOTION_FADE}
          />

          <motion.div
            className={cn(
              "relative w-full bg-[var(--ng-surface)] border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)]",
              "rounded-[var(--ng-radius-lg)] flex flex-col overflow-hidden",
              "shadow-[0_28px_70px_rgba(0,0,0,0.65)]",
              MAX_WIDTH_CLASS[maxWidth],
              className
            )}
            role="dialog"
            aria-modal="true"
            initial={hidden}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={hidden}
            transition={panelTransition}
          >
            <div className="flex relative items-center justify-center min-h-[60px] border-b-[length:var(--ng-stroke)] border-[var(--ng-edge)]">
              <button
                onClick={onClose}
                className="absolute left-4 text-[var(--ng-text-3)] hover:text-white transition-colors duration-[var(--motion-press)] bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-white/5"
                aria-label="Kapat"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
              <div className="flex-1 px-14 flex items-center justify-center h-full">
                {header}
              </div>
            </div>
            <div className="overflow-y-auto max-h-[75vh] w-full">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
