"use client";

import { Search, SlidersHorizontal, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="h-10 w-full justify-between rounded-xl sm:min-w-36"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />

            <select
              value={status}
              onChange={(event) =>
                onStatusChange(
                  event.target.value as "all" | "active" | "inactive",
                )
              }
              className="
                absolute inset-0 cursor-pointer appearance-none p-3 opacity-0
                dark:bg-background dark:text-foreground
                [&>option]:bg-background
                [&>option]:text-foreground
                dark:[&>option]:bg-gray-900
                dark:[&>option]:text-white
              "
            >
              <option value="all">{translations.allStatuses}</option>
              <option value="active">{translations.active}</option>
              <option value="inactive">{translations.inactive}</option>
            </select>

            <span>
              {status === "all"
                ? translations.allStatuses
                : status === "active"
                  ? translations.active
                  : translations.inactive}
            </span>
          </Button>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="h-10 w-full justify-between rounded-xl sm:min-w-36"
          >
            <Tags className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />

            <select
              value={categoryId}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="
                absolute inset-0 cursor-pointer appearance-none p-3 opacity-0
                dark:bg-background dark:text-foreground
                [&>option]:bg-background
                [&>option]:text-foreground
                dark:[&>option]:bg-gray-900
                dark:[&>option]:text-white
              "
            >
              <option value="">{translations.allCategories}</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {locale === "ar" ? category.nameAr : category.name}
                </option>
              ))}
            </select>

            <span className="truncate">
              {!categoryId
                ? translations.allCategories
                : ((locale === "ar"
                    ? categories.find((category) => category.id === categoryId)
                        ?.nameAr
                    : categories.find((category) => category.id === categoryId)
                        ?.name) ?? translations.categories)}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestsToolbar;
