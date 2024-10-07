/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `costPrice` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `model` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_categoryName_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "categoryName",
DROP COLUMN "costPrice",
DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "stock",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "model" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AdminSettings" (
    "id" SERIAL NOT NULL,
    "usePercentage" BOOLEAN NOT NULL,
    "percentageMarkup" DOUBLE PRECISION,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
