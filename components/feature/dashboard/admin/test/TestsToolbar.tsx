"use client";

import { Search, SlidersHorizontal, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  id: string;
  name: string;
}

interface TestsToolbarProps {
  search: string;
  status: "all" | "active" | "inactive";
  categoryId: string;

  categories: Category[];

  onSearchChange: (value: string) => void;
  onStatusChange: (value: "all" | "active" | "inactive") => void;
  onCategoryChange: (value: string) => void;
}

const TestsToolbar = ({
  search,
  status,
  categoryId,
  categories,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}: TestsToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 border-b p-4 sm:p-5 lg:flex-row">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tests..."
          className="h-10 rounded-xl pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Status */}
        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="h-10 w-full rounded-xl justify-between sm:min-w-36"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />

            <select
              value={status}
              onChange={(event) =>
                onStatusChange(
                  event.target.value as "all" | "active" | "inactive",
                )
              }
              className="absolute inset-0 cursor-pointer appearance-none opacity-0 p-3"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <span>
              {status === "all"
                ? "All statuses"
                : status === "active"
                  ? "Active"
                  : "Inactive"}
            </span>
          </Button>
        </div>

        {/* Category */}
        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="h-10 w-full rounded-xl justify-between sm:min-w-36"
          >
            <Tags className="mr-2 h-4 w-4" />

            <select
              value={categoryId}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="absolute inset-0 cursor-pointer appearance-none opacity-0 p-3"
            >
              <option value="">All categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <span className="truncate">
              {!categoryId
                ? "All categories"
                : (categories.find((category) => category.id === categoryId)
                    ?.name ?? "Categories")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestsToolbar;
