import React from "react";
import { Button } from "../../ui/Button";
import { Question } from "@/src/icons/tsx/learn";
import { XCircle } from "lucide-react";
import type {
  GuideCheckQuestionResponse,
  RandomQuestionOption,
} from "@/src/types/learn.types";

interface QuestionCardProps {
  question: string;
  options: RandomQuestionOption[];
  badgeLabel?: string;
  submitLabel?: string;
  selected: string | null;
  onSelect: (optionId: string) => void;
  onSubmit?: (optionId: string) => void;
  answerResult?: GuideCheckQuestionResponse | null;
  isPending?: boolean;
  shake?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  badgeLabel = "PEKİŞTİR",
  submitLabel = "GÖNDER",
  selected,
  onSelect,
  onSubmit,
  answerResult,
  isPending,
  shake = false,
}) => {
  const handleSubmit = () => {
    if (selected && onSubmit) {
      onSubmit(selected);
    }
  };

  const getOptionStyle = (optionId: string) => {
    const base = [
      "flex items-center justify-between cursor-pointer",
      "p-4 rounded-[var(--ng-radius)] border transition-all duration-150",
      "text-sm font-medium text-left",
    ];

    if (answerResult) {
      if (optionId === answerResult.correctOptionId)
        return [...base, "bg-[#1a2e26] border-[#3dffc0] text-[#3dffc0]"].join(
          " "
        );
      if (optionId === selected && !answerResult.isCorrect)
        return [...base, "bg-[#2e1a1a] border-[#ff5c5c] text-[#ff5c5c]"].join(
          " "
        );
      return [
        ...base,
        "bg-[#172125] border-[#41494c] text-[#555] cursor-default",
      ].join(" ");
    }

    const isSelected = selected === optionId;
    return [
      ...base,
      isSelected
        ? "bg-[#1a2e26] border-[#3dffc0] text-[#3dffc0]"
        : "bg-[#172125] border-[#41494c] text-[#cccccc] hover:border-[#41494c]",
    ].join(" ");
  };

  const getRadioStyle = (optionId: string) => {
    if (answerResult) {
      if (optionId === answerResult.correctOptionId) return "border-[#3dffc0]";
      if (optionId === selected && !answerResult.isCorrect)
        return "border-[#ff5c5c]";
      return "border-[#41494c]";
    }
    return selected === optionId ? "border-[#3dffc0]" : "border-[#41494c]";
  };

  const getRadioDot = (optionId: string) => {
    if (answerResult) {
      if (optionId === answerResult.correctOptionId)
        return <span className="w-2.5 h-2.5 rounded-full bg-[#3dffc0]" />;
      if (optionId === selected && !answerResult.isCorrect)
        return <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c5c]" />;
      return null;
    }
    return selected === optionId ? (
      <span className="w-2.5 h-2.5 rounded-full bg-[#3dffc0]" />
    ) : null;
  };

  return (
    <div
      className={[
        "relative flex flex-col gap-5 bg-[#172125] rounded-[var(--ng-radius)] px-5 pt-5 pb-6 font-sans w-full border border-[#1b2529]",
        shake ? "animate-shake border-[#ff5c5c]" : "",
      ].join(" ")}
    >
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
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => !answerResult && onSelect(opt.id)}
            disabled={!!answerResult}
            className={getOptionStyle(opt.id)}
          >
            <span>{opt.text}</span>
            <span
              className={[
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                getRadioStyle(opt.id),
              ].join(" ")}
            >
              {getRadioDot(opt.id)}
            </span>
          </button>
        ))}
      </div>

      {answerResult && !answerResult.isCorrect && (
        <div className="flex items-center gap-2 bg-[#2e1a1a] border border-[#ff5c5c] rounded-xl px-4 py-3">
          <XCircle width={16} height={16} className="text-[#ff5c5c] shrink-0" />
          <p className="text-[#ff5c5c] text-sm">
            Yanlış cevap. Devam etmek için eğitimi tekrar başlatın.
          </p>
        </div>
      )}

      {answerResult?.explanation && (
        <div className="rounded-xl border border-[#2b5f52] bg-[#14231f] px-4 py-3">
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#3dffc0]">
            Neden?
          </span>
          <p className="mt-1 text-sm leading-relaxed text-[#cfe6df]">
            {answerResult.explanation}
          </p>
        </div>
      )}

      {!answerResult && (
        <Button
          onClick={handleSubmit}
          disabled={!selected || isPending}
          className="mt-1"
        >
          {isPending ? "Kontrol ediliyor..." : submitLabel}
        </Button>
      )}
    </div>
  );
};

export default QuestionCard;
