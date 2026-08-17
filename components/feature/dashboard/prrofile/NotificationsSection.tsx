"use client";

import { Card, CardContent } from "@/components/ui/card";

import NotificationItem from "./NotificationItem";
import { notifications } from "@/constants/dashboard/dashboard";

const NotificationsSection = () => {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 p-8">
        <h2 className="text-xl font-semibold">Notifications</h2>

        <div className="space-y-4">
          {notifications.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
