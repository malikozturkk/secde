interface WeeklyProgressProps {
  percentage: number;
  current: number;
  goal: number;
  label?: string;
}

export function WeeklyProgress({
  percentage,
  current,
  goal,
  label = "HAFTALIK HEDEF",
}: WeeklyProgressProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="fixed bottom-10 right-10 z-30">
      <div className="bg-surface-variant/90 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90">
            <circle
              className="text-surface-container-highest"
              cx={32}
              cy={32}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={8}
            />
            <circle
              className="text-primary drop-shadow-[0_0_8px_rgba(62,187,255,0.6)]"
              cx={32}
              cy={32}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth={8}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-black text-on-surface text-sm">
            {percentage}%
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1 opacity-70">
            {label}
          </p>
          <p className="text-on-surface font-black text-lg">
            {current} / {goal} Tekrar
          </p>
        </div>
      </div>
    </div>
  );
}
