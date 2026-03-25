import { CheckCircle } from "lucide-react";

const CelebrationPhase = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-slide-up">
      <div className="relative w-24 h-24">
        <div className="absolute -inset-3 rounded-full border border-[rgba(61,255,192,0.25)] animate-pulse-ring" />
        <div className="w-24 h-24 rounded-full bg-[#0e2a20] border border-[#3dffc0] flex items-center justify-center animate-check-in">
          <CheckCircle width={40} height={40} className="text-[#3dffc0]" />
        </div>
      </div>

      <div className="text-center flex flex-col gap-2">
        <p className="text-[#3dffc0] text-[13px] font-medium tracking-[0.08em] uppercase">
          Tebrikler
        </p>
        <h2 className="text-[#F0F8FC] text-[28px] font-bold m-0">
          {title} Rehberini
          <br />
          Tamamladın
        </h2>
      </div>
    </div>
  );
};

export default CelebrationPhase;
