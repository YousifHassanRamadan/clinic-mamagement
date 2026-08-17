export type Mood = "EXCELLENT" | "GOOD" | "NEUTRAL" | "LOW" | "DISTRESSED";

export interface Patient {
  id: string;
  name: string;
}

export interface SessionType {
  id: string;
  name: string;
}

export interface DurationOption {
  id: string;
  label: string;
}

export interface PublishingSettings {
  sharePublicNotes: boolean;
  sendSummaryEmail: boolean;
}
