"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SecuritySection = () => {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 p-8">
        <h2 className="text-xl font-semibold">Security</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <Input type="password" placeholder="Current password" />

          <Input type="password" placeholder="New password" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
