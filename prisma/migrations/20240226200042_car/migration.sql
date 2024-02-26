/*
  Warnings:

  - You are about to drop the column `carImages` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `carTitle` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `carType` on the `Car` table. All the data in the column will be lost.
  - Added the required column `title` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "carImages",
DROP COLUMN "carTitle",
DROP COLUMN "carType",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
