/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,date]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctorId` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 60;

-- CreateIndex
CREATE INDEX "Availability_doctorId_idx" ON "Availability"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_doctorId_date_key" ON "Availability"("doctorId", "date");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
