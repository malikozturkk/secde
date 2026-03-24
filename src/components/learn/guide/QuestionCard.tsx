import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Question } from "@/src/icons/tsx/learn";

export interface QuestionCardOption {
  label: string;
  value: string | number;
}

export interface QuestionCardProps {
  question: string;
  options: QuestionCardOption[];
  badgeLabel?: string;
  submitLabel?: string;
  onSubmit?: (selected: QuestionCardOption) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  badgeLabel = "PEKİŞTİR",
  submitLabel = "GÖNDER",
  onSubmit,
}) => {
  const [selected, setSelected] = useState<QuestionCardOption | null>(null);

  const handleSubmit = () => {
    if (selected && onSubmit) {
      onSubmit(selected);
    }
  };

  return (
    <div className="relative flex flex-col gap-5 bg-[#172125] rounded-2xl px-5 pt-5 pb-6 font-sans w-full border border-[#1b2529]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#1b3636] flex items-center justify-center">
          <Question width={12} height={12} />
        </div>
        <span className="text-[#f0f8fc] text-xs font-bold tracking-[0.18em] uppercase">
          {badgeLabel}
        </span>
      </div>

      <p className="text-[#f0f8fc] text-[17px] font-semibold leading-snug tracking-tight">
        {question}
      </p>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = selected?.value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelected(opt)}
              className={[
                "flex items-center justify-between cursor-pointer",
                "p-4 rounded-2xl",
                "border transition-all duration-150",
                "text-sm font-medium text-left",
                isSelected
                  ? "bg-[#1a2e26] border-[#3dffc0] text-[#3dffc0]"
                  : "bg-[#172125] border-[#41494c] text-[#cccccc] hover:border-[#41494c]",
              ].join(" ")}
            >
              <span>{opt.label}</span>
              <span
                className={[
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected ? "border-[#3dffc0]" : "border-[#41494c]",
                ].join(" ")}
              >
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3dffc0]" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <Button onClick={handleSubmit} disabled={!selected} className="mt-1">
        {submitLabel}
      </Button>
    </div>
  );
};

export default QuestionCard;

// ─── Kullanım Örneği ─────────────────────────────────────────────────────────
/*
import QuestionCard from "./QuestionCard";

const options = [
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
];

<QuestionCard
  question="Windi namazı _ _ _ rekattır?"
  options={options}
  onSubmit={(selected) => console.log("Seçilen:", selected)}
/>

// Harici Button kullanımı:
<QuestionCard
  question="Windi namazı _ _ _ rekattır?"
  options={options}
  Button={MyDesignSystemButton}
  onSubmit={(selected) => console.log(selected)}
/>
*/
