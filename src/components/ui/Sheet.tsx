"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  withGrip?: boolean;
  className?: string;
  "aria-label"?: string;
}

const BACKDROP_VARIANTS = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const SHEET_VARIANTS = {
  initial: { y: "10%", opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 32 },
  },
  exit: {
    y: "10%",
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  children,
  header,
  footer,
  withGrip = true,
  className,
  "aria-label": ariaLabel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          aria-hidden={!isOpen}
        >
          <motion.button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 cursor-default bg-[rgba(7,15,18,0.85)] backdrop-blur-md"
            onClick={onClose}
            variants={BACKDROP_VARIANTS}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(
              "relative flex w-full max-w-[480px] flex-col overflow-hidden",
              "bg-[var(--color-bg)] border-t border-white/[0.06]",
              "rounded-t-3xl sm:rounded-3xl sm:border",
              "max-h-[92vh] sm:max-h-[720px]",
              "shadow-[0_30px_80px_rgba(0,0,0,0.6)]",
              className
            )}
            variants={SHEET_VARIANTS}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {withGrip && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-2 h-1 w-9 -translate-x-1/2 rounded-full bg-white/20"
              />
            )}
            {header}
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            {footer}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
