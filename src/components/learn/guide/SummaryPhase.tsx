import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../../ui/Button";
import { LearnNode } from "@/src/types/learn.types";

const SummaryPhase = ({
  title,
  steps,
  nextNode,
  onReview,
  onNext,
}: {
  title: string;
  steps: { number: number; label: string }[];
  nextNode: LearnNode | null;
  onReview: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0e2a20] border border-[#3dffc0] flex items-center justify-center shrink-0">
            <CheckCircle width={16} height={16} className="text-[#3dffc0]" />
          </div>
          <span className="bg-[#006C52] text-[#3DF2C0] text-[11px] font-semibold rounded-full px-2.5 py-1 tracking-[0.06em] uppercase">
            Tamamlandı
          </span>
        </div>
        <h2 className="text-[#F0F8FC] text-[22px] font-bold m-0">
          {title} — Hızlı Özet
        </h2>
        <p className="text-[#6b9e8a] text-[13px] m-0">
          Öğrendiğin tüm adımlar bir arada
        </p>
      </div>

      <div className="bg-[#0e1e18] border border-[#1e3a2e] rounded-2xl overflow-hidden max-h-80 overflow-y-auto">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex items-center gap-3 px-4 py-3 ${
              i < steps.length - 1 ? "border-b border-[#1e3a2e]" : ""
            }`}
          >
            <div className="w-[26px] h-[26px] rounded-full bg-[#0e2a20] border border-[#3dffc0] flex items-center justify-center shrink-0">
              <CheckCircle width={13} height={13} className="text-[#3dffc0]" />
            </div>
            <span className="text-[#c8e8dc] text-sm font-medium">
              {step.label}
            </span>
            <span className="ml-auto text-[#3a6b55] text-xs font-semibold">
              {String(step.number).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onReview} variant="ghost">
          Tekrar incele
        </Button>
        <Button
          onClick={onNext}
          variant="emerald"
          icon={<ArrowRight width={16} height={16} />}
          iconPosition="right"
        >
          {nextNode ? <>{nextNode.title}</> : <>Tüm konulara dön</>}
        </Button>
      </div>
    </div>
  );
};

export default SummaryPhase;
