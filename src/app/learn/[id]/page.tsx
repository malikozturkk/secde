"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useGuide } from "@/src/hooks/learn/useGuide";
import ProgressBar from "./components/ProgressBar";
import StepContent from "./components/StepContent";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Trophy, Home } from "lucide-react";
import Link from "next/link";

export default function GuideRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useGuide(id);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0b1215] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4fc3f7] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 font-black uppercase tracking-widest text-[13px]">
            İçerik Yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-[#0b1215] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-white mb-4">Bir hata oluştu</h2>
        <p className="text-white/60 mb-8 max-w-[400px]">
          Rehber yüklenirken bir sorunla karşılaştık. Lütfen daha sonra tekrar
          deneyin.
        </p>
        <Link
          href="/learn"
          className="bg-[#1a3842] text-[#4fc3f7] px-8 py-4 rounded-2xl font-black uppercase tracking-wide hover:bg-[#234b58] transition-colors"
        >
          Kütüphaneye Dön
        </Link>
      </div>
    );
  }

  const guide = data;
  const currentStep = guide.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / guide.totalSteps) * 100;
  const isNamaz = id !== "wudu" && id !== "ghusl";
  const accentColor = isNamaz ? "#4FC3F7" : "#25B49A";

  const handleNext = () => {
    if (currentStepIndex < guide.steps.length - 1) {
      setDirection(1);
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      router.push("/learn");
    }
  };

  if (isFinished) {
    return (
      <div className="fixed inset-0 bg-[#0b1215] z-[60] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-10"
        >
          <div className="w-24 h-24 bg-[#ffc800] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,200,0,0.3)] ring-8 ring-[#ffc8001a]">
            <Trophy size={48} className="text-[#0b1215]" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            Tebrikler!
          </h1>
          <p className="text-[18px] font-bold text-white/50 max-w-[360px] mx-auto leading-relaxed italic">
            <span className="text-white/90">{guide.title}</span> rehberini
            başarıyla tamamladın. Namazına ve ibadetine kabul olsun.
          </p>
        </motion.div>

        <div className="flex flex-col w-full max-w-[300px] gap-4">
          <Link
            href="/learn"
            className="w-full py-5 bg-[#25B49A] hover:bg-[#209f87] text-white font-black text-[16px] rounded-2xl border-b-4 border-[#1a806d] transition-all active:border-b-0 active:translate-y-1 tracking-widest uppercase flex items-center justify-center gap-3 no-underline"
          >
            Hafızama Kazındı
            <Check size={20} />
          </Link>
          <button
            onClick={() => {
              setIsFinished(false);
              setCurrentStepIndex(0);
            }}
            className="w-full py-5 bg-transparent hover:bg-white/5 text-white/40 hover:text-white font-black text-[14px] rounded-2xl transition-all tracking-widest uppercase flex items-center justify-center gap-2"
          >
            Tekrar Et
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0b1215] z-50 flex flex-col overflow-hidden">
      <div className="w-full max-w-[800px] mx-auto pt-8 px-6">
        <ProgressBar
          progress={progress}
          onClose={() => router.push("/learn")}
          accentColor={accentColor}
        />
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center overflow-y-auto w-full">
        <div className="w-full max-w-[900px] py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStepIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="w-full"
            >
              <StepContent
                step={currentStep}
                isNamaz={isNamaz}
                accentColor={accentColor}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full border-t-2 border-white/5 bg-[#131f24] py-8 px-6">
        <div className="max-w-[700px] mx-auto flex items-center justify-between gap-6">
          <button
            onClick={handleBack}
            className="px-8 py-4 rounded-2xl font-black text-[15px] text-white/40 hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-widest group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            GERİ
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-5 rounded-2xl font-black text-[16px] text-white tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 shadow-lg border-b-4 active:border-b-0 active:translate-y-1"
            style={{
              backgroundColor: accentColor,
              borderColor: isNamaz ? "#1976D2" : "#1a806d",
            }}
          >
            {currentStepIndex === guide.totalSteps - 1 ? "BİTİR" : "İLERİ"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
