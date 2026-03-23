import { Takbir, TipStar } from "@/src/icons/tsx/learn";
import Image from "next/image";
import { GuideStep } from "@/src/types/learn.types";

interface StepProgressCardProps {
  step: GuideStep;
}

const StepProgressCard = ({ step }: StepProgressCardProps) => {
  return (
    <div className="bg-[#0C1518] p-4 lg:p-8 rounded-2xl flex flex-col gap-6 border border-[#1b2529] flex-1">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[#3DF2C0] text-xl font-bold">
            {step.step} / {step.totalSteps}
          </span>
          <h3 className="text-3xl font-bold text-[#F0F8FC]">{step.name}</h3>
        </div>
        <div className="w-16 h-16 rounded-md bg-[#1c272c] flex items-center justify-center">
          <span className="font-bold text-2xl text-[#3dbcff] leading-5">
            {String(step.step).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="relative flex items-center justify-center p-4 h-80">
        <Image
          src="/learn/takbir.png"
          alt=""
          fill
          className="object-cover rounded-md grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          aria-hidden="true"
        />
        <div className="relative z-10 bg-[#1C272C]/60 backdrop-blur-md rounded-md border border-[#3EBBFF]/10 p-6 flex flex-col gap-4 items-center w-fit max-w-sm text-center">
          <Takbir />
          {step.bodyPart ||
            (step.repeat && (
              <div className="flex flex-col gap-1">
                {step.bodyPart && (
                  <p className="text-[#3dbcff] text-sm font-semibold uppercase tracking-widest">
                    {step.bodyPart}
                  </p>
                )}
                {step.repeat && (
                  <p className="text-[#A4ACB0] text-xs">{step.repeat}</p>
                )}
              </div>
            ))}
          <p className="text-[#F0F8FC] text-base font-bold">
            {step.shortDescription}
          </p>
        </div>
      </div>

      <p className="text-xl text-[#F0F8FC]">{step.description}</p>

      {step.tips && step.tips.length > 0 && (
        <div className="border-l-4 border-[#ffd977] bg-[#FFD977]/10 p-4 flex gap-4 items-start rounded-r-sm">
          <TipStar />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#FFD977] font-bold">İPUÇLARI</p>
            <ul className="flex flex-col gap-1">
              {step.tips.map((tip, index) => (
                <li key={index} className="text-sm text-[#A4ACB0] font-medium">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepProgressCard;
