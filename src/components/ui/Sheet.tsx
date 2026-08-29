"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { cn } from "@/src/lib/utils";
import {
  MOTION_FADE,
  MOTION_REDUCED,
  MOTION_SPRING,
  projectMomentum,
} from "@/src/constants/motion";

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

const DISMISS_RATIO = 0.4;

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
  const prefersReduced = useReducedMotion();
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const y = useMotionValue(0);
  const dragDim = useTransform(y, [0, Math.max(height, 1)], [1, 0.35], {
    clamp: true,
  });

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

  useEffect(() => {
    if (!isOpen) {
      y.set(0);
      return;
    }
    const node = panelRef.current;
    if (!node) return;
    setHeight(node.offsetHeight);
    const observer = new ResizeObserver(() => setHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, [isOpen, y]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const projected = info.offset.y + projectMomentum(info.velocity.y);
    if (projected > Math.max(height, 1) * DISMISS_RATIO) onClose();
  };

  const panelTransition = prefersReduced
    ? MOTION_REDUCED
    : MOTION_SPRING.surface;
  const enterOffset = prefersReduced ? 0 : 28;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOTION_FADE}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-[rgba(7,15,18,0.85)] backdrop-blur-md"
              style={{ opacity: dragDim }}
            />
          </motion.button>
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(
              "relative flex w-full max-w-[480px] flex-col overflow-hidden",
              "bg-[var(--ng-surface)] border-t-[length:var(--ng-stroke)] border-[var(--ng-edge-strong)]",
              "rounded-t-[var(--ng-radius-lg)] sm:rounded-[var(--ng-radius-lg)] sm:border-[length:var(--ng-stroke)]",
              "max-h-[92vh] sm:max-h-[720px]",
              "shadow-[0_28px_70px_rgba(0,0,0,0.65)]",
              className
            )}
            style={{ y }}
            initial={{ y: enterOffset, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: enterOffset, opacity: 0 }}
            transition={panelTransition}
            drag={prefersReduced ? false : "y"}
            dragControls={dragControls}
            dragListener={false}
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.12, bottom: 1 }}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            <div
              className={cn(
                "shrink-0",
                withGrip && "pt-2",
                !header && "min-h-6",
                !prefersReduced &&
                  "cursor-grab touch-none active:cursor-grabbing"
              )}
              onPointerDown={(event) => {
                if (prefersReduced) return;
                const target = event.target as HTMLElement;
                if (target.closest("button, a, input, select, textarea")) return;
                dragControls.start(event);
              }}
            >
              {withGrip && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none mx-auto block h-1 w-9 rounded-full bg-white/20"
                />
              )}
              {header}
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
            {footer}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
