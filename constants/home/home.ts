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
  Clock3,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import DoctorImage from "@/assets/Serene-Mind-Clinic/doctor.jpg";

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

export const doctor = {
  image: DoctorImage,
  name: "Dr. Amara Lindqvist",
  title: "Clinical Psychologist",
  credentials: "PhD • PSY-48219 • California Board of Psychology",

  description:
    "For 14 years I have helped adults and adolescents move through anxiety, burnout, trauma and relationship strain. My work blends CBT, ACT and schema therapy with a simple belief: therapy should feel safe before it feels challenging.",
};

export const qualifications = [
  {
    degree: "PhD, Clinical Psychology",
    university: "Stanford University",
    year: "2011",
  },
  {
    degree: "MSc, Cognitive Neuroscience",
    university: "University of Copenhagen",
    year: "2007",
  },
  {
    degree: "Certified CBT Practitioner",
    university: "Beck Institute",
    year: "2013",
  },
  {
    degree: "EMDR Level II Certification",
    university: "EMDR International Association",
    year: "2016",
  },
];

export const certificates = [
  "Schema Therapy — Advanced Practitioner",
  "Acceptance & Commitment Therapy (ACT) — Peer Reviewed",
  "Trauma Focused CBT for Adolescents",
  "Mindfulness-Based Stress Reduction (MBSR) Teacher",
];

export const experiences = [
  {
    period: "2020 — Present",
    title: "Founder & Lead Psychologist",
    company: "Serene Mind Clinic",
    description:
      "Private practice supporting 400+ clients with individual, couples and family therapy.",
  },
  {
    period: "2016 — 2020",
    title: "Senior Clinical Psychologist",
    company: "Bay Area Behavioral Health",
    description:
      "Led CBT and ACT treatment programmes and supervised junior clinicians.",
  },
  {
    period: "2012 — 2016",
    title: "Research Fellow",
    company: "Stanford Mood & Anxiety Lab",
    description:
      "Published clinical research focused on evidence-based psychological interventions.",
  },
];

export const expertise = [
  "Anxiety Disorders",
  "Depression",
  "Burnout Recovery",
  "Trauma",
  "Relationship Counselling",
  "Couples Therapy",
  "Stress Management",
  "Self-Esteem",
  "Grief & Loss",
  "Life Transitions",
];

export const therapyMethods = [
  "Cognitive Behavioral Therapy (CBT)",
  "Acceptance & Commitment Therapy (ACT)",
  "Schema Therapy",
  "Mindfulness-Based Therapy",
  "EMDR",
];

export const languages = ["English", "Swedish", "Danish"];

export const contactFormFields = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Jane Anderson",
    required: true,
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "jane@mail.com",
    required: true,
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+1 (415) 555-0100",
    required: false,
    type: "tel",
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "New patient enquiry",
    required: false,
    type: "text",
  },
];

export const clinicInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (415) 555-0128",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@serenemind.clinic",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "224 Harborview Ave, Suite 5, San Francisco, CA",
  },
  {
    icon: Clock3,
    title: "Opening hours",
    value: "Mon – Fri • 9:00 – 18:00",
  },
];

export const socialLinks = [
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
];
