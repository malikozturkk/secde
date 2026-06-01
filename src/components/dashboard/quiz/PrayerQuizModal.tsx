"use client";

import React, { useCallback, useEffect, useState } from "react";
import { resolveApiErrorMessage } from "@/src/constants/error-messages";
import { Sheet } from "@/src/components/ui/Sheet";
import { Button } from "@/src/components/ui/Button";
import { SkeletonBox } from "@/src/components/ui/SkeletonBox";
import {
  isPrayerQuestionsExpired,
  usePrayerQuestions,
} from "@/src/hooks/streak";
import {
  PRAYER_META,
  PRAYER_QUIZ_QUESTION_COUNT,
} from "@/src/constants/streak";
import { PrayerType } from "@/src/types/enums/streak.enums";
import type {
  PrayerCompletionResult,
  PrayerQuestionsQuery,
  QuizAnswer,
} from "@/src/types";
import { CrossIcon } from "../icons";
import { PRAYER_COLORWAY } from "../styles";
import { QuizProgress } from "./QuizProgress";
import { QuizOption } from "./QuizOption";
import { QuizSuccess } from "./QuizSuccess";
import { cn } from "@/src/lib/utils";

interface PrayerQuizModalProps {
  isOpen: boolean;
  prayerType: PrayerType | null;
  quizQueryParams: PrayerQuestionsQuery | null;
  onClose: () => void;
  onSubmit: (input: {
    prayerType: PrayerType;
    quizId: string;
    answers: QuizAnswer[];
  }) => Promise<PrayerCompletionResult | undefined>;
}

type Phase = "quiz" | "submitting" | "success" | "error";

const OPTION_LETTER = (idx: number): string => String.fromCharCode(65 + idx);

const RESET_ANSWERS: QuizAnswer[] = [];

