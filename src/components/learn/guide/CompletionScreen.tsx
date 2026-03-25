import { useEffect, useState } from "react";
import CelebrationPhase from "./CelebrationPhase";
import SummaryPhase from "./SummaryPhase";
import { LearnNode } from "@/src/types/learn.types";

const CompletionScreen = ({
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
  const [phase, setPhase] = useState<"celebrate" | "summary">("celebrate");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => setPhase("summary"), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0a1a14] flex flex-col items-center justify-center p-6 transition-opacity duration-400 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-lg h-96 rounded-full bg-[radial-gradient(circle,rgba(61,255,192,0.08)_0%,transparent_70%)] pointer-events-none" />

      {phase === "celebrate" ? (
        <CelebrationPhase title={title} />
      ) : (
        <SummaryPhase
          title={title}
          steps={steps}
          nextNode={nextNode}
          onReview={onReview}
          onNext={onNext}
        />
      )}
    </div>
  );
};

export default CompletionScreen;
