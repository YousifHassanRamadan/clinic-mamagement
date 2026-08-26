// ProfilePage.tsx

"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import ProfileCard from "./ProfileCard";
import PersonalInformation from "./PersonalInformation";

import { getProfile } from "@/app/actions/patient-actions/profile/get-profile";
import { updateProfile } from "@/app/actions/patient-actions/profile/update-profile";

import { profileSchema, ProfileFormValues } from "@/schemas/profile.schema";

type Locale = "en" | "ar";

const translations = {
  en: {
    title: "My Profile",
    description: "Keep your details up to date so the clinic can reach you.",
    saving: "Saving...",
    saveChanges: "Save Changes",
    somethingWentWrong: "Something went wrong",
  },

  ar: {
    title: "ملفي الشخصي",
    description: "حافظ على تحديث بياناتك حتى تتمكن العيادة من التواصل معك.",
    saving: "جاري الحفظ...",
    saveChanges: "حفظ التغييرات",
    somethingWentWrong: "حدث خطأ ما",
  },
} as const;

// Get the current language directly from the browser cookie.
// جلب اللغة الحالية مباشرة من Cookie الموجودة في المتصفح.
const getLocaleFromCookie = (): Locale => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="));

  const locale = match?.split("=")[1];

  return locale === "ar" ? "ar" : "en";
};

const ProfilePage = () => {
  const [locale, setLocale] = useState<Locale>("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: undefined,
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    const currentLocale = getLocaleFromCookie();

    setLocale(currentLocale);

    const loadProfile = async () => {
      const result = await getProfile();

      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      reset({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phone: result.data.phone,
        address: result.data.address ?? "",
        gender: result.data.gender ?? undefined,
      });

      setLoading(false);
    };

    loadProfile();
  }, [reset]);

  const t = translations[locale];

  const onSubmit = async (values: ProfileFormValues) => {
    // Don't submit if nothing changed.
    // لا ترسل البيانات إذا لم يحدث أي تغيير.
    if (!isDirty) {
      return;
    }

    setSaving(true);

    try {
      const result = await updateProfile(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      if (result.data) {
        reset({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address ?? "",
          gender: result.data.gender ?? undefined,
        });
      }
    } catch (error) {
      console.error("UPDATE_PROFILE_ERROR:", error);
      toast.error(t.somethingWentWrong);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-muted" />

        <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
          <div className="h-80 animate-pulse rounded-3xl bg-muted" />

          <div className="h-96 animate-pulse rounded-3xl bg-muted" />
        </div>
      </div>
    );
  }

  const profile = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>

            <p className="mt-2 text-muted-foreground">{t.description}</p>
          </div>

          <Button
            type="submit"
            disabled={!isDirty || saving}
            className="rounded-xl"
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? t.saving : t.saveChanges}
          </Button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
          <ProfileCard
            firstName={profile.firstName}
            lastName={profile.lastName}
            locale={locale}
          />

          <div className="space-y-8">
            <PersonalInformation form={form} locale={locale} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
