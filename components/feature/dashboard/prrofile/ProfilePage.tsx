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

const ProfilePage = () => {
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

  const onSubmit = async (values: ProfileFormValues) => {
    // Don't submit if nothing changed
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
      toast.error("Something went wrong");
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
            <h1 className="text-3xl font-bold">My Profile</h1>

            <p className="mt-2 text-muted-foreground">
              Keep your details up to date so the clinic can reach you.
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isDirty || saving}
            className="rounded-xl"
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
          <ProfileCard
            firstName={profile.firstName}
            lastName={profile.lastName}
          />

          <div className="space-y-8">
            <PersonalInformation form={form} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
