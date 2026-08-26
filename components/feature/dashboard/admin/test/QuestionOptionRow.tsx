// QuestionOptionRow.tsx

"use client";

import { Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuestionOption {
  id: string;
  text: string;
  textAr: string;
  points: number;
  order: number;
}

interface Props {
  option: QuestionOption;
  onChange: (text: string, textAr: string, points: number) => void;
  onDelete: () => void;
}

const QuestionOptionRow = ({ option, onChange, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-medium">
        {option.order}
      </span>

      <Input
        value={option.text}
        onChange={(event) =>
          onChange(event.target.value, option.textAr, option.points)
        }
        placeholder="Option in English"
        dir="ltr"
        className="min-w-0 rounded-xl p-3"
      />

      <Input
        value={option.textAr}
        onChange={(event) =>
          onChange(option.text, event.target.value, option.points)
        }
        placeholder="الخيار بالعربي"
        dir="rtl"
        className="min-w-0 rounded-xl p-3"
      />

      <Input
        type="number"
        value={option.points}
        onChange={(event) =>
          onChange(option.text, option.textAr, Number(event.target.value))
        }
        className="w-20 rounded-xl p-3 text-center"
        min={0}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="shrink-0 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuestionOptionRow;
