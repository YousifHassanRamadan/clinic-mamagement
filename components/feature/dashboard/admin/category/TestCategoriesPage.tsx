// TestCategoriesPage.tsx

import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import CategoriesGrid from "./CategoriesGrid";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

const TestCategoriesPage = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  const t = await getTranslations(locale);

  const translations = {
    header: {
      eyebrow: t("testCategories.version2.header.eyebrow"),
      title: t("testCategories.version2.header.title"),
      description: t("testCategories.version2.header.description"),
    },

    create: {
      button: t("testCategories.version2.create.button"),
      title: t("testCategories.version2.create.title"),

      form: {
        name: t("testCategories.version2.form.name"),
        namePlaceholder: t("testCategories.version2.form.namePlaceholder"),
        nameAr: t("testCategories.version2.form.nameAr"),
        nameArPlaceholder: t("testCategories.version2.form.nameArPlaceholder"),
        description: t("testCategories.version2.form.description"),
        descriptionPlaceholder: t(
          "testCategories.version2.form.descriptionPlaceholder",
        ),
        descriptionAr: t("testCategories.version2.form.descriptionAr"),
        descriptionArPlaceholder: t(
          "testCategories.version2.form.descriptionArPlaceholder",
        ),
        cancel: t("testCategories.version2.form.cancel"),
        creating: t("testCategories.version2.form.creating"),
        saving: t("testCategories.version2.form.saving"),
        createCategory: t("testCategories.version2.form.createCategory"),
        saveChanges: t("testCategories.version2.form.saveChanges"),
        categoryIdRequired: t(
          "testCategories.version2.form.categoryIdRequired",
        ),
      },
    },

    update: {
      title: t("testCategories.version2.update.title"),
    },

    form: {
      name: t("testCategories.version2.form.name"),
      namePlaceholder: t("testCategories.version2.form.namePlaceholder"),
      nameAr: t("testCategories.version2.form.nameAr"),
      nameArPlaceholder: t("testCategories.version2.form.nameArPlaceholder"),
      description: t("testCategories.version2.form.description"),
      descriptionPlaceholder: t(
        "testCategories.version2.form.descriptionPlaceholder",
      ),
      descriptionAr: t("testCategories.version2.form.descriptionAr"),
      descriptionArPlaceholder: t(
        "testCategories.version2.form.descriptionArPlaceholder",
      ),
      cancel: t("testCategories.version2.form.cancel"),
      creating: t("testCategories.version2.form.creating"),
      saving: t("testCategories.version2.form.saving"),
      createCategory: t("testCategories.version2.form.createCategory"),
      saveChanges: t("testCategories.version2.form.saveChanges"),
      categoryIdRequired: t("testCategories.version2.form.categoryIdRequired"),
    },

    categories: {
      tests: t("testCategories.version2.categories.tests"),
      noDescription: t("testCategories.version2.categories.noDescription"),
      emptyTitle: t("testCategories.version2.categories.emptyTitle"),
      emptyDescription: t(
        "testCategories.version2.categories.emptyDescription",
      ),
      createCategory: t("testCategories.version2.categories.createCategory"),
      failed: t("testCategories.version2.categories.failed"),
    },

    actions: {
      edit: t("testCategories.version2.actions.edit"),
      delete: t("testCategories.version2.actions.delete"),
      deleting: t("testCategories.version2.actions.deleting"),
      deleteFailed: t("testCategories.version2.actions.deleteFailed"),
      somethingWentWrong: t(
        "testCategories.version2.actions.somethingWentWrong",
      ),
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            {translations.header.eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {translations.header.title}
          </h1>

          <p className="mt-2 max-w-3xl text-muted-foreground">
            {translations.header.description}
          </p>
        </div>

        <CreateCategory translations={translations.create} />
      </div>

      <UpdateCategory
        translations={{
          title: translations.update.title,
          form: translations.form,
        }}
      />

      <CategoriesGrid
        translations={{
          categories: translations.categories,
          actions: translations.actions,
        }}
      />
    </div>
  );
};

export default TestCategoriesPage;
