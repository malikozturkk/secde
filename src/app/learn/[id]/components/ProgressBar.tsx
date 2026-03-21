"use client";

import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  onClose: () => void;
  accentColor: string;
}

export default function ProgressBar({ progress, onClose, accentColor }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      <Link 
        href="/learn"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="text-white/40 hover:text-white transition-colors"
      >
        <X size={28} strokeWidth={2.5} />
      </Link>
      
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)]"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}
