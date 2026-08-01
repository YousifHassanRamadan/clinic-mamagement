import {
  ClipboardList,
  Heart,
  Brain,
  Users,
  Sparkles,
  User,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About the doctor" },
  { href: "/contact", label: "Contact" },
];

export const Experiences = [
  { title: "14 yrs ", subtitle: "In practice" },
  { title: "400+ ", subtitle: "Clients supported" },
  { title: "9.9/10 ", subtitle: "Client rating" },
];

export const specialties = [
  "Anxiety & panic disorders",
  "Depression & mood regulation",
  "Burnout and workplace stress",
  "Trauma & PTSD",
  "Relationship and family dynamics",
  "Adolescent mental health",
];

export const services = [
  {
    title: "Individual Therapy",
    description:
      "Weekly 50-minute sessions tailored to anxiety, depression, trauma or burnout.",
    icon: User,
  },
  {
    title: "Couples & Family",
    description:
      "Structured sessions to rebuild communication and repair attachment ruptures.",
    icon: Users,
  },
  {
    title: "Adolescent Care",
    description:
      "Age-appropriate therapy for ages 13–18 with guided parent involvement.",
    icon: Sparkles,
  },
  {
    title: "Psychological Assessment",
    description:
      "Validated screening instruments with a written clinical interpretation.",
    icon: ClipboardList,
  },
  {
    title: "Burnout Recovery",
    description:
      "An 8-week programme for professionals rebuilding capacity and boundaries.",
    icon: Brain,
  },
  {
    title: "Follow-up & Aftercare",
    description:
      "Light-touch monthly check-ins to keep progress steady after discharge.",
    icon: Heart,
  },
];

export const features = [
  {
    number: "01",
    title: "One doctor, full continuity",
    description:
      "You are never passed between clinicians. Same therapist, every session.",
  },
  {
    number: "02",
    title: "Measured progress",
    description:
      "Standardised tests track change so improvement is visible, not guessed.",
  },
  {
    number: "03",
    title: "Private by design",
    description:
      "Clinical notes are split into shared and private records. You control your data.",
  },
  {
    number: "04",
    title: "Flexible sessions",
    description:
      "Meet on-site or remotely through a secure video consultation.",
  },
];

export const tests = [
  {
    category: "Anxiety",
    duration: "4 min",
    title: "GAD-7 Anxiety Screening",
    description:
      "Seven questions measuring generalized anxiety severity over the last two weeks.",
    questions: "7 questions",
  },
  {
    category: "Mood",
    duration: "5 min",
    title: "PHQ-9 Depression Scale",
    description:
      "Standard screening instrument for depressive symptoms and severity.",
    questions: "9 questions",
  },
  {
    category: "Stress",
    duration: "10 min",
    title: "Maslach Burnout Inventory",
    description:
      "Assesses emotional exhaustion, depersonalisation and personal accomplishment.",
    questions: "22 questions",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Marcus H.",
    role: "Client, 2 years",
    review:
      "I came in barely able to talk about my panic attacks. Two years later I've had none in eight months. The pacing was everything.",
  },
  {
    id: 2,
    name: "Priya N.",
    role: "Client, 8 months",
    review:
      "The test results dashboard made my progress feel real. Seeing my GAD-7 drop from 17 to 6 was the proof I needed.",
  },
  {
    id: 3,
    name: "Elena & Tom",
    role: "Couples therapy",
    review:
      "Dr. Lindqvist never took sides. She gave us a language for the same argument we'd been having for six years.",
  },
];

export const faqItems = [
  {
    question: "How long is a session?",
    answer:
      "Standard sessions run 50 minutes. Intake assessments are 80 minutes, and couples sessions are 75 minutes.",
  },
  {
    question: "Do you offer online sessions?",
    answer:
      "Yes. Sessions can be held securely through Google Meet for clients who prefer remote therapy.",
  },
  {
    question: "Is my information confidential?",
    answer:
      "Absolutely. Your information is stored securely and handled according to professional confidentiality standards.",
  },
  {
    question: "How do I cancel or reschedule?",
    answer:
      "Please notify us at least 24 hours before your appointment to cancel or reschedule without fees.",
  },
  {
    question: "Do psychological tests replace a diagnosis?",
    answer:
      "No. Assessments provide valuable information, but every result is reviewed together with the psychologist before any conclusions are made.",
  },
];

export const exploreLinks = [
  { title: "Home", href: "/" },
  { title: "About the doctor", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Patient sign in", href: "/sign-in" },
  { title: "Create account", href: "/sign-up" },
];

export const contactInfo = [
  {
    icon: Phone,
    text: "+1 (415) 555-0128",
  },
  {
    icon: Mail,
    text: "hello@serenemind.clinic",
  },
  {
    icon: MapPin,
    text: "224 Harborview Ave, Suite 5, San Francisco, CA",
  },
];
