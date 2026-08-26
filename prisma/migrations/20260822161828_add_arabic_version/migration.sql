-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "notesAr" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "titleAr" TEXT;

-- AlterTable
ALTER TABLE "ClinicSession" ADD COLUMN     "diagnosisAr" TEXT,
ADD COLUMN     "privateClinicalNotesAr" TEXT,
ADD COLUMN     "publicNotesAr" TEXT;

-- AlterTable
ALTER TABLE "PsychologicalTest" ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "titleAr" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "questionAr" TEXT;

-- AlterTable
ALTER TABLE "QuestionOption" ADD COLUMN     "textAr" TEXT;

-- AlterTable
ALTER TABLE "TestCategory" ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "nameAr" TEXT;

-- AlterTable
ALTER TABLE "TestResultRange" ADD COLUMN     "resultAr" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressAr" TEXT,
ADD COLUMN     "firstNameAr" TEXT,
ADD COLUMN     "lastNameAr" TEXT;
