/*
  Warnings:

  - Made the column `FirstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `LastName` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "FirstName" SET NOT NULL,
ALTER COLUMN "LastName" SET NOT NULL;
