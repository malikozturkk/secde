"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { MOTION_REDUCED, MOTION_SPRING } from "@/src/constants/motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
}

const SHOW_DELAY_MS = 150;

export function Tooltip({
  content,
  children,
  placement = "bottom",
}: TooltipProps) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const hidden = prefersReduced
    ? { opacity: 0, scale: 1, y: 0 }
    : { opacity: 0, scale: 0.9, y: placement === "bottom" ? -4 : 4 };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={hidden}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={hidden}
            transition={prefersReduced ? MOTION_REDUCED : MOTION_SPRING.press}
            className={cn(
              "pointer-events-none absolute left-1/2 z-[var(--z-tooltip)]",
              "whitespace-nowrap rounded-[var(--ng-radius)] px-2.5 py-1.5",
              "bg-[var(--ng-surface-high)] text-xs font-black text-white",
              "border-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)]",
              "shadow-[0_10px_28px_rgba(0,0,0,0.55)]",
              placement === "bottom"
                ? "top-full mt-2 origin-top"
                : "bottom-full mb-2 origin-bottom"
            )}
            style={{ x: "-50%" }}
          >
            {content}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 -translate-x-1/2 h-0 w-0",
                "border-l-4 border-r-4 border-l-transparent border-r-transparent",
                placement === "bottom"
                  ? "bottom-full border-b-4 border-b-[var(--ng-surface-high)]"
                  : "top-full border-t-4 border-t-[var(--ng-surface-high)]"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
