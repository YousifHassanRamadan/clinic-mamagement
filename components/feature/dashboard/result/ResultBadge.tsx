import { Badge } from "@/components/ui/badge";

import type { TestStatus } from "./types";

interface Props {
  status: TestStatus;
}

const styles: Record<TestStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const labels: Record<TestStatus, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const ResultBadge = ({ status }: Props) => {
  return <Badge className={styles[status]}>{labels[status]}</Badge>;
};

export default ResultBadge;
