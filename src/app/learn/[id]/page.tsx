"use client";

import { use, useState } from "react";
import { useGuide } from "@/src/hooks/learn/useGuide";
import AppLayout from "@/src/components/layout/AppLayout";
import QuestionCard from "@/src/components/learn/guide/QuestionCard";
import PathOverview from "@/src/components/learn/guide/PathOverview";
import { GuideStep } from "@/src/types/learn.types";
import StepProgressCard from "@/src/components/learn/guide/StepProgressCard";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function GuideRunnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data } = useGuide(id);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = data?.steps ?? [];
  const activeStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <AppLayout
      rightPanel={
        <div className="flex flex-col h-full gap-4 lg:gap-8">
          <QuestionCard
            question="İkindi namazı _ _ _ rekattır?"
            options={[
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
            ]}
            onSubmit={(selected) => console.log("Seçilen:", selected)}
          />
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
          <Button
            variant="lightBlue"
            className="w-2/3"
            icon={<ArrowRight width={16} height={16} />}
            iconPosition="right"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            İleri
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
