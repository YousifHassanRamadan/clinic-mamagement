import { Mood, SessionType, SessionStatus } from "@/app/generated/prisma/enums";
import { z } from "zod";

// ========================================
// Session Attachment Input
// ========================================

export const sessionAttachmentInputSchema = z.object({
  id: z.string().optional(),

  name: z.string().min(1, "File name is required"),

  url: z.string().url("Invalid file URL"),

  size: z.coerce.number().int().nonnegative("File size cannot be negative"),

  type: z.string().min(1, "File type is required"),

  publicId: z.string().optional(),

  resourceType: z.enum(["image", "raw", "video"]).optional(),
});

// ========================================
// Session
// ========================================

export const sessionFormSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),

  appointmentId: z.string().optional().or(z.literal("")),

  date: z.string().min(1, "Date is required"),

  time: z.string().min(1, "Time is required"),

  duration: z.coerce.number().int().positive("Duration must be greater than 0"),

  sessionType: z.enum([
    SessionType.INITIAL,
    SessionType.FOLLOW_UP,
    SessionType.INDIVIDUAL,
    SessionType.EMERGENCY,
    SessionType.OTHER,
  ]),

  diagnosis: z.string().trim().optional().or(z.literal("")),

  diagnosisAr: z.string().trim().optional().or(z.literal("")),

  mood: z
    .enum([Mood.VERY_BAD, Mood.BAD, Mood.NEUTRAL, Mood.GOOD, Mood.VERY_GOOD])
    .optional(),

  publicNotes: z.string().trim().optional().or(z.literal("")),

  publicNotesAr: z.string().trim().optional().or(z.literal("")),

  privateClinicalNotes: z.string().trim().optional().or(z.literal("")),

  privateClinicalNotesAr: z.string().trim().optional().or(z.literal("")),

  shareNotes: z.boolean(),

  sendSummaryEmail: z.boolean(),

  fee: z.coerce.number().min(0, "Fee cannot be negative"),

  attachments: z.array(sessionAttachmentInputSchema).default([]),
});

export const createSessionSchema = sessionFormSchema;

export const updateSessionSchema = sessionFormSchema.extend({
  sessionId: z.string().min(1, "Session ID is required"),
});

export const deleteSessionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
});

export const updateSessionStatusSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),

  status: z.enum([
    SessionStatus.DRAFT,
    SessionStatus.SCHEDULED,
    SessionStatus.COMPLETED,
    SessionStatus.CANCELLED,
    SessionStatus.NO_SHOW,
  ]),
});

export const createAttachmentSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),

  name: z.string().min(1, "File name is required"),

  url: z.string().url("Invalid file URL"),

  size: z.coerce.number().int().nonnegative("File size cannot be negative"),

  type: z.string().min(1, "File type is required"),
});

export const deleteAttachmentSchema = z.object({
  attachmentId: z.string().min(1, "Attachment ID is required"),
});

export type SessionAttachmentInput = z.infer<
  typeof sessionAttachmentInputSchema
>;

export type SessionFormInput = z.infer<typeof sessionFormSchema>;

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;

export type CreateAttachmentInput = z.infer<typeof createAttachmentSchema>;

export type DeleteSessionInput = z.infer<typeof deleteSessionSchema>;

export type UpdateSessionStatusInput = z.infer<
  typeof updateSessionStatusSchema
>;

export type DeleteAttachmentInput = z.infer<typeof deleteAttachmentSchema>;
