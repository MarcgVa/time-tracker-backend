/*
  Warnings:

  - You are about to drop the column `invoiced` on the `TimeEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."TimeEntry" DROP COLUMN "invoiced",
ADD COLUMN     "invoice" TEXT;
