import {
  Appointment,
  SessionOption,
  TimeSlot,
} from "@/components/feature/dashboard/appointment/types";
import { SidebarGroupType } from "@/components/feature/dashboard/layout/types";
import { StatCardType } from "@/components/feature/dashboard/overview/types";
import {
  NotificationSetting,
  UserProfile,
} from "@/components/feature/dashboard/prrofile/types";
import { TestResult } from "@/components/feature/dashboard/result/types";
import { Question } from "@/components/feature/dashboard/take-test/types";
import {
  PsychologicalTest,
  TestCategory,
} from "@/components/feature/dashboard/tests/types";
import {
  Calendar,
  ClipboardCheck,
  FileText,
  Home,
  User,
  Clock3,
  CalendarDays,
  HeartPulse,
  CalendarPlus,
  MessageCircle,
  UserRound,
  Building2,
  Video,
  MapPin,
  LayoutDashboard,
  FolderTree,
  ClipboardList,
  CalendarCheck2,
  Stethoscope,
  User2Icon,
  BookIcon,
  TestTubeIcon,
  BookAIcon,
  TestTubesIcon,
} from "lucide-react";

export const sidebarItems: SidebarGroupType[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard/",
        icon: Home,
        roles: ["PATIENT"],
      },
      {
        title: "Doctor Dashboard",
        href: "/dashboard/admin/overview",
        icon: LayoutDashboard,
        roles: ["DOCTOR"],
      },
      {
        title: "Test Results",
        href: "/dashboard/admin/test-results",
        icon: TestTubesIcon,
        roles: ["DOCTOR"],
      },
      {
        title: "Categories",
        href: "/dashboard/admin/category",
        icon: FolderTree,
        roles: ["DOCTOR"],
      },
      {
        title: "Tests",
        href: "/dashboard/admin/tests",
        icon: ClipboardList,
        roles: ["DOCTOR"],
      },
      {
        title: "Book Access",
        href: "/dashboard/admin/book-access",
        icon: BookIcon,
        roles: ["DOCTOR"],
      },
      {
        title: "Books",
        href: "/dashboard/admin/books",
        icon: BookIcon,
        roles: ["DOCTOR"],
      },
      {
        title: "Test Access",
        href: "/dashboard/admin/test-access",
        icon: TestTubeIcon,
        roles: ["DOCTOR"],
      },
      {
        title: "Appointments",
        href: "/dashboard/admin/appoinments",
        icon: CalendarCheck2,
        roles: ["DOCTOR"],
      },
      {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: User2Icon,
        roles: ["DOCTOR"],
      },
      {
        title: "Sessions",
        href: "/dashboard/admin/sessions",
        icon: Stethoscope,
        roles: ["DOCTOR"],
      },
      {
        title: "Book Appointment",
        href: "/dashboard/patient/appointments/new",
        icon: CalendarPlus,
        roles: ["PATIENT"],
      },
      {
        title: "My Appointments",
        href: "/dashboard/patient/appointments",
        icon: CalendarDays,
        roles: ["PATIENT"],
      },
      {
        title: "Books",
        href: "/dashboard/patient/books",
        icon: BookIcon,
        roles: ["PATIENT"],
      },
      {
        title: "My Books",
        href: "/dashboard/patient/my-books",
        icon: BookAIcon,
        roles: ["PATIENT"],
      },
      {
        title: "Psychological Tests",
        href: "/dashboard/patient/tests",
        icon: ClipboardCheck,
        roles: ["PATIENT"],
      },
      {
        title: "Test Results",
        href: "/dashboard/patient/tests/results",
        icon: FileText,
        roles: ["PATIENT"],
      },
      {
        title: "My Profile",
        href: "/dashboard/profile",
        icon: User,
        roles: ["PATIENT", "DOCTOR"],
      },
    ],
  },
];

export const stats: StatCardType[] = [
  {
    title: "Upcoming",
    value: "2",
    description: "Appointments",
    icon: CalendarDays,
    color: "bg-blue-100 text-primary",
  },

  {
    title: "Sessions",
    value: "14",
    description: "Completed",
    icon: Clock3,
    color: "bg-green-100 text-green-600",
  },

  {
    title: "Tests",
    value: "6",
    description: "Finished",
    icon: ClipboardCheck,
    color: "bg-orange-100 text-orange-500",
  },

  {
    title: "Mood",
    value: "Good",
    description: "This week",
    icon: HeartPulse,
    color: "bg-pink-100 text-pink-500",
  },
];

export const upcomingAppointment = {
  doctor: "Dr. Amara Lindqvist",
  specialty: "Clinical Psychologist",
  date: "Monday, 18 Aug 2026",
  time: "10:30 AM",
  type: "Follow-up Session",
};

export const latestResult = {
  title: "GAD-7 Anxiety Test",
  score: 68,
  status: "Moderate Anxiety",
};

export const recentSessions = [
  {
    id: 1,
    title: "Follow-up Session",
    date: "12 Aug 2026",
    mood: "Calm",
    status: "Completed",
  },
  {
    id: 2,
    title: "Initial Consultation",
    date: "05 Aug 2026",
    mood: "Anxious",
    status: "Completed",
  },
  {
    id: 3,
    title: "CBT Session",
    date: "29 Jul 2026",
    mood: "Improved",
    status: "Completed",
  },
];

