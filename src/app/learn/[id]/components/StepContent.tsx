"use client";

import React from "react";
import { X, Info, RotateCcw, CheckCircle2 } from "lucide-react";
import { GuideStep } from "@/src/types/learn.types";
import { motion } from "framer-motion";

interface StepContentProps {
  step: GuideStep;
  isNamaz: boolean;
  accentColor: string;
}

export default function StepContent({ step, isNamaz, accentColor }: StepContentProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Step Header */}
      <div className="mb-8 text-center px-4">
        <h2 className="text-[28px] font-black text-white m-0 tracking-tight leading-tight">
          {step.name}
        </h2>
        <p className="text-[17px] font-bold text-white/40 mt-2 m-0">
          {step.shortDescription}
        </p>
      </div>

      {/* Main Info Card */}
      <div className="w-full max-w-[500px] bg-[#1a2b30] border-2 border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
        {/* Accent Glow */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="space-y-6 relative z-10">
          {/* Metadata Row */}
          <div className="flex flex-wrap gap-3">
            {isNamaz && step.rekat && (
              <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-sm">
                <span className="text-[11px] font-black uppercase text-white/30 tracking-widest">Rekat</span>
                <span className="text-[15px] font-black text-white">{step.rekat}</span>
              </div>
            )}
            {!isNamaz && step.bodyPart && (
              <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-sm">
                <span className="text-[11px] font-black uppercase text-white/30 tracking-widest">Bölge</span>
                <span className="text-[15px] font-black text-white">{step.bodyPart}</span>
              </div>
            )}
            {!isNamaz && step.repeat && (
              <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/5 shadow-sm">
                <RotateCcw size={14} className="text-white/30" />
                <span className="text-[15px] font-black text-white">{step.repeat}</span>
              </div>
            )}
            {isNamaz && step.isFard !== undefined && (
              <div 
                className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-sm ${
                  step.isFard 
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                    : "bg-blue-500/10 border-blue-500/20 text-blue-500"
                }`}
              >
                <span className="text-[11px] font-black uppercase tracking-widest">
                  {step.isFard ? "Farz" : "Sünnet"}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
            <p className="text-[16px] font-bold text-white/80 m-0 leading-relaxed italic">
              {step.description}
            </p>
          </div>

          {/* Recitation (Arabic/Transliteration) */}
          {step.recitation && (
            <div 
              className="bg-white/5 rounded-2xl p-6 border-l-4 shadow-md"
              style={{ borderLeftColor: accentColor }}
            >
              <div className="text-[12px] font-black uppercase text-white/30 mb-3 tracking-widest">Okunuş</div>
              <p className="text-[20px] font-bold text-white m-0 leading-relaxed tracking-tight">
                {step.recitation}
              </p>
            </div>
          )}

          {/* Tips Section */}
          {step.tips && step.tips.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-white/30" />
                <span className="text-[13px] font-black uppercase text-white/30 tracking-widest">İpuçları</span>
              </div>
              <ul className="m-0 p-0 list-none space-y-2">
                {step.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-[14px] font-bold text-white/50 leading-snug">
                    <span className="text-white/20 select-none">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
