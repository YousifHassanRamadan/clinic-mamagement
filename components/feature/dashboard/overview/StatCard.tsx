import { Card } from "@/components/ui/card";

import { StatCardType } from "./types";

interface Props {
  stat: StatCardType;
}

const StatCard = ({ stat }: Props) => {
  const Icon = stat.icon;

  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{stat.title}</p>

          <h2 className="mt-2 text-4xl font-bold">{stat.value}</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {stat.description}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
