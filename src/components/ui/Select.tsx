"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { MOTION_REDUCED, MOTION_SPRING } from "@/src/constants/motion";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly SelectOption[];
  error?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = "Seçiniz",
      value,
      onChange,
      onBlur,
      options,
      error,
      disabled = false,
      name,
      id,
      className = "",
    },
    ref
  ) => {
    const generatedId = useId();
    const buttonId = id ?? generatedId;
    const listId = `${buttonId}-listbox`;
    const errorId = `${buttonId}-error`;

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();
    const popoverHidden = prefersReduced
      ? { opacity: 0, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.96, y: -6 };

    const selected = options.find((o) => o.value === value);

    const close = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
    }, []);

    useEffect(() => {
      if (!open) return;
      const handlePointer = (event: MouseEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          close();
          onBlur?.();
        }
      };
      document.addEventListener("mousedown", handlePointer);
      return () => document.removeEventListener("mousedown", handlePointer);
    }, [open, close, onBlur]);

    const commit = useCallback(
      (next: string) => {
        onChange(next);
        close();
        onBlur?.();
      },
      [onChange, close, onBlur]
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(
              Math.max(
                0,
                options.findIndex((o) => o.value === value)
              )
            );
          } else {
            setActiveIndex((i) => Math.min(options.length - 1, i + 1));
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (open) setActiveIndex((i) => Math.max(0, i - 1));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (open && activeIndex >= 0) commit(options[activeIndex].value);
          else setOpen(true);
          break;
        case "Escape":
          if (open) {
            event.preventDefault();
            close();
          }
          break;
        default:
          break;
      }
    };

    return (
      <div className="flex w-full flex-col gap-1" ref={containerRef}>
        {label && (
          <label
            htmlFor={buttonId}
            className="px-1 text-[13px] font-bold text-[var(--ng-text-2)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <button
            ref={ref}
            type="button"
            id={buttonId}
            name={name}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-describedby={error ? errorId : undefined}
            onClick={() => !disabled && setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!open) onBlur?.();
            }}
            className={cn(
              "flex h-14 w-full items-center justify-between gap-2 rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] bg-[var(--ng-surface-deep)] px-4 text-left transition-colors duration-[var(--motion-press)]",
              "outline-none focus-visible:border-[var(--ng-green)]",
              error
                ? "border-red-500"
                : "border-[#2a3d3b] hover:border-[rgba(255,255,255,0.25)]",
              disabled && "cursor-not-allowed opacity-40",
              className
            )}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[15px] font-medium",
                selected ? "text-white" : "text-[var(--ng-text-3)]"
              )}
            >
              {selected ? selected.label : placeholder}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "shrink-0 text-[var(--ng-text-3)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                open && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {open && (
            <motion.ul
              id={listId}
              role="listbox"
              tabIndex={-1}
              initial={popoverHidden}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={popoverHidden}
              transition={prefersReduced ? MOTION_REDUCED : MOTION_SPRING.press}
              className="absolute z-[var(--z-tooltip)] mt-2 max-h-64 w-full origin-top overflow-y-auto rounded-[var(--ng-radius)] border-2 border-[var(--ng-edge-strong)] bg-[var(--ng-surface-high)] p-1.5 shadow-2xl"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;
                return (
                  <li key={option.value} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => commit(option.value)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium transition-colors",
                        isSelected
                          ? "bg-[var(--ng-green)]/15 text-white"
                          : isActive
                          ? "bg-white/5 text-white"
                          : "text-[rgba(255,255,255,0.75)]"
                      )}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {option.label}
                      </span>
                      {isSelected && (
                        <Check size={16} className="shrink-0 text-[var(--ng-green)]" />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 px-1 text-[13px] font-semibold text-red-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              !
            </span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
