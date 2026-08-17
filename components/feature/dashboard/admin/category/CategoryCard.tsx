import { Pencil, Trash2, FlaskConical } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TestCategory } from "@/app/generated/prisma/client";
import CategoryCardActions from "./CategoryCardActions";

type CategoryWithCount = TestCategory & {
  _count: {
    tests: number;
  };
};

interface Props {
  category: CategoryWithCount;
}
const CategoryCard = ({ category }: Props) => {
  return (
    <Card className="block  rounded-2xl transition-all hover:shadow-md ">
      <CardContent className="space-y-6 p-6 block">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FlaskConical className="h-6 w-6 text-primary" />
          </div>

          <Badge variant="secondary">{category._count.tests} Tests</Badge>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{category.name}</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>

        <CategoryCardActions catId={category.id} />
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
