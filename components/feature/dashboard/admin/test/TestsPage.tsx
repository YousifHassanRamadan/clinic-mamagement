"use client";

import { useEffect, useState } from "react";

import TestsToolbar from "./TestsToolbar";
import TestsTable from "./TestsTable";
import QuestionBuilder from "./QuestionBuilder";
import TestsHeader from "./TestsHeader";
import EditTestDialog from "./EditTestDialog";

import { getCategories } from "@/app/actions/admin-actions/handle-category/get-categories";

interface Category {
  id: string;
  name: string;
}

const TestsPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();

        if (!result.success) {
          return;
        }

        setCategories(
          result.data.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        );
      } catch (error) {
        console.error("LOAD_CATEGORIES_ERROR:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="space-y-6">
      <TestsHeader />

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <TestsToolbar
          search={search}
          status={status}
          categoryId={categoryId}
          categories={categories}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCategoryChange={setCategoryId}
        />

        <TestsTable search={search} status={status} categoryId={categoryId} />
      </section>

      <EditTestDialog />

      <QuestionBuilder />
    </div>
  );
};

export default TestsPage;
