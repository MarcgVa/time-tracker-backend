/*
  Warnings:

  - You are about to drop the column `duration` on the `TimeEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TimeEntry" DROP COLUMN "duration",
ADD COLUMN     "hours" TEXT;
