-- CreateTable
CREATE TABLE "TestAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "approval" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "fileUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "approval" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestAccess_userId_idx" ON "TestAccess"("userId");

-- CreateIndex
CREATE INDEX "TestAccess_testId_idx" ON "TestAccess"("testId");

-- CreateIndex
CREATE INDEX "TestAccess_approval_idx" ON "TestAccess"("approval");

-- CreateIndex
CREATE UNIQUE INDEX "TestAccess_userId_testId_key" ON "TestAccess"("userId", "testId");

-- CreateIndex
CREATE INDEX "Book_isActive_idx" ON "Book"("isActive");

-- CreateIndex
CREATE INDEX "BookAccess_userId_idx" ON "BookAccess"("userId");

-- CreateIndex
CREATE INDEX "BookAccess_bookId_idx" ON "BookAccess"("bookId");

-- CreateIndex
CREATE INDEX "BookAccess_approval_idx" ON "BookAccess"("approval");

-- CreateIndex
CREATE UNIQUE INDEX "BookAccess_userId_bookId_key" ON "BookAccess"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "TestAccess" ADD CONSTRAINT "TestAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAccess" ADD CONSTRAINT "TestAccess_testId_fkey" FOREIGN KEY ("testId") REFERENCES "PsychologicalTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAccess" ADD CONSTRAINT "BookAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAccess" ADD CONSTRAINT "BookAccess_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
