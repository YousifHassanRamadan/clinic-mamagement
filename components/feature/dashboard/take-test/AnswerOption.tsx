"use client";

import { cn } from "@/lib/utils";

interface Props {
  checked: boolean;
  label: string;
  onClick: () => void;
}

const AnswerOption = ({ checked, label, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-4 rounded-xl border p-5 text-start transition",
        checked && "border-primary bg-primary/10",
      )}
    >
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary",
          checked && "bg-primary",
        )}
      >
        {checked && <div className="h-2.5 w-2.5 rounded-full bg-background" />}
      </div>

      <span className="flex-1">{label}</span>
    </button>
  );
};

export default AnswerOption;
