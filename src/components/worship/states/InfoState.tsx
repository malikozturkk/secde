"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface InfoStateAction {
  label: string;
  onClick: () => void;
}

interface InfoStateProps {
  tone?: "default" | "error";
  icon: React.ReactNode;
  title: string;
  body: string;
  primaryAction?: InfoStateAction;
  secondaryAction?: InfoStateAction;
}

export const InfoState: React.FC<InfoStateProps> = ({
  tone = "default",
  icon,
  title,
  body,
  primaryAction,
  secondaryAction,
}) => {
  const isError = tone === "error";

  return (
    <section
      className={cn(
        "mx-auto my-6 flex max-w-[540px] flex-col items-center gap-3.5 rounded-[var(--ng-radius-lg)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)] bg-[var(--ng-surface)] px-8 py-14 text-center",
        isError &&
          "border-rose-500/20 bg-[linear-gradient(160deg,rgba(239,68,68,0.06),var(--ng-surface))]"
      )}
    >
      <div
        className={cn(
          "flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border shadow-[0_6px_0_0_rgba(0,0,0,0.35)]",
          isError
            ? "border-rose-500/40 bg-[linear-gradient(160deg,rgba(239,68,68,0.2),rgba(239,68,68,0.05))] text-rose-300"
            : "border-[rgba(23,217,160,0.3)] bg-[linear-gradient(160deg,rgba(23,217,160,0.2),rgba(23,217,160,0.05))] text-[var(--ng-green)]"
        )}
      >
        {icon}
      </div>
      <h2 className="m-0 text-[22px] font-black tracking-[-0.01em] text-[var(--ng-text)]">
        {title}
      </h2>
      <p className="m-0 max-w-[380px] text-sm font-bold leading-[1.5] text-[var(--ng-text-3)]">
        {body}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
          {primaryAction && (
            <button
              type="button"
              className="cursor-pointer rounded-[14px] border-0 bg-[var(--ng-green)] px-5 py-3 text-[13px] font-black uppercase leading-none tracking-[0.1em] text-white shadow-[0_5px_0_0_var(--ng-green-deep)] transition-[filter,transform,box-shadow] duration-100 hover:brightness-110 active:translate-y-[3px] active:shadow-[0_2px_0_0_var(--ng-green-deep)]"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              className="cursor-pointer rounded-[14px] border border-white/20 bg-transparent px-5 py-3 text-[13px] font-black uppercase leading-none tracking-[0.1em] text-[var(--ng-text)] transition-colors duration-100 hover:bg-white/5"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </section>
  );
};
