"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface ConfettiBurstProps {
  count?: number;
  seed?: number;
}

const COLORS = ["#FF6B35", "#F5A623", "#25B49A", "#4FC3F7", "#C7B9FF"] as const;
const SHAPES = ["★", "●", "◆"] as const;

interface Piece {
  id: number;
  left: number;
  top: number;
  color: string;
  delay: number;
  cx: number;
  size: number;
  shape: string;
}

const createSeededRand = (seed: number): (() => number) => {
  let t = seed >>> 0 || 1;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const ConfettiBurstComponent: React.FC<ConfettiBurstProps> = ({
  count = 26,
  seed = 1,
}) => {
  const pieces = useMemo<Piece[]>(() => {
    const rand = createSeededRand(seed);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: 50 + (rand() - 0.5) * 110,
      top: 30 + rand() * 30,
      color: COLORS[i % COLORS.length]!,
      delay: rand() * 0.6,
      cx: (rand() - 0.5) * 320,
      size: 8 + rand() * 10,
      shape: SHAPES[i % SHAPES.length]!,
    }));
  }, [count, seed]);

  return (
    <>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute font-black"
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
          animate={{ x: p.cx, y: 200, rotate: 720, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            delay: p.delay,
            ease: "easeIn",
            times: [0, 0.1, 0.8, 1],
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            color: p.color,
            fontSize: `${p.size}px`,
          }}
        >
          {p.shape}
        </motion.span>
      ))}
    </>
  );
};

export const ConfettiBurst = memo(ConfettiBurstComponent);
