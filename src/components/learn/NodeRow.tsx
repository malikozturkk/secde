import { cn } from "@/src/lib/utils";
import { NodeAlignment } from "@/src/types/learn.types";

interface NodeRowProps {
  alignment: NodeAlignment;
  children: React.ReactNode;
}

const ALIGNMENT_MAP: Record<string, string> = {
  left: "flex justify-start sm:ml-24",
  "center-left": "flex justify-center sm:-ml-20",
  center: "flex justify-center",
  right: "flex justify-end sm:mr-24",
};

export function NodeRow({ alignment, children }: NodeRowProps) {
  return (
    <div className={cn(ALIGNMENT_MAP[alignment] ?? "flex justify-center")}>
      {children}
    </div>
  );
}
