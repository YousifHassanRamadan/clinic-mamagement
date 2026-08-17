import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AttentionCard = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />

          <CardTitle>Needs Attention</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <h4 className="font-semibold">Sarah Johnson</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Patient reported increased anxiety during the last session.
            Follow-up recommended.
          </p>
        </div>

        <Button className="w-full rounded-xl">Open Patient</Button>
      </CardContent>
    </Card>
  );
};

export default AttentionCard;
