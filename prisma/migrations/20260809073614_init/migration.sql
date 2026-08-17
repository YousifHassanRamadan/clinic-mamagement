/*
  Warnings:

  - The values [NO_SHOW] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SECRETARY] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [SCHEDULED] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `privateNotes` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `ClinicSession` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `PatientTest` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `PsychologicalTest` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `PsychologicalTest` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedMinutes` on the `PsychologicalTest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `PsychologicalTest` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `TestCategory` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `TestCategory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `TestCategory` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `ClinicSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `points` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `ClinicSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `PsychologicalTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
ALTER TABLE "public"."Appointment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Appointment" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "public"."AppointmentStatus_old";
ALTER TABLE "Appointment" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('PATIENT', 'DOCTOR');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PATIENT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('COMPLETED', 'CANCELLED');
ALTER TABLE "public"."ClinicSession" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ClinicSession" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "public"."SessionStatus_old";
ALTER TABLE "ClinicSession" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClinicSession" DROP CONSTRAINT "ClinicSession_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientTag" DROP CONSTRAINT "PatientTag_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PatientTag" DROP CONSTRAINT "PatientTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "PatientTest" DROP CONSTRAINT "PatientTest_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PsychologicalTest" DROP CONSTRAINT "PsychologicalTest_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_questionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionAttachment" DROP CONSTRAINT "SessionAttachment_sessionId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "optionId",
ADD COLUMN     "points" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "patientId",
DROP COLUMN "updatedBy",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClinicSession" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "diagnosis",
DROP COLUMN "duration",
DROP COLUMN "mood",
DROP COLUMN "privateNotes",
DROP COLUMN "type",
DROP COLUMN "updatedBy",
ADD COLUMN     "appointmentId" TEXT,
ADD COLUMN     "fee" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "PatientTest" DROP COLUMN "createdBy",
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "status" "TestStatus" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "PsychologicalTest" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "estimatedMinutes",
DROP COLUMN "updatedBy",
ADD COLUMN     "createdById" TEXT NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedBy",
ADD COLUMN     "points" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TestCategory" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedBy";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "updatedBy",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "approval" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "lastName" TEXT NOT NULL;

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "PatientTag";

-- DropTable
DROP TABLE "QuestionOption";

-- DropTable
DROP TABLE "SessionAttachment";

-- DropTable
DROP TABLE "Tag";

-- DropEnum
DROP TYPE "AuditAction";

-- DropEnum
DROP TYPE "FileType";

-- DropEnum
DROP TYPE "Mood";

-- DropEnum
DROP TYPE "PatientStatus";

-- DropEnum
DROP TYPE "SessionType";

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Availability_date_idx" ON "Availability"("date");

-- CreateIndex
CREATE INDEX "Availability_isAvailable_idx" ON "Availability"("isAvailable");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Answer_patientTestId_idx" ON "Answer"("patientTestId");

-- CreateIndex
CREATE INDEX "Answer_questionId_idx" ON "Answer"("questionId");

-- CreateIndex
CREATE INDEX "Appointment_userId_idx" ON "Appointment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicSession_appointmentId_key" ON "ClinicSession"("appointmentId");

-- CreateIndex
CREATE INDEX "ClinicSession_patientId_idx" ON "ClinicSession"("patientId");

-- CreateIndex
CREATE INDEX "PatientTest_patientId_idx" ON "PatientTest"("patientId");

-- CreateIndex
CREATE INDEX "PatientTest_testId_idx" ON "PatientTest"("testId");

-- CreateIndex
CREATE INDEX "PsychologicalTest_categoryId_idx" ON "PsychologicalTest"("categoryId");

-- CreateIndex
CREATE INDEX "PsychologicalTest_createdById_idx" ON "PsychologicalTest"("createdById");

-- CreateIndex
CREATE INDEX "Question_testId_idx" ON "Question"("testId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicSession" ADD CONSTRAINT "ClinicSession_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicSession" ADD CONSTRAINT "ClinicSession_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsychologicalTest" ADD CONSTRAINT "PsychologicalTest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TestCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsychologicalTest" ADD CONSTRAINT "PsychologicalTest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTest" ADD CONSTRAINT "PatientTest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
