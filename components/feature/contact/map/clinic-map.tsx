import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";

const ClinicMap = () => {
  return (
    <Card className="overflow-hidden rounded-3xl p-0 shadow-sm">
      {/* Map */}

      <div className="relative flex h-72 items-center justify-center bg-muted">
        {/* مؤقتًا Placeholder */}

        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-7 w-7 text-primary" />
          </div>

          <span className="text-sm">Map Preview</span>
        </div>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between p-5">
        <p className="text-sm text-muted-foreground">
          Parking available on Harborview Ave.
        </p>

        <Button asChild variant="outline" size="sm" className="rounded-xl">
          <Link href="https://maps.google.com" target="_blank">
            <Navigation className="mr-2 h-4 w-4" />
            Directions
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default ClinicMap;
