import { Check } from "lucide-react";
import React from "react";

export interface PathStep {
  number: number;
  label: string;
}

export interface PathOverviewProps {
  title?: string;
  steps: PathStep[];
  activeStep: number;
  className?: string;
}

const getOpacity = (stepNumber: number, activeStep: number): number => {
  const diff = stepNumber - activeStep;
  if (diff <= 0) return 1;
  if (diff === 1) return 0.45;
  return 0.22;
};

const PathOverview: React.FC<PathOverviewProps> = ({
  title = "SONRAKİ ADIMLAR",
  steps,
  activeStep,
  className = "",
}) => {
  return (
    <div
      className={[
        "bg-[#0C1518] rounded-2xl px-5 py-5 w-full flex flex-col gap-1 border border-[#1b2529] overflow-scroll",
        className,
      ].join(" ")}
    >
      <h2 className="text-[#A4ACB0] text-[13px] font-bold tracking-[0.14em] uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-1">
        {steps.map((step) => {
          const opacity = getOpacity(step.number, activeStep);
          const isActive = step.number === activeStep;
          const isCompleted = step.number < activeStep;

          return (
            <div
              key={step.number}
              className="flex items-center gap-4 px-1 py-2"
              style={{ opacity }}
            >
              <span
                className={[
                  "text-[15px] flex items-center justify-center w-8 h-8 rounded-sm text-center tabular-nums",
                  isCompleted
                    ? "bg-[#1a2e26] text-[#3dffc0] font-bold"
                    : "bg-[#111B1F] text-white",
                  isActive ? "font-bold" : "font-medium",
                ].join(" ")}
              >
                {isCompleted ? <Check width={18} height={18} /> : step.number}
              </span>
              <span className="relative text-[15px] leading-snug">
                <span
                  className={[
                    isActive ? "text-white font-semibold" : "font-normal",
                    isCompleted ? "text-[#6b7a7f]" : "text-white",
                  ].join(" ")}
                >
                  {step.label}
                </span>
                {isCompleted && (
                  <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 block h-[1.5px] rounded-full bg-[#3dffc0] opacity-50" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathOverview;
