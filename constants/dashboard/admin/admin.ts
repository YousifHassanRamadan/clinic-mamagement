import { AdminAppointment } from "@/components/feature/dashboard/admin/appointments/types";
import { TestCategoryPage } from "@/components/feature/dashboard/admin/category/types";
import { Doctor } from "@/components/feature/dashboard/admin/create-appointment/types";
import {
  Activity,
  Appointment,
  Session,
  Stat,
} from "@/components/feature/dashboard/admin/overview/types";
import {
  DurationOption,
  Patient,
  SessionType,
} from "@/components/feature/dashboard/admin/sessions/manage-session/types";
import { CalendarDays, FileText, FolderOpen, Users } from "lucide-react";

export const stats: Stat[] = [
  {
    title: "Active Patients",
    value: 142,
    subtitle: "+11 this month",
    icon: Users,
  },
  {
    title: "Sessions This Month",
    value: 71,
    subtitle: "+12% vs last month",
    icon: CalendarDays,
  },
  {
    title: "Tests Completed",
    value: 41,
    subtitle: "86% completion",
    icon: FileText,
  },
];

export const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Daniel Okonkwo",
    type: "Individual Therapy",
    duration: "50 min",
    time: "13:30",
  },
  {
    id: 2,
    patient: "Noor Haddad",
    type: "Individual Therapy",
    duration: "50 min",
    time: "09:00",
  },
  {
    id: 3,
    patient: "Mariam Zayed",
    type: "Assessment Review",
    duration: "80 min",
    time: "15:00",
  },
  {
    id: 4,
    patient: "Elias Berg",
    type: "Follow-up",
    duration: "50 min",
    time: "11:30",
  },
];

export const recentSessions: Session[] = [
  {
    id: 1,
    patient: "Noor Haddad",
    diagnosis: "Generalized Anxiety",
    mood: "Good",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Mariam Zayed",
    diagnosis: "Moderate Depression",
    mood: "Low",
    status: "Completed",
  },
  {
    id: 3,
    patient: "Elias Berg",
    diagnosis: "Burnout Recovery",
    mood: "Excellent",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Theo Almeida",
    diagnosis: "Childhood Trauma",
    mood: "Neutral",
    status: "Completed",
  },
  {
    id: 5,
    patient: "Hana Sorensen",
    diagnosis: "PTSD",
    mood: "Good",
    status: "Completed",
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    title: "Updated Session",
    description: "Finished public note",
    time: "10:04",
  },
  {
    id: 2,
    title: "Uploaded Attachment",
    description: "Sleep Diary.pdf",
    time: "09:58",
  },
  {
    id: 3,
    title: "Assigned Tag",
    description: "Anxiety",
    time: "08:41",
  },
  {
    id: 4,
    title: "Created Session",
    description: "Follow-up",
    time: "Yesterday",
  },
];

export const patients: Patient[] = [
  {
    id: "1",
    name: "Noor Haddad",
  },
  {
    id: "2",
    name: "Mariam Zayed",
  },
  {
    id: "3",
    name: "Elias Berg",
  },
  {
    id: "4",
    name: "Theo Almeida",
  },
];

export const durations: DurationOption[] = [
  {
    id: "30",
    label: "30 minutes",
  },
  {
    id: "45",
    label: "45 minutes",
  },
  {
    id: "50",
    label: "50 minutes",
  },
  {
    id: "60",
    label: "60 minutes",
  },
  {
    id: "80",
    label: "80 minutes",
  },
];

export const sessionTypes: SessionType[] = [
  {
    id: "individual",
    name: "Individual Therapy",
  },
  {
    id: "follow-up",
    name: "Follow-up",
  },
  {
    id: "assessment",
    name: "Assessment Review",
  },
  {
    id: "couple",
    name: "Couples Therapy",
  },
  {
    id: "family",
    name: "Family Therapy",
  },
];

export const moods = [
  "EXCELLENT",
  "GOOD",
  "NEUTRAL",
  "LOW",
  "DISTRESSED",
] as const;

export const categories: TestCategoryPage[] = [
  {
    id: "1",
    name: "Anxiety & Panic",
    description: "GAD-7, PSWQ and panic severity screenings.",
    testsCount: 5,
  },

  {
    id: "2",
    name: "Mood & Depression",
    description: "PHQ-9, BDI-II and mood tracking instruments.",
    testsCount: 4,
  },

  {
    id: "3",
    name: "Trauma & Stress",
    description: "PCL-5, IES-R and dissociation screenings.",
    testsCount: 3,
  },

  {
    id: "4",
    name: "Burnout & Work",
    description: "MBI-based and occupational stress inventories.",
    testsCount: 2,
  },

  {
    id: "5",
    name: "Adolescent",
    description: "Age-appropriate screens for ages 13–18.",
    testsCount: 3,
  },
];

export const doctors: Doctor[] = [
  {
    id: "doctor-1",
    name: "Dr. Amara Lindqvist",
    role: "Clinical Psychologist",
    initials: "AL",
  },
];
