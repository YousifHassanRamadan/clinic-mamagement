import { Badge } from "@/components/ui/badge";

import type { TestStatus } from "./types";

interface Props {
  status: TestStatus;
}

const statusStyles: Record<TestStatus, string> = {
  ACTIVE:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",

  INACTIVE: "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-50",
};

const TestStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
};

export default TestStatusBadge;
