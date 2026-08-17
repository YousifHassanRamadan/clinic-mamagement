"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { TestOption } from "./types";

interface Props {
  option: TestOption;
  onChange: (text: string, points: number) => void;
  onDelete: () => void;
}

const QuestionOptionRow = ({ option, onChange, onDelete }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        value={option.text}
        onChange={(event) => onChange(event.target.value, option.points)}
        placeholder="Option text"
        className="rounded-xl p-3"
      />

      <Input
        type="number"
        value={option.points}
        onChange={(event) => onChange(option.text, Number(event.target.value))}
        min={0}
        placeholder="Points"
        className="w-28 rounded-xl p-3"
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
