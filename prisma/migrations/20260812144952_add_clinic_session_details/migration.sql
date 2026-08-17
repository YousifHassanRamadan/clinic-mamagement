/*
  Warnings:

  - You are about to drop the column `notes` on the `ClinicSession` table. All the data in the column will be lost.
  - Added the required column `duration` to the `ClinicSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('INDIVIDUAL', 'FOLLOW_UP', 'ASSESSMENT', 'EMERGENCY', 'OTHER');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('VERY_BAD', 'BAD', 'NEUTRAL', 'GOOD', 'VERY_GOOD');

-- AlterTable
ALTER TABLE "ClinicSession" DROP COLUMN "notes",
ADD COLUMN     "diagnosis" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "mood" "Mood",
ADD COLUMN     "privateClinicalNotes" TEXT,
ADD COLUMN     "publicNotes" TEXT,
ADD COLUMN     "sendSummaryEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sessionType" "SessionType" NOT NULL DEFAULT 'INDIVIDUAL',
ADD COLUMN     "shareNotes" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "fee" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "SessionAttachment" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionAttachment_sessionId_idx" ON "SessionAttachment"("sessionId");

-- CreateIndex
CREATE INDEX "ClinicSession_status_idx" ON "ClinicSession"("status");

-- AddForeignKey
ALTER TABLE "SessionAttachment" ADD CONSTRAINT "SessionAttachment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClinicSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
