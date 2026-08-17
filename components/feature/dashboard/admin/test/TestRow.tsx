import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import TestStatusBadge from "./TestStatusBadge";
import type { PsychologicalTestWithStats } from "@/app/actions/admin-actions/test/get-tests";
import TestRowActions from "./TestRowActions";

interface Props {
  test: PsychologicalTestWithStats;
}

const TestRow = ({ test }: Props) => {
  return (
    <tr className="border-b last:border-b-0 transition-colors hover:bg-muted/20">
      {/* Test */}
      <td className="px-4 py-4 sm:px-5">
        <div>
          <p className="font-medium text-foreground">{test.title}</p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Updated {test.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-4">
        <span className="text-sm text-muted-foreground">
          {test.category?.name ?? "Uncategorized"}
        </span>
      </td>

      {/* Questions */}
      <td className="px-4 py-4">
        <span className="text-sm">{test._count.questions}</span>
      </td>

      {/* Duration */}
      <td className="px-4 py-4">
        <span className="text-sm">-</span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <TestStatusBadge status={test.isActive ? "ACTIVE" : "INACTIVE"} />
      </td>

      {/* Completions */}
      <td className="px-4 py-4">
        <span className="text-sm">{test.completedCount}</span>
      </td>

      {/* Actions */}
      <TestRowActions testId={test.id} />
    </tr>
  );
};

export default TestRow;
