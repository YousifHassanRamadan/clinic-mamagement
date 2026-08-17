"use client";

import { Switch } from "@/components/ui/switch";

import { NotificationSetting } from "./types";

interface Props {
  item: NotificationSetting;
}

const NotificationItem = ({ item }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div>
        <h4 className="font-medium">{item.title}</h4>

        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>

      <Switch defaultChecked={item.enabled} />
    </div>
  );
};

export default NotificationItem;
