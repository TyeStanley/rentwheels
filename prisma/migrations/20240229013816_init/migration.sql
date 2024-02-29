/*
  Warnings:

  - The primary key for the `UserLikesCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserLikesCar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserLikesCar" DROP CONSTRAINT "UserLikesCar_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserLikesCar_pkey" PRIMARY KEY ("userId", "carId");
