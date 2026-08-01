"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { resolveApiErrorMessage } from "@/src/constants/error-messages";
import { getDomainErrorCode } from "@/src/lib/api-error";
import { Sheet } from "@/src/components/ui/Sheet";
import { Button } from "@/src/components/ui/Button";
import { SkeletonBox } from "@/src/components/ui/SkeletonBox";
import {
  isPrayerQuestionsExpired,
  usePrayerQuestions,
} from "@/src/hooks/streak/usePrayerQuestions";
import { useStartPrayerQuestion } from "@/src/hooks/streak/useStartPrayerQuestion";
import { useAnswerPrayerQuestion } from "@/src/hooks/streak/useAnswerPrayerQuestion";
import {
  PRAYER_META,
  PRAYER_QUIZ_QUESTION_COUNT,
} from "@/src/constants/streak";
import {
  PrayerAnswerResult,
  PrayerQuestionStatus,
  PrayerQuizStatus,
  PrayerType,
} from "@/src/types/enums/streak.enums";
import type {
  PrayerCompletionResult,
  PrayerQuestionsQuery,
  QuizQuestion,
} from "@/src/types/streak.types";
import { Cross, Lock } from "@/src/icons/tsx/dashboard";
import { PRAYER_COLORWAY } from "../styles";
import { QuizProgress } from "./QuizProgress";
import { QuizOption } from "./QuizOption";
import { QuizSuccess } from "./QuizSuccess";
import { useNowMs } from "@/src/hooks/streak/useNowTicker";
import { cn } from "@/src/lib/utils";

interface PrayerQuizModalProps {
  isOpen: boolean;
  prayerType: PrayerType | null;
  quizQueryParams: PrayerQuestionsQuery | null;
  onClose: () => void;
  onCompletion?: (completion: PrayerCompletionResult) => void;
}

const OPTION_LETTER = (idx: number): string => String.fromCharCode(65 + idx);

const isQuizLocked = (
  status: PrayerQuizStatus | undefined,
  isLocked: boolean | undefined
): boolean => {
  if (isLocked) return true;
  if (!status) return false;
  return (
    status === PrayerQuizStatus.Failed || status === PrayerQuizStatus.Expired
  );
};

interface LockedReason {
  title: string;
  description: string;
}

const LOCK_REASON_WRONG: LockedReason = {
  title: "Cevap yanlış",
  description:
    "Bu vakit için işaretleme kapatıldı. Bir sonraki güne kadar tekrar açılmayacak.",
};

const LOCK_REASON_EXPIRED: LockedReason = {
  title: "Süre doldu",
  description:
    "Bu vakit için işaretleme kapatıldı. Bir sonraki güne kadar tekrar açılmayacak.",
};

const LOCK_REASON_DEFAULT: LockedReason = {
  title: "İşaretleme kapatıldı",
  description:
    "Bu vakit için işaretleme kapatıldı. Bir sonraki güne kadar tekrar açılmayacak.",
};