export const PrayerQuizModal: React.FC<PrayerQuizModalProps> = ({
  isOpen,
  prayerType,
  quizQueryParams,
  onClose,
  onSubmit,
}) => {
  const questionsQuery = usePrayerQuestions(isOpen ? quizQueryParams : null);

  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>(RESET_ANSWERS);
  const [completionResult, setCompletionResult] =
    useState<PrayerCompletionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const data = questionsQuery.data;
  const total = data?.questions.length ?? PRAYER_QUIZ_QUESTION_COUNT;
  const currentQuestion = data?.questions[step];

  useEffect(() => {
    if (isOpen) return;
    setPhase("quiz");
    setStep(0);
    setSelectedOptionId(null);
    setAnswers(RESET_ANSWERS);
    setCompletionResult(null);
    setErrorMessage(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (questionsQuery.isFetching) return;
    if (isPrayerQuestionsExpired(data)) {
      void questionsQuery.refetch();
    }
  }, [isOpen, data, questionsQuery]);

  const handleSelect = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  const handleSubmit = useCallback(
    async (finalAnswers: QuizAnswer[]) => {
      if (!prayerType || !data) return;

      if (finalAnswers.length !== total) {
        setErrorMessage("Bütün sorulara cevap verilmedi.");
        setPhase("error");
        return;
      }
      if (isPrayerQuestionsExpired(data)) {
        setErrorMessage(
          "Sorular zaman aşımına uğradı — yeni sorular yükleniyor."
        );
        setPhase("error");
        void questionsQuery.refetch();
        return;
      }

      try {
        setPhase("submitting");
        setErrorMessage(null);
        const result = await onSubmit({
          prayerType,
          quizId: data.quizId,
          answers: finalAnswers,
        });
        setCompletionResult(result ?? null);
        setPhase("success");
      } catch (err) {
        setErrorMessage(
          resolveApiErrorMessage(
            err,
            "Vakit kaydedilemedi — biraz sonra tekrar deneyelim."
          )
        );
        setPhase("error");
      }
    },
    [data, onSubmit, prayerType, questionsQuery, total]
  );

  const handleAdvance = useCallback(() => {
    if (!data || !currentQuestion || !selectedOptionId) return;

    const nextAnswers = [...answers];
    nextAnswers[step] = {
      questionId: currentQuestion.id,
      optionId: selectedOptionId,
    };
    setAnswers(nextAnswers);

    const isLast = step === total - 1;
    if (!isLast) {
      setStep((s) => s + 1);
      setSelectedOptionId(null);
      return;
    }

    void handleSubmit(nextAnswers);
  }, [
    answers,
    currentQuestion,
    data,
    handleSubmit,
    selectedOptionId,
    step,
    total,
  ]);

  if (!prayerType) return null;
  const meta = PRAYER_META[prayerType];
  const colorway = PRAYER_COLORWAY[prayerType];

  const isSubmitting = phase === "submitting";
  const isLastStep = step === total - 1;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      aria-label={`${meta.label} bilgi testi`}
      withGrip
    >
      {phase === "success" && completionResult ? (
        <>
          <QuizSuccess
            prayerType={prayerType}
            prayerLabel={meta.label}
            xpAwarded={completionResult.xpAwarded}
            currentStreak={completionResult.currentStreak}
            leveledUp={completionResult.leveledUp}
          />
          <div className="border-t border-white/[0.06] bg-[var(--color-bg)] px-[18px] py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <Button
              variant="orange"
              size="lg"
              onClick={onClose}
              className="w-full"
            >
              Devam et
            </Button>
          </div>
        </>
      ) : (
        <>
          <header className="flex items-center gap-3 border-b border-white/[0.06] p-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              className="grid h-9 w-9 place-items-center rounded-full border-0 bg-[#1C2E35] text-white/55 active:scale-95"
            >
              <CrossIcon className="h-4 w-4" />
            </button>
            <QuizProgress
              total={total}
              current={step}
              answered={!!selectedOptionId}
            />
            <div
              className={cn(
                "grid w-9 place-items-center font-display text-base font-black tabular-nums",
                colorway.textAccent
              )}
              aria-label={`${step + 1} / ${total}`}
            >
              {step + 1}
              <span className="text-white/50">/{total}</span>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            {questionsQuery.isPending ? (
              <QuizLoadingSkeleton />
            ) : questionsQuery.isError || !data ? (
              <QuizLoadError
                onRetry={() => {
                  setErrorMessage(null);
                  void questionsQuery.refetch();
                }}
              />
            ) : (
              <>
                <div>
                  <div
                    className={cn(
                      "text-[10px] font-black uppercase tracking-[0.16em]",
                      colorway.textAccent
                    )}
                  >
                    {meta.label.toUpperCase()} · BİLGİ TESTİ
                  </div>
                  <h2 className="mt-1.5 text-[22px] font-black leading-tight tracking-[-0.01em] text-white">
                    {currentQuestion?.prompt}
                  </h2>
                </div>
                <div className="flex flex-col gap-2.5">
                  {currentQuestion?.options.map((opt, idx) => (
                    <QuizOption
                      key={opt.id}
                      optionId={opt.id}
                      letter={OPTION_LETTER(idx)}
                      label={opt.text}
                      status={selectedOptionId === opt.id ? "selected" : "idle"}
                      disabled={isSubmitting}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="border-t border-white/[0.06] bg-[var(--color-bg)] px-[18px] py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {phase === "error" && errorMessage ? (
              <div
                className="mb-3 flex items-center gap-2.5 rounded-2xl border border-[rgba(239,68,68,0.30)] bg-[rgba(239,68,68,0.10)] p-3 text-[13px] font-black text-rose-300"
                role="alert"
              >
                <CrossIcon className="h-[22px] w-[22px] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {phase === "error" ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setPhase("quiz");
                  setErrorMessage(null);
                }}
              >
                Tekrar dene
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={
                  selectedOptionId == null ||
                  questionsQuery.isPending ||
                  isSubmitting
                }
                onClick={handleAdvance}
              >
                {isSubmitting
                  ? "Kaydediliyor…"
                  : isLastStep
                  ? "Bitir & İşaretle"
                  : "Devam"}
              </Button>
            )}
          </div>
        </>
      )}
    </Sheet>
  );
};

const QuizLoadingSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4">
    <SkeletonBox className="h-7 w-32" shape="pill" />
    <SkeletonBox className="h-16 w-full" />
    {Array.from({ length: 3 }).map((_, i) => (
      <SkeletonBox key={i} className="h-12 w-full" />
    ))}
  </div>
);

const QuizLoadError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col gap-4" role="alert">
    <h3 className="text-lg font-black text-white">Sorular yüklenemedi</h3>
    <p className="text-sm font-bold text-white/55">
      Bağlantını kontrol et ve tekrar dene.
    </p>
    <Button variant="primary" size="sm" onClick={onRetry}>
      Tekrar dene
    </Button>
  </div>
);
