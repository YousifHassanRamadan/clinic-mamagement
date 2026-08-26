// ProfileCard.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";

type Locale = "en" | "ar";

interface Props {
  firstName: string;
  lastName: string;
  locale: Locale;
}

const translations = {
  en: {
    patient: "Patient",
    yourName: "Your Name",
  },

  ar: {
    patient: "مريض",
    yourName: "اسمك",
  },
} as const;

const ProfileCard = ({ firstName, lastName, locale }: Props) => {
  const t = translations[locale];

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
          <h3 className="text-xl font-semibold">{fullName || t.yourName}</h3>

          <p className="text-muted-foreground">{t.patient}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
