"use client";

import { Camera } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  firstName: string;
  lastName: string;
}

const ProfileCard = ({ firstName, lastName }: Props) => {
  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <Card className="block h-fit rounded-3xl">
      <CardContent className="space-y-6 p-8">
        <div className="relative mx-auto w-fit">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
            {initials || "?"}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold">{fullName || "Your Name"}</h3>

          <p className="text-muted-foreground">Patient</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