export const quickActions = [
  {
    titleKey: "appointment.book",
    icon: CalendarPlus,
    href: "/dashboard/patient/appointments/new",
  },
  {
    titleKey: "assessment.take",
    icon: ClipboardCheck,
    href: "/dashboard/patient/tests",
  },
  {
    titleKey: "profile.edit",
    icon: UserRound,
    href: "/dashboard/profile",
  },
] as const;

export const timeSlots: TimeSlot[] = [
  { id: 1, time: "09:00", available: true },
  { id: 2, time: "10:30", available: true },
  { id: 3, time: "12:00", available: false },
  { id: 4, time: "13:30", available: true },
  { id: 5, time: "15:00", available: true },
  { id: 6, time: "16:30", available: false },
  { id: 7, time: "18:00", available: true },
];

export const sessionOptions: SessionOption[] = [
  {
    id: "ONSITE",
    title: "On-site",
    description: "224 Harborview Ave, Suite 5",
  },
  {
    id: "ONLINE",
    title: "Google Meet",
    description: "Secure link sent before session",
  },
];

export const sessionIcons = {
  ONSITE: Building2,
  ONLINE: Video,
};

export const appointments: Appointment[] = [
  {
    id: 1,
    date: "01 Aug 2026",
    time: "09:00",
    doctor: "Dr. Amara Lindqvist",
    duration: "50 min",
    location: "On-site",
    notes: "Session 12 — burnout plan review",
    status: "UPCOMING",
    icon: MapPin,
  },
  {
    id: 2,
    date: "01 Aug 2026",
    time: "10:30",
    doctor: "Dr. Amara Lindqvist",
    duration: "50 min",
    location: "Google Meet",
    notes: "Exposure hierarchy step 4",
    status: "UPCOMING",
    icon: Video,
  },
  {
    id: 3,
    date: "01 Aug 2026",
    time: "13:00",
    doctor: "Dr. Amara Lindqvist",
    duration: "80 min",
    location: "On-site",
    notes: "Initial assessment",
    status: "UPCOMING",
    icon: MapPin,
  },
  {
    id: 4,
    date: "01 Aug 2026",
    time: "15:30",
    doctor: "Dr. Amara Lindqvist",
    duration: "50 min",
    location: "On-site",
    notes: "Awaiting parent confirmation",
    status: "PENDING",
    icon: MapPin,
  },
];

export const categories: {
  label: string;
  value: TestCategory;
}[] = [
  { label: "All", value: "ALL" },
  { label: "Anxiety", value: "ANXIETY" },
  { label: "Mood", value: "MOOD" },
  { label: "Stress", value: "STRESS" },
  { label: "Trauma", value: "TRAUMA" },
  { label: "Sleep", value: "SLEEP" },
  { label: "Wellbeing", value: "WELLBEING" },
];

export const psychologicalTests: PsychologicalTest[] = [
  {
    id: 1,
    title: "GAD-7 Anxiety Screening",
    description:
      "Seven questions measuring generalised anxiety severity over the last two weeks.",
    category: "ANXIETY",
    duration: 4,
    questions: 7,
  },
  {
    id: 2,
    title: "PHQ-9 Depression Scale",
    description:
      "The standard screening instrument for depressive symptoms and severity.",
    category: "MOOD",
    duration: 5,
    questions: 9,
  },
  {
    id: 3,
    title: "Maslach Burnout Inventory",
    description:
      "Assesses emotional exhaustion, depersonalisation and personal accomplishment.",
    category: "STRESS",
    duration: 10,
    questions: 22,
  },
  {
    id: 4,
    title: "PCL-5 Trauma Checklist",
    description: "Measures PTSD symptom clusters aligned with DSM-5 criteria.",
    category: "TRAUMA",
    duration: 8,
    questions: 20,
  },
  {
    id: 5,
    title: "Insomnia Severity Index",
    description:
      "Short screen for sleep onset, maintenance and daytime impact.",
    category: "SLEEP",
    duration: 3,
    questions: 7,
  },
];

export const questions: Question[] = [
  {
    id: 1,
    title: "Feeling nervous, anxious, or on edge",
    options: [
      { id: 1, label: "Not at all", value: 0 },
      { id: 2, label: "Several days", value: 1 },
      { id: 3, label: "More than half the days", value: 2 },
      { id: 4, label: "Nearly every day", value: 3 },
    ],
  },
];

export const profile: UserProfile = {
  fullName: "Marcus Holloway",
  email: "m.holloway@mail.com",
  phone: "+1 415 555 0182",
  birthday: "12 Mar 1991",
  occupation: "Software Engineer",
  emergencyContact: "Dana Holloway • +1 415 555 0190",
  address: "88 Fell St, San Francisco, CA",

  sessions: 24,
  memberSince: "Feb 2024",
  therapist: "Dr. Lindqvist",
};

export const notifications: NotificationSetting[] = [
  {
    id: 1,
    title: "Appointment reminders",
    description: "24 hours before each session",
    enabled: false,
  },
  {
    id: 2,
    title: "Test invitations",
    description: "When the doctor assigns a new assessment",
    enabled: true,
  },
  {
    id: 3,
    title: "Clinic announcements",
    description: "Occasional updates from the clinic",
    enabled: false,
  },
];
