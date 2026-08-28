// UserMenuClient.tsx

"use client";

import { useEffect, useState, useTransition } from "react";
import {
  ChevronDown,
  Languages,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { locales, type Locale } from "@/i18n/config";
import { setDocumentDirection } from "@/i18n/direction";

interface Props {
  locale: Locale;
  user: {
    name: string;
    email: string | null;
    image: string | null;
  };
}

const UserMenuClient = ({ locale, user }: Props) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const [isPending, startTransition] = useTransition();

  const isArabic = currentLocale === "ar";

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
    const cookieLocale = match?.[1] as Locale | undefined;

    if (cookieLocale && locales.includes(cookieLocale)) {
      setCurrentLocale(cookieLocale);
    } else {
      setCurrentLocale(locale);
    }
  }, [locale]);

  const translations =
    currentLocale === "ar"
      ? {
          profile: "الملف الشخصي",
          settings: "الإعدادات",
          language: "اللغة",
          arabic: "العربية",
          english: "الإنجليزية",
          appearance: "المظهر",
          dark: "داكن",
          light: "فاتح",
          signOut: "تسجيل الخروج",
        }
      : {
          profile: "Profile",
          settings: "Settings",
          language: "Language",
          arabic: "Arabic",
          english: "English",
          appearance: "Appearance",
          dark: "Dark",
          light: "Light",
          signOut: "Sign out",
        };

  const changeLanguage = () => {
    const newLocale: Locale = currentLocale === "ar" ? "en" : "ar";

    document.cookie = [
      `locale=${newLocale}`,
      "path=/",
      "max-age=31536000",
      "samesite=lax",
    ].join("; ");

    setCurrentLocale(newLocale);
    setDocumentDirection(newLocale);

    startTransition(() => {
      router.refresh();
    });
  };

  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          dir={isArabic ? "rtl" : "ltr"}
          className="
            flex items-center gap-2
            rounded-full
            border border-border
            bg-background
            px-2 py-1
            shadow-sm
            transition-all
            hover:bg-muted
            hover:shadow
            focus:outline-none
            focus:ring-2
            focus:ring-primary/20
          "
        >
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div
            className={`hidden md:block ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <p className="text-sm font-medium">{user.name}</p>
          </div>

          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isArabic ? "start" : "end"}
        className="w-64 rounded-2xl p-2"
      >
        <div
          className={`px-3 py-2 ${isArabic ? "text-right" : "text-left"}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className="text-sm font-semibold">{user.name}</p>

          {user.email && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem
          className="cursor-pointer rounded-lg py-2.5"
          onClick={() => router.push("/dashboard/profile")}
        >
          <User className="mr-2 h-4 w-4 shrink-0" />

          <span className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}>
            {translations.profile}
          </span>
        </DropdownMenuItem>

        {/* Settings */}

        <DropdownMenuSeparator />

        {/* Language */}
        <DropdownMenuItem
          disabled={isPending}
          onClick={changeLanguage}
          className="cursor-pointer rounded-lg py-2.5"
        >
          <Languages className="mr-2 h-4 w-4 shrink-0" />

          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex flex-1 items-center justify-between gap-3"
          >
            <span
              className={`font-medium ${isArabic ? "text-right" : "text-left"}`}
            >
              {translations.language}
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              {currentLocale === "ar"
                ? translations.arabic
                : translations.english}
            </span>
          </div>
        </DropdownMenuItem>

        {/* Theme */}
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="cursor-pointer rounded-lg py-2.5"
        >
          {theme === "dark" ? (
            <Moon className="mr-2 h-4 w-4 shrink-0" />
          ) : (
            <Sun className="mr-2 h-4 w-4 shrink-0" />
          )}

          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex flex-1 items-center justify-between gap-3"
          >
            <span
              className={`font-medium ${isArabic ? "text-right" : "text-left"}`}
            >
              {translations.appearance}
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              {theme === "dark" ? translations.dark : translations.light}
            </span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          className="
            cursor-pointer
            rounded-lg
            py-2.5
            text-red-600
            focus:text-red-600
          "
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4 shrink-0" />

          <span className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}>
            {translations.signOut}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuClient;
