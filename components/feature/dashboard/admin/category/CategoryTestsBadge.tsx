"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  testsCount: number;
}

const CategoryTestsBadge = ({ testsCount }: Props) => {
  return (
    <Badge variant="secondary" className="rounded-full">
      {testsCount} Tests
    </Badge>
  );
};

export default CategoryTestsBadge;
