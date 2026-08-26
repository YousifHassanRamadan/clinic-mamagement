// CategoriesGrid.tsx

import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import EmptyState from "@/components/common/empty-state/empty-state";

import CategoryCard from "./CategoryCard";
import EmptyCategories from "./EmptyCategories";

import { getCategories } from "@/app/actions/admin-actions/handle-category/get-categories";

interface Props {
  translations: {
    categories: {
      tests: string;
      noDescription: string;
      emptyTitle: string;
      emptyDescription: string;
      createCategory: string;
      failed: string;
    };

    actions: {
      edit: string;
      delete: string;
      deleting: string;
      deleteFailed: string;
      somethingWentWrong: string;
    };
  };
}

const CategoriesGrid = async ({ translations }: Props) => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  await getTranslations(locale);

  const result = await getCategories();

  if (!result.success) {
    return <EmptyState title={translations.categories.failed} description="" />;
  }

  const categories = result.data;

  if (!categories.length) {
    return (
      <EmptyCategories
        translations={{
          title: translations.categories.emptyTitle,
          description: translations.categories.emptyDescription,
          createCategory: translations.categories.createCategory,
        }}
      />
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const localizedCategory = {
          ...category,

          name:
            locale === "ar" ? category.nameAr || category.name : category.name,

          description:
            locale === "ar"
              ? category.descriptionAr || category.description
              : category.description,
        };

        return (
          <CategoryCard
            key={category.id}
            category={localizedCategory}
            translations={{
              tests: translations.categories.tests,
              noDescription: translations.categories.noDescription,
              actions: translations.actions,
            }}
          />
        );
      })}
    </section>
  );
};

export default CategoriesGrid;
