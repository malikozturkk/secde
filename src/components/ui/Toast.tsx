"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
    accent: "text-[var(--color-primary-light)]",
    ring: "border-[rgba(37,180,154,0.40)] shadow-[0_6px_0_0_rgba(15,80,72,0.45)]",
  },
  error: {
    icon: XCircle,
    accent: "text-[#FCA5A5]",
    ring: "border-[rgba(239,68,68,0.40)] shadow-[0_6px_0_0_rgba(76,5,25,0.5)]",
  },
  warning: {
    icon: AlertTriangle,
    accent: "text-[var(--color-secondary-light)]",
    ring: "border-[rgba(245,166,35,0.40)] shadow-[0_6px_0_0_rgba(124,83,0,0.45)]",
  },
  info: {
    icon: Info,
    accent: "text-[#9AE0FF]",
    ring: "border-[rgba(79,195,247,0.40)] shadow-[0_6px_0_0_rgba(7,47,75,0.5)]",
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                role="alert"
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-2xl border-[1.5px] bg-[#1C2E35] p-3.5 pr-2.5",
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
                  <div className="text-[13px] font-bold leading-snug text-white/70">
                    {item.message}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Kapat"
                  onClick={() => dismiss(item.id)}
                  className="shrink-0 rounded-full p-1 text-white/40 transition-colors hover:text-white"
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
