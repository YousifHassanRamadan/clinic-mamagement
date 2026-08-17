"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  key: string;
  title: string;
  subtitle: string;
  count: number;
  icon: React.ElementType;
}

interface StatCardProps {
  stat: Stat;
}

const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;

  return (
    <Card className="rounded-2xl block">
      <CardContent className="flex items-start justify-between p-6 py-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight">
            {stat.count}
          </h3>

          <p className="mt-2 text-xs text-muted-foreground">{stat.subtitle}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
