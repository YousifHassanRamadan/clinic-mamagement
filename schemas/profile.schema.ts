// schemas/profile.schema.ts

import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters"),

  address: z.string().trim().optional(),

  governorate: z.string().trim().optional(),

  city: z.string().trim().optional(),

  district: z.string().trim().optional(),

  street: z.string().trim().optional(),

  buildingNumber: z.string().trim().optional(),

  apartmentNumber: z.string().trim().optional(),

  postalCode: z.string().trim().optional(),

  gender: z.enum(["MALE", "FEMALE"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
