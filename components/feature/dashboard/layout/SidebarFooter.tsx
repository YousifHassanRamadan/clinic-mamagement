import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SidebarFooter = () => {
  return (
    <Card className="rounded-2xl p-4">
      <h3 className="font-semibold">Need help?</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Browse our handbook or contact the clinic support team.
      </p>

      <Button className="mt-4 w-full rounded-xl">Open Handbook</Button>
    </Card>
  );
};

export default SidebarFooter;
