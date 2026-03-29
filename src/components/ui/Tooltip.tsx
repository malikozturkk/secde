"use client";

import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
}

export function Tooltip({
  content,
  children,
  placement = "bottom",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 400);
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

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={`
            pointer-events-none absolute left-1/2 -translate-x-1/2 z-50
            whitespace-nowrap rounded-lg px-2.5 py-1.5
            text-xs font-bold text-white
            shadow-lg border border-white/10
            ${placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
          `}
          style={{ backgroundColor: "#1a2b2a" }}
        >
          {content}
          <span
            className={`
              absolute left-1/2 -translate-x-1/2 w-0 h-0
              border-l-4 border-r-4 border-l-transparent border-r-transparent
              ${
                placement === "bottom"
                  ? "bottom-full border-b-4 border-b-[#1a2b2a]"
                  : "top-full border-t-4 border-t-[#1a2b2a]"
              }
            `}
          />
        </div>
      )}
    </div>
  );
}
