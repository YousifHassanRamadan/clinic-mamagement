// PersonalInformation.tsx

"use client";

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
  editing: boolean;
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

    addressInformation: "Address Information",
    address: "Address",
    governorate: "Governorate",
    city: "City",
    district: "District",
    street: "Street",
    buildingNumber: "Building Number",
    apartmentNumber: "Apartment Number",
    postalCode: "Postal Code",
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

    addressInformation: "معلومات العنوان",
    address: "العنوان",
    governorate: "المحافظة",
    city: "المدينة",
    district: "المنطقة",
    street: "الشارع",
    buildingNumber: "رقم المبنى",
    apartmentNumber: "رقم الشقة",
    postalCode: "الرمز البريدي",
  },
} as const;

const PersonalInformation = ({ form, locale, editing }: Props) => {
  const t = translations[locale];

  const {
    register,
    formState: { errors },
  } = form;

  const inputClassName = "rounded-xl";

  const disabledClassName = "disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-8 p-8">
        <div>
          <h2 className="text-xl font-semibold">{t.title}</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.firstName}</Label>

              <Input
                id="firstName"
                {...register("firstName")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">{t.lastName}</Label>

              <Input
                id="lastName"
                {...register("lastName")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email - NEVER EDITABLE */}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>

              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled
                readOnly
                className={`${inputClassName} cursor-not-allowed opacity-60 px-3`}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>

              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Gender - NEVER EDITABLE */}
            <div className="space-y-2">
              <Label htmlFor="gender">{t.gender}</Label>

              <select
                id="gender"
                {...register("gender")}
                disabled
                className={`${inputClassName} h-10 w-full cursor-not-allowed appearance-none border border-input bg-background px-3 py-2 text-sm opacity-60`}
              >
                <option value="">{t.selectGender}</option>

                <option value="MALE">{t.male}</option>

                <option value="FEMALE">{t.female}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold">{t.addressInformation}</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">{t.address}</Label>

              <Textarea
                id="address"
                rows={3}
                {...register("address")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Governorate */}
            <div className="space-y-2">
              <Label htmlFor="governorate">{t.governorate}</Label>

              <Input
                id="governorate"
                {...register("governorate")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.governorate && (
                <p className="text-sm text-destructive">
                  {errors.governorate.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">{t.city}</Label>

              <Input
                id="city"
                {...register("city")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district">{t.district}</Label>

              <Input
                id="district"
                {...register("district")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.district && (
                <p className="text-sm text-destructive">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Street */}
            <div className="space-y-2">
              <Label htmlFor="street">{t.street}</Label>

              <Input
                id="street"
                {...register("street")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.street && (
                <p className="text-sm text-destructive">
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* Building Number */}
            <div className="space-y-2">
              <Label htmlFor="buildingNumber">{t.buildingNumber}</Label>

              <Input
                id="buildingNumber"
                {...register("buildingNumber")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.buildingNumber && (
                <p className="text-sm text-destructive">
                  {errors.buildingNumber.message}
                </p>
              )}
            </div>

            {/* Apartment Number */}
            <div className="space-y-2">
              <Label htmlFor="apartmentNumber">{t.apartmentNumber}</Label>

              <Input
                id="apartmentNumber"
                {...register("apartmentNumber")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.apartmentNumber && (
                <p className="text-sm text-destructive">
                  {errors.apartmentNumber.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postalCode">{t.postalCode}</Label>

              <Input
                id="postalCode"
                {...register("postalCode")}
                disabled={!editing}
                className={`${inputClassName} ${disabledClassName} px-3`}
              />

              {errors.postalCode && (
                <p className="text-sm text-destructive">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
