"use client";

import { CircleHelp, Play } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import TestBadge from "./TestBadge";
import { PsychologicalTestItem } from "./PsychologicalTestsPage";
import { useTestStore } from "@/store/test-store";

interface Props {
  test: PsychologicalTestItem;
}

const TestCard = ({ test }: Props) => {
  const router = useRouter();

  const setSelectedTestId = useTestStore((state) => state.setSelectedTestId);

  const handleStartTest = () => {
    setSelectedTestId(test.id);

    router.push("/dashboard/tests/new");
  };

  return (
    <Card className="block rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <TestBadge category={test.category?.name ?? "Uncategorized"} />
      </div>

      <h3 className="mt-5 text-xl font-semibold">{test.title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {test.description || "No description available."}
      </p>

      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
        <CircleHelp className="h-3.5 w-3.5" />
        {test._count.questions} Questions
      </div>

      <Button
        type="button"
        onClick={handleStartTest}
        className="mt-6 w-full rounded-xl"
      >
        <Play className="mr-2 h-4 w-4" />
        Start Test
      </Button>
    </Card>
  );
};

export default TestCard;
