import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activities } from "@/constants/dashboard/admin/admin";

const ActivityCard = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Latest Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{activity.title}</h4>

                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
