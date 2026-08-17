import EmptyState from "@/components/common/empty-state/empty-state";
import CategoryCard from "./CategoryCard";
import EmptyCategories from "./EmptyCategories";
import { getCategories } from "@/app/actions/admin-actions/handle-category/get-categories";

const CategoriesGrid = async () => {
  const result = await getCategories();

  if (!result.success) {
    return <EmptyState title="" description="" />;
  }

  const categories = result.data;

  if (!categories.length) {
    return <EmptyCategories />;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  );
};

export default CategoriesGrid;
