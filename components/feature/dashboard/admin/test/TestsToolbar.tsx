"use client";

import { Search, SlidersHorizontal, Tags } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  nameAr: string;
}

interface Props {
  search: string;
  status: "all" | "active" | "inactive";
  categoryId: string;

  categories: Category[];

  translations: {
    searchPlaceholder: string;
    allStatuses: string;
    active: string;
    inactive: string;
    allCategories: string;
    categories: string;
  };

  onSearchChange: (value: string) => void;
  onStatusChange: (value: "all" | "active" | "inactive") => void;
  onCategoryChange: (value: string) => void;
}

const selectTriggerClassName =
  "h-10 w-full rounded-xl border-border/60 bg-background/80 px-3 shadow-sm transition-all hover:border-primary/40 hover:bg-muted/40 focus:ring-2 focus:ring-primary/20 sm:min-w-40";

const selectContentClassName =
  "w-[--radix-select-trigger-width] min-w-0 overflow-hidden rounded-xl border-border/60 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md";

const selectItemClassName =
  "cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors focus:bg-primary/10 focus:text-primary";

const getLocale = () => {
  if (typeof document === "undefined") return "en";

  const locale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="))
    ?.split("=")[1];

  return locale === "ar" ? "ar" : "en";
};

const TestsToolbar = ({
  search,
  status,
  categoryId,
  categories,
  translations,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}: Props) => {
  const locale = getLocale();

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  const selectedCategoryName = selectedCategory
    ? locale === "ar"
      ? selectedCategory.nameAr
      : selectedCategory.name
    : translations.allCategories;

  return (
    <div className="flex flex-col gap-3 border-b p-4 sm:p-5 lg:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={translations.searchPlaceholder}
          className="
        h-10 rounded-xl
        pl-10
        pr-4
        rtl:pl-4
        rtl:pr-10
        placeholder:pl-1
        rtl:placeholder:pl-0
        rtl:placeholder:pr-1
      "
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange(value as "all" | "active" | "inactive")
          }
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SlidersHorizontal className="mr-2 h-4 w-4 shrink-0 text-muted-foreground rtl:ml-2 rtl:mr-0" />

            <SelectValue />
          </SelectTrigger>

          <SelectContent
            position="popper"
            sideOffset={6}
            className={selectContentClassName}
          >
            <SelectItem value="all" className={selectItemClassName}>
              {translations.allStatuses}
            </SelectItem>

            <SelectItem value="active" className={selectItemClassName}>
              {translations.active}
            </SelectItem>

            <SelectItem value="inactive" className={selectItemClassName}>
              {translations.inactive}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={categoryId || "all"}
          onValueChange={(value) =>
            onCategoryChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className={selectTriggerClassName}>
            <Tags className="mr-2 h-4 w-4 shrink-0 text-muted-foreground rtl:ml-2 rtl:mr-0" />

            <SelectValue>{selectedCategoryName}</SelectValue>
          </SelectTrigger>

          <SelectContent
            position="popper"
            sideOffset={6}
            className={selectContentClassName}
          >
            <SelectItem value="all" className={selectItemClassName}>
              {translations.allCategories}
            </SelectItem>

            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className={selectItemClassName}
              >
                {locale === "ar" ? category.nameAr : category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TestsToolbar;
