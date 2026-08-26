// Header.tsx

import { cookies } from "next/headers";

import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";

interface SidebarTranslations {
  brand: string;
  patientWorkspace: string;
  items: Record<string, string>;
}

interface Props {
  role?: "PATIENT" | "DOCTOR";
  translations: SidebarTranslations;
}

const Header = async ({ role, translations }: Props) => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background/95 px-4 py-12 backdrop-blur lg:px-8">
      <div className="flex items-center gap-4">
        <MobileSidebar
          role={role}
          locale={locale}
          translations={translations}
        />
      </div>

      <div className="flex items-center gap-4">
        <UserMenu locale={locale} />
      </div>
    </header>
  );
};

export default Header;
