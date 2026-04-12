"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGuide } from "@/src/hooks/learn/useGuide";
import { useCheckGuideQuestion } from "@/src/hooks/learn/useCheckGuideQuestion";
import AppLayout from "@/src/components/layout/AppLayout";
import QuestionCard from "@/src/components/learn/guide/QuestionCard";
import PathOverview from "@/src/components/learn/guide/PathOverview";
import { GuideStep, LearnNode } from "@/src/types/learn.types";
import StepProgressCard from "@/src/components/learn/guide/StepProgressCard";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import CompletionScreen from "@/src/components/learn/guide/CompletionScreen";
import { LEARN_NODES } from "@/src/app/learn/learnNodes";

export default function GuideRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data } = useGuide(id);
  const { mutateAsync: checkQuestion, isPending } = useCheckGuideQuestion();

  const [currentStep, setCurrentStep] = useState(0);
  const [answeredSteps, setAnsweredSteps] = useState<
    Record<number, { isCorrect: boolean; correctAnswer: string }>
  >({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [shakeQuestion, setShakeQuestion] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const questionCardRef = useRef<HTMLDivElement>(null);

  const steps = data?.steps ?? [];
  const activeStepData = steps[currentStep];
  const activeAnswerResult = answeredSteps[currentStep] ?? null;
  const questionAnswered = !!activeAnswerResult?.isCorrect;
  const isLastStep = currentStep === steps.length - 1;
  const nextNode = getNextNode(id);

  function getNextNode(currentId: string): LearnNode | null {
    const idx = LEARN_NODES.findIndex((n) => n.id === currentId);
    if (idx === -1 || idx === LEARN_NODES.length - 1) return null;
    return LEARN_NODES[idx + 1];
  }

  const triggerQuestionAttention = useCallback(() => {
    questionCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setShakeQuestion(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShakeQuestion(true));
    });
    setTimeout(() => setShakeQuestion(false), 600);
  }, []);

  const handleNext = useCallback(() => {
    const hasUnansweredQuestion =
      !!activeStepData?.randomQuestion && !questionAnswered;
    if (hasUnansweredQuestion) {
      triggerQuestionAttention();
      return;
    }

    if (isLastStep) {
      setShowCompletion(true);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [
    currentStep,
    steps.length,
    activeStepData,
    questionAnswered,
    isLastStep,
    triggerQuestionAttention,
  ]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const handleQuestionSubmit = async (selected: string) => {
    if (!activeStepData?.randomQuestion) return;

    const result = await checkQuestion({
      questionId: activeStepData.randomQuestion.id,
      answer: selected,
    });

    setAnsweredSteps((prev) => ({
      ...prev,
      [currentStep]: result as { isCorrect: boolean; correctAnswer: string },
    }));
  };

  const handleReview = useCallback(() => {
    setShowCompletion(false);
    setCurrentStep(0);
  }, []);

  const handleGoNext = useCallback(() => {
    if (nextNode) {
      router.push(nextNode.href);
    } else {
      router.push("/learn");
    }
  }, [nextNode, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCompletion) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, showCompletion]);

  const summarySteps = steps.map((step: GuideStep) => ({
    number: step.step,
    label: step.name,
  }));

  return (
    <>
      {showCompletion && (
        <CompletionScreen
          title={data?.title ?? ""}
          steps={summarySteps}
          nextNode={nextNode}
          onReview={handleReview}
          onNext={handleGoNext}
        />
      )}

      <AppLayout
        rightPanel={
          <div className="flex flex-col h-full gap-4 lg:gap-8">
            {activeStepData?.randomQuestion && !questionAnswered && (
              <div ref={questionCardRef}>
                <QuestionCard
                  question={activeStepData.randomQuestion.question}
                  options={activeStepData.randomQuestion.options}
                  selected={selectedAnswers[currentStep] ?? null}
                  onSelect={(opt) =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [currentStep]: opt,
                    }))
                  }
                  onSubmit={handleQuestionSubmit}
                  answerResult={activeAnswerResult}
                  isPending={isPending}
                  shake={shakeQuestion}
                />
              </div>
            )}
            {activeStepData?.randomQuestion && questionAnswered && (
              <div className="flex items-center gap-3 bg-[#1a2e26] border border-[#3dffc0] rounded-2xl px-5 py-4">
                <CheckCircle
                  width={20}
                  height={20}
                  className="text-[#3dffc0] shrink-0"
                />
                <p className="text-[#3dffc0] text-sm font-medium">
                  Doğru! Bir sonraki adıma geçebilirsin.
                </p>
              </div>
            )}
            <PathOverview
              activeStep={currentStep + 1}
              steps={steps.map((step: GuideStep) => ({
                number: step.step,
                label: step.name,
              }))}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4 lg:gap-8 h-full">
          <div className="flex items-center gap-3 flex-col lg:flex-row">
            <span className="bg-[#006C52] text-[#3DF2C0] text-[10px] lg:text-xs rounded-full px-3 py-1 whitespace-nowrap">
              {data?.title?.toUpperCase() ?? ""}
            </span>
            <h1 className="text-[#F0F8FC] text-2xl lg:text-3xl font-bold">
              {data?.title ?? ""} Rehberi
            </h1>
          </div>

          {activeStepData && <StepProgressCard step={activeStepData} />}

          <div className="flex justify-between items-center gap-4">
            <Button
              variant="gray"
              className="w-1/3"
              icon={<ArrowLeft width={16} height={16} />}
              iconPosition="left"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Geri
            </Button>

            {isLastStep ? (
              <Button
                variant="primary"
                className="w-2/3"
                icon={<CheckCircle width={17} height={17} />}
                iconPosition="right"
                onClick={handleNext}
              >
                Tamamla
              </Button>
            ) : (
              <Button
                variant="lightBlue"
                className="w-2/3"
                icon={<ArrowRight width={16} height={16} />}
                iconPosition="right"
                onClick={handleNext}
              >
                İleri
              </Button>
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
