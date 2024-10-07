/*
  Warnings:

  - You are about to drop the `AdminSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdminSettings";

-- CreateTable
CREATE TABLE "AdminSetting" (
    "id" SERIAL NOT NULL,
    "usePercentage" BOOLEAN NOT NULL DEFAULT true,
    "percentageMarkup" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSetting_pkey" PRIMARY KEY ("id")
);
