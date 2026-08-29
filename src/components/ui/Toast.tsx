"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { CheckCircle2, Info, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  MOTION_REDUCED,
  MOTION_SPRING,
  projectMomentum,
} from "@/src/constants/motion";

type ToastTone = "success" | "error" | "info" | "warning";

interface ToastOptions {
  tone?: ToastTone;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, "title">> {
  id: number;
  title?: string;
}

interface ToastApi {
  show: (opts: ToastOptions) => number;
  success: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "tone">
  ) => number;
  error: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "tone">
  ) => number;
  info: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "tone">
  ) => number;
  warning: (
    message: string,
    opts?: Omit<ToastOptions, "message" | "tone">
  ) => number;
  dismiss: (id: number) => void;
}

const noop = () => 0;
const ToastContext = createContext<ToastApi>({
  show: noop,
  success: noop,
  error: noop,
  info: noop,
  warning: noop,
  dismiss: () => undefined,
});

export const useToast = (): ToastApi => useContext(ToastContext);

const TONE_META: Record<
  ToastTone,
  {
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    accent: string;
    ring: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    accent: "text-[var(--ng-green)]",
    ring: "border-[var(--ng-green)]",
  },
  error: {
    icon: XCircle,
    accent: "text-[var(--ng-rose)]",
    ring: "border-[var(--ng-rose)]",
  },
  warning: {
    icon: AlertTriangle,
    accent: "text-[var(--ng-gold)]",
    ring: "border-[var(--ng-gold)]",
  },
  info: {
    icon: Info,
    accent: "text-[var(--ng-sky)]",
    ring: "border-[var(--ng-sky)]",
  },
};

const SWIPE_DISMISS_PX = 80;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersReduced = useReducedMotion();
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    const handle = timers.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (opts: ToastOptions): number => {
      const id = (idRef.current += 1);
      const item: ToastItem = {
        id,
        tone: opts.tone ?? "info",
        message: opts.message,
        title: opts.title,
        duration: opts.duration ?? 4000,
      };
      setItems((prev) => [...prev, item]);
      if (item.duration > 0) {
        const handle = setTimeout(() => dismiss(id), item.duration);
        timers.current.set(id, handle);
      }
      return id;
    },
    [dismiss]
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      dismiss,
      success: (message, opts) => show({ ...opts, message, tone: "success" }),
      error: (message, opts) => show({ ...opts, message, tone: "error" }),
      info: (message, opts) => show({ ...opts, message, tone: "info" }),
      warning: (message, opts) => show({ ...opts, message, tone: "warning" }),
    }),
    [show, dismiss]
  );

  const hidden = prefersReduced
    ? { opacity: 0, x: 0, scale: 1 }
    : { opacity: 0, x: 40, scale: 0.96 };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[var(--z-toast)] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2.5 max-lg:left-4 max-lg:right-4 max-lg:w-auto"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const meta = TONE_META[item.tone];
            const Icon = meta.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={hidden}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={hidden}
                transition={
                  prefersReduced ? MOTION_REDUCED : MOTION_SPRING.momentum
                }
                drag={prefersReduced ? false : "x"}
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 0.12, right: 1 }}
                dragMomentum={false}
                onDragEnd={(_: unknown, info: PanInfo) => {
                  const projected =
                    info.offset.x + projectMomentum(info.velocity.x);
                  if (projected > SWIPE_DISMISS_PX) dismiss(item.id);
                }}
                role="alert"
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-[var(--ng-radius)] p-3.5 pr-2.5",
                  "border-[length:var(--ng-stroke)] bg-[var(--ng-surface-high)]",
                  "shadow-[0_16px_40px_rgba(0,0,0,0.55)]",
                  !prefersReduced && "cursor-grab active:cursor-grabbing",
                  meta.ring
                )}
              >
                <span className={cn("mt-0.5 shrink-0", meta.accent)}>
                  <Icon size={20} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  {item.title && (
                    <div className="text-[13px] font-black leading-tight text-white">
                      {item.title}
                    </div>
                  )}
                  <div className="text-[13px] font-bold leading-snug text-[var(--ng-text-2)]">
                    {item.message}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Kapat"
                  onClick={() => dismiss(item.id)}
                  className="shrink-0 rounded-full p-1 text-[var(--ng-text-3)] transition-colors duration-[var(--motion-press)] hover:text-white"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
