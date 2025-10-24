/*
  Warnings:

  - Made the column `userId` on table `TimeEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TimeEntry" ALTER COLUMN "userId" SET NOT NULL;
