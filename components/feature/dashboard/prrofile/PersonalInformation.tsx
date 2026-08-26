// PersonalInformation.tsx

"use client";

import { ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ProfileFormValues } from "@/schemas/profile.schema";

type Locale = "en" | "ar";

interface Props {
  form: UseFormReturn<ProfileFormValues>;
  locale: Locale;
}

const translations = {
  en: {
    title: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    gender: "Gender",
    selectGender: "Select gender",
    male: "Male",
    female: "Female",
    address: "Address",
  },

  ar: {
    title: "المعلومات الشخصية",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    gender: "النوع",
    selectGender: "اختر النوع",
    male: "ذكر",
    female: "أنثى",
    address: "العنوان",
  },
} as const;

const PersonalInformation = ({ form, locale }: Props) => {
  const t = translations[locale];

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 p-8">
        <h2 className="text-xl font-semibold">{t.title}</h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* First Name */}
          {/* الاسم الأول */}
          <div className="space-y-2">
            <Label htmlFor="firstName">{t.firstName}</Label>

            <Input id="firstName" {...register("firstName")} />

            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          {/* اسم العائلة */}
          <div className="space-y-2">
            <Label htmlFor="lastName">{t.lastName}</Label>

            <Input id="lastName" {...register("lastName")} />

            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>

            <Input id="email" type="email" {...register("email")} />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          {/* رقم الهاتف */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t.phone}</Label>

            <Input id="phone" {...register("phone")} />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          {/* النوع */}
          <div className="space-y-2">
            <Label htmlFor="gender">{t.gender}</Label>

            <div className="relative">
              <select
                id="gender"
                {...register("gender")}
                className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
              >
                <option value="">{t.selectGender}</option>
                <option value="MALE">{t.male}</option>
                <option value="FEMALE">{t.female}</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        {/* العنوان */}
        <div className="space-y-2">
          <Label htmlFor="address">{t.address}</Label>

          <Textarea id="address" rows={4} {...register("address")} />

          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
