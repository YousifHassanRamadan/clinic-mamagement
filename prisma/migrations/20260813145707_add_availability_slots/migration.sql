-- CreateTable
CREATE TABLE "AvailabilitySlot" (
    "id" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilitySlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AvailabilitySlot_availabilityId_idx" ON "AvailabilitySlot"("availabilityId");

-- CreateIndex
CREATE INDEX "AvailabilitySlot_isAvailable_idx" ON "AvailabilitySlot"("isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilitySlot_availabilityId_time_key" ON "AvailabilitySlot"("availabilityId", "time");

-- AddForeignKey
ALTER TABLE "AvailabilitySlot" ADD CONSTRAINT "AvailabilitySlot_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
