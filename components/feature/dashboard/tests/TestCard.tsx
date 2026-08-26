// TestCard.tsx

"use client";

import { CircleHelp, Play, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import TestBadge from "./TestBadge";

import { PsychologicalTestItem } from "./PsychologicalTestsClient";

import { useTestStore } from "@/store/test-store";

interface Props {
  test: PsychologicalTestItem;
  locale: string;

  translations: {
    questions: string;
    startTest: string;
    buyNow: string;
    noDescription: string;
    uncategorized: string;
    buyMessage: string;
  };
}

const TestCard = ({ test, locale, translations }: Props) => {
  const router = useRouter();

  const isArabic = locale === "ar";

  const setSelectedTestId = useTestStore((state) => state.setSelectedTestId);

  // AR: استخدم عنوان الاختبار بالعربية إذا كان متاحًا، وإلا استخدم العنوان الإنجليزي
  // EN: Use the Arabic test title when available, otherwise use the English title
  const title = isArabic && test.titleAr ? test.titleAr : test.title;

  // AR: استخدم وصف الاختبار بالعربية إذا كان متاحًا، وإلا استخدم الوصف الإنجليزي
  // EN: Use the Arabic test description when available, otherwise use the English description
  const description =
    isArabic && test.descriptionAr ? test.descriptionAr : test.description;

  // AR: استخدم اسم التصنيف بالعربية إذا كان متاحًا، وإلا استخدم الاسم الإنجليزي
  // EN: Use the Arabic category name when available, otherwise use the English name
  const categoryName = test.category
    ? isArabic && test.category.nameAr
      ? test.category.nameAr
      : test.category.name
    : translations.uncategorized;

  const handleStartTest = () => {
    if (!test.isApproved) {
      return;
    }

    setSelectedTestId(test.id);

    router.push("/dashboard/patient/tests/new");
  };

  const handleBuyNow = () => {
    const phone = "201014217564";

    const message = encodeURIComponent(`${translations.buyMessage}: ${title}`);

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <Card className="block rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <TestBadge category={categoryName} />
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description || translations.noDescription}
      </p>

      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
        <CircleHelp className="h-3.5 w-3.5" />
        {test._count.questions} {translations.questions}
      </div>

      {test.isApproved ? (
        <Button
          type="button"
          onClick={handleStartTest}
          className="mt-6 w-full rounded-xl"
        >
          <Play className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />

          {translations.startTest}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleBuyNow}
          variant="outline"
          className="mt-6 w-full rounded-xl"
        >
          <ShoppingCart
            className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"}
          />

          {translations.buyNow}
        </Button>
      )}
    </Card>
  );
};

export default TestCard;
