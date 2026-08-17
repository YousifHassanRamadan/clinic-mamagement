import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SessionChart = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Session Volume</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Completed sessions over the last 6 months.
          </p>
        </div>

        <Button variant="ghost" size="sm">
          Details
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {/* Replace later with Recharts */}

        <div className="flex h-80 items-end justify-between rounded-xl border bg-muted/20 px-6 pb-8">
          {[35, 48, 45, 60, 66, 78].map((height, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div
                className="w-12 rounded-full bg-primary/20"
                style={{ height }}
              >
                <div
                  className="w-full rounded-full bg-primary"
                  style={{ height: height * 0.65 }}
                />
              </div>

              <span className="text-xs text-muted-foreground">
                {["Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionChart;