export const PrayerQuizModal: React.FC<PrayerQuizModalProps> = ({
  isOpen,
  prayerType,
  quizQueryParams,
  onClose,
  onCompletion,
}) => {
  const questionsQuery = usePrayerQuestions(isOpen ? quizQueryParams : null);
  const startMutation = useStartPrayerQuestion();
  const answerMutation = useAnswerPrayerQuestion();
  const nowMs = useNowMs();

  const [selections, setSelections] = useState<Record<string, string>>({});
  const [completionResult, setCompletionResult] =
    useState<PrayerCompletionResult | null>(null);
  const [mutationLockReason, setMutationLockReason] =
    useState<LockedReason | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startedQuestionIdsRef = useRef<Set<string>>(new Set());

  const data = questionsQuery.data;
  const queryError = questionsQuery.error;
  const queryErrorCode = getDomainErrorCode(queryError);
  const queryLocked = queryErrorCode === "PRAYER_MARKING_LOCKED";

  const orderedQuestions = useMemo(() => {
    if (!data) return [];
    return [...data.questions].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [data]);

  const total = orderedQuestions.length || PRAYER_QUIZ_QUESTION_COUNT;

  const currentQuestion: QuizQuestion | undefined = useMemo(() => {
    return orderedQuestions.find(
      (q) =>
        q.status === PrayerQuestionStatus.Pending ||
        q.status === PrayerQuestionStatus.Shown
    );
  }, [orderedQuestions]);

  const currentIndex = useMemo(() => {
    if (!currentQuestion) return total;
    const idx = orderedQuestions.findIndex((q) => q.id === currentQuestion.id);
    return idx >= 0 ? idx : 0;
  }, [currentQuestion, orderedQuestions, total]);

  const dataLocked = isQuizLocked(data?.quizStatus, data?.isLocked);
  const quizSessionExpired = isPrayerQuestionsExpired(data, nowMs);

  useEffect(() => {
    if (!isOpen) return;
    if (!currentQuestion) return;
    if (currentQuestion.status !== PrayerQuestionStatus.Pending) return;
    if (!data) return;
    if (mutationLockReason) return;
    if (dataLocked || queryLocked || quizSessionExpired) return;
    if (startMutation.isPending) return;
    if (startedQuestionIdsRef.current.has(currentQuestion.id)) return;

    const effectivePrayerType = quizQueryParams?.prayerType ?? prayerType;
    if (!effectivePrayerType) return;

    startedQuestionIdsRef.current.add(currentQuestion.id);
    startMutation.mutate(
      {
        prayerType: effectivePrayerType,
        quizId: data.quizId,
        questionId: currentQuestion.id,
      },
      {
        onError: (err) => {
          startedQuestionIdsRef.current.delete(currentQuestion.id);
          const code = getDomainErrorCode(err);
          if (
            code === "PRAYER_MARKING_LOCKED" ||
            code === "QUIZ_QUESTION_NOT_STARTABLE" ||
            code === "QUIZ_EXPIRED" ||
            code === "PRAYER_WINDOW_CLOSED"
          ) {
            setMutationLockReason(LOCK_REASON_DEFAULT);
          } else {
            setErrorMessage(resolveApiErrorMessage(err));
          }
          void questionsQuery.refetch();
        },
      }
    );
  }, [
    isOpen,
    currentQuestion,
    startMutation,
    data,
    dataLocked,
    queryLocked,
    quizSessionExpired,
    mutationLockReason,
    questionsQuery,
    prayerType,
    quizQueryParams,
  ]);

  const deadlineAt = currentQuestion?.deadlineAt ?? null;
  const parsedDeadlineMs = deadlineAt ? Date.parse(deadlineAt) : NaN;
  const deadlineMs = Number.isFinite(parsedDeadlineMs)
    ? parsedDeadlineMs
    : null;

  const timeLimitMs = currentQuestion
    ? currentQuestion.timeLimitSeconds * 1000
    : 0;

  const remainingMs =
    deadlineMs != null ? Math.max(0, deadlineMs - nowMs) : null;
  const remainingSeconds =
    remainingMs != null ? Math.ceil(remainingMs / 1000) : null;
  const elapsedPercent =
    deadlineMs != null && timeLimitMs > 0 && remainingMs != null
      ? Math.max(0, Math.min(100, 100 - (remainingMs / timeLimitMs) * 100))
      : undefined;
  const timeExpired =
    currentQuestion?.status === PrayerQuestionStatus.Shown &&
    remainingMs != null &&
    remainingMs <= 0;

  const refetchedOnExpiryRef = useRef<string | null>(null);
  useEffect(() => {
    if (!timeExpired) return;
    if (!currentQuestion) return;
    if (refetchedOnExpiryRef.current === currentQuestion.id) return;
    refetchedOnExpiryRef.current = currentQuestion.id;
    void questionsQuery.refetch();
  }, [timeExpired, currentQuestion, questionsQuery]);

  const selectedOptionId = currentQuestion
    ? selections[currentQuestion.id] ?? null
    : null;

  const handleSelect = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;
      const qid = currentQuestion.id;
      setSelections((prev) => ({ ...prev, [qid]: optionId }));
    },
    [currentQuestion]
  );

  const handleAnswer = useCallback(() => {
    if (!currentQuestion || !data || !selectedOptionId) return;
    if (answerMutation.isPending) return;
    const effectivePrayerType = quizQueryParams?.prayerType ?? prayerType;
    if (!effectivePrayerType) return;
    setErrorMessage(null);
    answerMutation.mutate(
      {
        prayerType: effectivePrayerType,
        quizId: data.quizId,
        questionId: currentQuestion.id,
        optionId: selectedOptionId,
      },
      {
        onSuccess: (response) => {
          if (response.result === PrayerAnswerResult.Correct) {
            if (response.prayerCompletion) {
              setCompletionResult(response.prayerCompletion);
              onCompletion?.(response.prayerCompletion);
            }
            return;
          }
          if (response.result === PrayerAnswerResult.Incorrect) {
            setMutationLockReason(LOCK_REASON_WRONG);
            return;
          }
          if (response.result === PrayerAnswerResult.Expired) {
            setMutationLockReason(LOCK_REASON_EXPIRED);
            return;
          }
        },
        onError: (err) => {
          const code = getDomainErrorCode(err);
          if (
            code === "PRAYER_MARKING_LOCKED" ||
            code === "QUIZ_EXPIRED" ||
            code === "PRAYER_WINDOW_CLOSED"
          ) {
            setMutationLockReason(LOCK_REASON_DEFAULT);
            void questionsQuery.refetch();
            return;
          }
          if (code === "QUIZ_QUESTION_ALREADY_ANSWERED") {
            void questionsQuery.refetch();
            return;
          }
          setErrorMessage(resolveApiErrorMessage(err));
        },
      }
    );
  }, [
    answerMutation,
    currentQuestion,
    data,
    onCompletion,
    prayerType,
    questionsQuery,
    quizQueryParams,
    selectedOptionId,
  ]);

  if (!prayerType) return null;
  const meta = PRAYER_META[prayerType];
  const colorway = PRAYER_COLORWAY[prayerType];

  const showSuccess = !!completionResult;
  const dataLockReason =
    queryLocked || dataLocked || quizSessionExpired
      ? LOCK_REASON_DEFAULT
      : null;
  const lockedView = !showSuccess ? mutationLockReason ?? dataLockReason : null;
  const effectiveLock = !!lockedView;

  const headerCount = `${Math.min(currentIndex + 1, total)} / ${total}`;
  const showTimerLabel =
    !effectiveLock &&
    !showSuccess &&
    currentQuestion?.status === PrayerQuestionStatus.Shown &&
    remainingSeconds != null;
  const optionsDisabled =
    effectiveLock ||
    showSuccess ||
    !currentQuestion ||
    currentQuestion.status !== PrayerQuestionStatus.Shown ||
    answerMutation.isPending ||
    timeExpired;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      aria-label={`${meta.label} bilgi testi`}
      withGrip
    >
      {showSuccess && completionResult ? (
        <>
          <QuizSuccess
            prayerType={prayerType}
            prayerLabel={meta.label}
            xpAwarded={completionResult.xpAwarded}
            xpBeforePenalty={completionResult.xpBeforePenalty}
            completionStatus={completionResult.status}
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
      ) : effectiveLock && lockedView ? (
        <>
          <QuizLockedView reason={lockedView} prayerLabel={meta.label} />
          <div className="border-t border-white/[0.06] bg-[var(--color-bg)] px-[18px] py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <Button
              variant="primary"
              size="lg"
              onClick={onClose}
              className="w-full"
            >
              Kapat
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
              <Cross className="h-4 w-4" />
            </button>
            <QuizProgress
              total={total}
              current={currentIndex}
              answered={!!selectedOptionId}
              activePercent={elapsedPercent}
            />
            <div
              className={cn(
                "grid w-9 place-items-center font-display text-base font-black tabular-nums",
                colorway.textAccent
              )}
              aria-label={headerCount}
            >
              {Math.min(currentIndex + 1, total)}
              <span className="text-white/50">/{total}</span>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            {questionsQuery.isPending || startMutation.isPending ? (
              <QuizLoadingSkeleton />
            ) : questionsQuery.isError && !queryLocked ? (
              <QuizLoadError
                onRetry={() => {
                  setErrorMessage(null);
                  void questionsQuery.refetch();
                }}
              />
            ) : currentQuestion ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "text-[10px] font-black uppercase tracking-[0.16em]",
                        colorway.textAccent
                      )}
                    >
                      {meta.label.toUpperCase()} · BİLGİ TESTİ
                    </div>
                    <h2 className="mt-1.5 text-[22px] font-black leading-tight tracking-[-0.01em] text-white">
                      {currentQuestion.prompt}
                    </h2>
                  </div>
                  {showTimerLabel && (
                    <div
                      className={cn(
                        "shrink-0 rounded-full border px-3 py-1 text-[13px] font-black tabular-nums",
                        timeExpired
                          ? "border-rose-500/60 bg-rose-500/10 text-rose-300"
                          : remainingSeconds! <= 5
                          ? "border-rose-500/60 bg-rose-500/10 text-rose-300 animate-[pulse-ring_1.2s_ease-in-out_infinite]"
                          : "border-white/15 bg-white/[0.06] text-white/85"
                      )}
                      aria-live="polite"
                    >
                      {Math.max(0, remainingSeconds ?? 0)} sn
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  {currentQuestion.options.map((opt, idx) => (
                    <QuizOption
                      key={opt.id}
                      optionId={opt.id}
                      letter={OPTION_LETTER(idx)}
                      label={opt.text}
                      status={selectedOptionId === opt.id ? "selected" : "idle"}
                      disabled={optionsDisabled}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
                {timeExpired && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-[12px] font-bold text-rose-200">
                    Süre doldu. Sonucu görmek için kapatabilirsin.
                  </div>
                )}
              </>
            ) : (
              <QuizLoadingSkeleton />
            )}
          </div>

          <div className="border-t border-white/[0.06] bg-[var(--color-bg)] px-[18px] py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {errorMessage ? (
              <div
                className="mb-3 flex items-center gap-2.5 rounded-2xl border border-[rgba(239,68,68,0.30)] bg-[rgba(239,68,68,0.10)] p-3 text-[13px] font-black text-rose-300"
                role="alert"
              >
                <Cross className="h-[22px] w-[22px] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={
                selectedOptionId == null ||
                answerMutation.isPending ||
                startMutation.isPending ||
                !currentQuestion ||
                currentQuestion.status !== PrayerQuestionStatus.Shown ||
                timeExpired
              }
              onClick={handleAnswer}
            >
              {answerMutation.isPending ? "Gönderiliyor…" : "Cevabı gönder"}
            </Button>
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

interface QuizLockedViewProps {
  reason: LockedReason;
  prayerLabel: string;
}

const QuizLockedView: React.FC<QuizLockedViewProps> = ({
  reason,
  prayerLabel,
}) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
    <div className="grid h-20 w-20 place-items-center rounded-full border border-rose-500/40 bg-rose-500/10">
      <Lock className="h-10 w-10 text-rose-300" />
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-rose-300">
      {prayerLabel.toUpperCase()} · KİLİTLİ
    </div>
    <h2 className="text-[22px] font-black leading-tight tracking-[-0.01em] text-white">
      {reason.title}
    </h2>
    <p className="max-w-[280px] text-sm font-bold text-white/55">
      {reason.description}
    </p>
  </div>
);
