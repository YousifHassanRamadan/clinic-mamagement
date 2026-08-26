import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import ActionCard from "./ActionCard";
import { quickActions } from "@/constants/dashboard/dashboard";

const QuickActions = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {quickActions.map((action) => (
        <ActionCard
          key={action.href}
          title={t(action.titleKey)}
          icon={action.icon}
          href={action.href}
        />
      ))}
    </div>
  );
};

export default QuickActions;
