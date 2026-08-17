/*
  Warnings:

  - The values [ASSESSMENT] on the enum `SessionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionType_new" AS ENUM ('INITIAL', 'FOLLOW_UP', 'INDIVIDUAL', 'EMERGENCY', 'OTHER');
ALTER TABLE "public"."ClinicSession" ALTER COLUMN "sessionType" DROP DEFAULT;
ALTER TABLE "ClinicSession" ALTER COLUMN "sessionType" TYPE "SessionType_new" USING ("sessionType"::text::"SessionType_new");
ALTER TYPE "SessionType" RENAME TO "SessionType_old";
ALTER TYPE "SessionType_new" RENAME TO "SessionType";
DROP TYPE "public"."SessionType_old";
ALTER TABLE "ClinicSession" ALTER COLUMN "sessionType" SET DEFAULT 'INDIVIDUAL';
COMMIT;
