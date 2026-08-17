import CategoriesGrid from "./CategoriesGrid";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

const TestCategoriesPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Assessments
          </p>

          <h1 className="mt-2 text-3xl font-bold">Test Categories</h1>

          <p className="mt-2 max-w-3xl text-muted-foreground">
            Organize psychological tests into categories for easier management
            and patient assessment workflows.
          </p>
        </div>

        <CreateCategory />

        <UpdateCategory />
      </div>

      {/* Categories */}
      <CategoriesGrid />
    </div>
  );
};

export default TestCategoriesPage;
