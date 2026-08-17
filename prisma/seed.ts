import { PrismaClient, Prisma } from "../app/generated/prisma/client";

import {
  Role,
  Gender,
  AppointmentStatus,
  SessionStatus,
  SessionType,
  Mood,
  TestStatus,
} from "../app/generated/prisma/enums";

import { PrismaPg } from "@prisma/adapter-pg";

import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  // =====================================================
  // CLEAN DATABASE
  // =====================================================

  await prisma.answer.deleteMany();
  await prisma.patientTest.deleteMany();
  await prisma.testResultRange.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.psychologicalTest.deleteMany();
  await prisma.testCategory.deleteMany();

  await prisma.sessionAttachment.deleteMany();
  await prisma.clinicSession.deleteMany();

  await prisma.appointment.deleteMany();

  await prisma.availabilitySlot.deleteMany();
  await prisma.availability.deleteMany();

  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  await prisma.user.deleteMany();

  // =====================================================
  // PASSWORD
  // =====================================================

  const password = await bcrypt.hash("Password123!", 10);

  // =====================================================
  // USERS
  // =====================================================

  const doctor = await prisma.user.create({
    data: {
      firstName: "Ahmed",
      lastName: "Hassan",
      email: "doctor@example.com",
      phone: "01000000001",
      address: "Suez, Egypt",
      gender: Gender.MALE,
      password,
      role: Role.DOCTOR,
      approval: true,
    },
  });

  const patient1 = await prisma.user.create({
    data: {
      firstName: "Yousef",
      lastName: "Mohamed",
      email: "yousef@example.com",
      phone: "01000000002",
      address: "Suez, Egypt",
      gender: Gender.MALE,
      password,
      role: Role.PATIENT,
      approval: true,
    },
  });

  const patient2 = await prisma.user.create({
    data: {
      firstName: "Omar",
      lastName: "Ali",
      email: "omar@example.com",
      phone: "01000000003",
      address: "Cairo, Egypt",
      gender: Gender.MALE,
      password,
      role: Role.PATIENT,
      approval: true,
    },
  });

  const patient3 = await prisma.user.create({
    data: {
      firstName: "Sara",
      lastName: "Ahmed",
      email: "sara@example.com",
      phone: "01000000004",
      address: "Ismailia, Egypt",
      gender: Gender.FEMALE,
      password,
      role: Role.PATIENT,
      approval: true,
    },
  });

  const patient4 = await prisma.user.create({
    data: {
      firstName: "Mariam",
      lastName: "Hassan",
      email: "mariam@example.com",
      phone: "01000000005",
      address: "Port Said, Egypt",
      gender: Gender.FEMALE,
      password,
      role: Role.PATIENT,
      approval: true,
    },
  });

  // =====================================================
  // AVAILABILITY
  // =====================================================

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const thirdDay = new Date(tomorrow);
  thirdDay.setDate(thirdDay.getDate() + 2);

  const availability1 = await prisma.availability.create({
    data: {
      doctorId: doctor.id,
      date: tomorrow,
      startTime: new Date(`${tomorrow.toISOString().slice(0, 10)}T09:00:00`),
      endTime: new Date(`${tomorrow.toISOString().slice(0, 10)}T17:00:00`),
      duration: 60,
      isAvailable: true,

      slots: {
        create: [
          {
            time: "09:00",
            isAvailable: false,
          },
          {
            time: "10:00",
            isAvailable: true,
          },
          {
            time: "11:00",
            isAvailable: false,
          },
          {
            time: "12:00",
            isAvailable: true,
          },
          {
            time: "13:00",
            isAvailable: true,
          },
          {
            time: "14:00",
            isAvailable: true,
          },
          {
            time: "15:00",
            isAvailable: true,
          },
          {
            time: "16:00",
            isAvailable: true,
          },
        ],
      },
    },
  });

  const availability2 = await prisma.availability.create({
    data: {
      doctorId: doctor.id,
      date: dayAfterTomorrow,
      startTime: new Date(
        `${dayAfterTomorrow.toISOString().slice(0, 10)}T10:00:00`,
      ),
      endTime: new Date(
        `${dayAfterTomorrow.toISOString().slice(0, 10)}T16:00:00`,
      ),
      duration: 60,
      isAvailable: true,

      slots: {
        create: [
          {
            time: "10:00",
            isAvailable: true,
          },
          {
            time: "11:00",
            isAvailable: true,
          },
          {
            time: "12:00",
            isAvailable: true,
          },
          {
            time: "13:00",
            isAvailable: false,
          },
          {
            time: "14:00",
            isAvailable: true,
          },
          {
            time: "15:00",
            isAvailable: true,
          },
        ],
      },
    },
  });

  const availability3 = await prisma.availability.create({
    data: {
      doctorId: doctor.id,
      date: thirdDay,
      startTime: new Date(`${thirdDay.toISOString().slice(0, 10)}T09:00:00`),
      endTime: new Date(`${thirdDay.toISOString().slice(0, 10)}T15:00:00`),
      duration: 60,
      isAvailable: true,

      slots: {
        create: [
          {
            time: "09:00",
            isAvailable: true,
          },
          {
            time: "10:00",
            isAvailable: true,
          },
          {
            time: "11:00",
            isAvailable: true,
          },
          {
            time: "12:00",
            isAvailable: true,
          },
          {
            time: "13:00",
            isAvailable: true,
          },
          {
            time: "14:00",
            isAvailable: true,
          },
        ],
      },
    },
  });

  // Prevent unused variable warning
  console.log(
    "Created availabilities:",
    availability1.id,
    availability2.id,
    availability3.id,
  );

  // =====================================================
  // APPOINTMENTS
  // =====================================================

  const appointment1 = await prisma.appointment.create({
    data: {
      userId: patient1.id,
      date: new Date(`${tomorrow.toISOString().slice(0, 10)}T09:00:00`),
      status: AppointmentStatus.CONFIRMED,
      notes: "Initial consultation",
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      userId: patient2.id,
      date: new Date(`${tomorrow.toISOString().slice(0, 10)}T11:00:00`),
      status: AppointmentStatus.PENDING,
      notes: "Patient requested first consultation",
    },
  });

  const appointment3 = await prisma.appointment.create({
    data: {
      userId: patient3.id,
      date: new Date(`${dayAfterTomorrow.toISOString().slice(0, 10)}T13:00:00`),
      status: AppointmentStatus.CANCELLED,
      notes: "Cancelled by patient",
    },
  });

  const appointment4 = await prisma.appointment.create({
    data: {
      userId: patient4.id,
      date: new Date(`${thirdDay.toISOString().slice(0, 10)}T10:00:00`),
      status: AppointmentStatus.COMPLETED,
      notes: "Completed consultation",
    },
  });

  // =====================================================
  // CLINIC SESSIONS
  // =====================================================

  const clinicSession1 = await prisma.clinicSession.create({
    data: {
      patientId: patient1.id,
      appointmentId: appointment1.id,
      sessionDate: appointment1.date,
      duration: 60,
      sessionType: SessionType.INITIAL,
      mood: Mood.NEUTRAL,
      diagnosis: "General anxiety symptoms",
      publicNotes: "Initial assessment completed.",
      privateClinicalNotes:
        "Patient reports occasional anxiety during stressful situations.",
      shareNotes: true,
      sendSummaryEmail: true,
      status: SessionStatus.SCHEDULED,
      fee: new Prisma.Decimal("500.00"),

      attachments: {
        create: [
          {
            name: "initial-assessment.pdf",
            url: "https://example.com/files/initial-assessment.pdf",
            size: 245760,
            type: "application/pdf",
          },
        ],
      },
    },
  });

  const clinicSession2 = await prisma.clinicSession.create({
    data: {
      patientId: patient4.id,
      appointmentId: appointment4.id,
      sessionDate: appointment4.date,
      duration: 60,
      sessionType: SessionType.FOLLOW_UP,
      mood: Mood.GOOD,
      diagnosis: "Follow-up session",
      publicNotes: "Patient showed improvement.",
      privateClinicalNotes: "Continue current treatment plan.",
      shareNotes: true,
      sendSummaryEmail: false,
      status: SessionStatus.COMPLETED,
      fee: new Prisma.Decimal("600.00"),
    },
  });

  // =====================================================
  // TEST CATEGORIES
  // =====================================================

  const anxietyCategory = await prisma.testCategory.create({
    data: {
      name: "Anxiety",
      description: "Psychological tests related to anxiety symptoms.",
    },
  });

  const depressionCategory = await prisma.testCategory.create({
    data: {
      name: "Depression",
      description: "Psychological tests related to depression symptoms.",
    },
  });

  // =====================================================
  // PSYCHOLOGICAL TEST
  // =====================================================

  const anxietyTest = await prisma.psychologicalTest.create({
    data: {
      title: "Anxiety Assessment",
      description: "A simple assessment for measuring anxiety symptoms.",
      categoryId: anxietyCategory.id,
      createdById: doctor.id,
      isActive: true,

      questions: {
        create: [
          {
            question: "How often do you feel nervous or anxious?",
            order: 1,

            options: {
              create: [
                {
                  text: "Never",
                  points: 0,
                  order: 1,
                },
                {
                  text: "Sometimes",
                  points: 1,
                  order: 2,
                },
                {
                  text: "Often",
                  points: 2,
                  order: 3,
                },
                {
                  text: "Almost always",
                  points: 3,
                  order: 4,
                },
              ],
            },
          },
          {
            question: "How often do you have difficulty relaxing?",
            order: 2,

            options: {
              create: [
                {
                  text: "Never",
                  points: 0,
                  order: 1,
                },
                {
                  text: "Sometimes",
                  points: 1,
                  order: 2,
                },
                {
                  text: "Often",
                  points: 2,
                  order: 3,
                },
                {
                  text: "Almost always",
                  points: 3,
                  order: 4,
                },
              ],
            },
          },
          {
            question: "How often do you worry about different things?",
            order: 3,

            options: {
              create: [
                {
                  text: "Never",
                  points: 0,
                  order: 1,
                },
                {
                  text: "Sometimes",
                  points: 1,
                  order: 2,
                },
                {
                  text: "Often",
                  points: 2,
                  order: 3,
                },
                {
                  text: "Almost always",
                  points: 3,
                  order: 4,
                },
              ],
            },
          },
        ],
      },

      resultRanges: {
        create: [
          {
            minScore: 0,
            maxScore: 2,
            result: "Low anxiety",
            order: 1,
          },
          {
            minScore: 3,
            maxScore: 5,
            result: "Moderate anxiety",
            order: 2,
          },
          {
            minScore: 6,
            maxScore: 9,
            result: "High anxiety",
            order: 3,
          },
        ],
      },
    },

    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  // =====================================================
  // SECOND TEST
  // =====================================================

  const depressionTest = await prisma.psychologicalTest.create({
    data: {
      title: "Depression Screening",
      description: "A basic screening test for depressive symptoms.",
      categoryId: depressionCategory.id,
      createdById: doctor.id,
      isActive: true,

      questions: {
        create: [
          {
            question:
              "How often have you felt little interest in doing things?",
            order: 1,

            options: {
              create: [
                {
                  text: "Not at all",
                  points: 0,
                  order: 1,
                },
                {
                  text: "Several days",
                  points: 1,
                  order: 2,
                },
                {
                  text: "More than half the days",
                  points: 2,
                  order: 3,
                },
                {
                  text: "Nearly every day",
                  points: 3,
                  order: 4,
                },
              ],
            },
          },
          {
            question: "How often have you felt down or hopeless?",
            order: 2,

            options: {
              create: [
                {
                  text: "Not at all",
                  points: 0,
                  order: 1,
                },
                {
                  text: "Several days",
                  points: 1,
                  order: 2,
                },
                {
                  text: "More than half the days",
                  points: 2,
                  order: 3,
                },
                {
                  text: "Nearly every day",
                  points: 3,
                  order: 4,
                },
              ],
            },
          },
        ],
      },

      resultRanges: {
        create: [
          {
            minScore: 0,
            maxScore: 1,
            result: "Minimal symptoms",
            order: 1,
          },
          {
            minScore: 2,
            maxScore: 3,
            result: "Moderate symptoms",
            order: 2,
          },
          {
            minScore: 4,
            maxScore: 6,
            result: "Significant symptoms",
            order: 3,
          },
        ],
      },
    },
  });

  // =====================================================
  // PATIENT TEST
  // =====================================================

  const patientTest = await prisma.patientTest.create({
    data: {
      patientId: patient1.id,
      testId: anxietyTest.id,
      status: TestStatus.COMPLETED,
      score: 4,
      result: "Moderate anxiety",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
    },
  });

  // =====================================================
  // ANSWERS
  // =====================================================

  const question1 = anxietyTest.questions[0];
  const question2 = anxietyTest.questions[1];
  const question3 = anxietyTest.questions[2];

  const option1 = question1.options[2];
  const option2 = question2.options[1];
  const option3 = question3.options[1];

  await prisma.answer.createMany({
    data: [
      {
        patientTestId: patientTest.id,
        questionId: question1.id,
        optionId: option1.id,
        points: option1.points,
      },
      {
        patientTestId: patientTest.id,
        questionId: question2.id,
        optionId: option2.id,
        points: option2.points,
      },
      {
        patientTestId: patientTest.id,
        questionId: question3.id,
        optionId: option3.id,
        points: option3.points,
      },
    ],
  });

  // =====================================================
  // DONE
  // =====================================================

  console.log("✅ Seed completed successfully!");
  console.log("");
  console.log("👨‍⚕️ Doctor:");
  console.log("Email: doctor@example.com");
  console.log("Password: Password123!");
  console.log("");
  console.log("👤 Patients:");
  console.log("yousef@example.com");
  console.log("omar@example.com");
  console.log("sara@example.com");
  console.log("mariam@example.com");
  console.log("");
  console.log("Password for all users: Password123!");
  console.log("");
  console.log("📅 Availabilities: 3");
  console.log("📌 Appointments: 4");
  console.log("🧠 Tests: 2");
  console.log("📝 Patient Tests: 1");
  console.log("💬 Answers: 3");
  console.log("🩺 Sessions: 2");
}

main()
  .catch((error) => {
    console.error("❌ SEED_ERROR:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
