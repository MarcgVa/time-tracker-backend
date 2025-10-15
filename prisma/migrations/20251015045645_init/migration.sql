/*
  Warnings:

  - You are about to drop the column `Address` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Zip` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "Address",
DROP COLUMN "City",
DROP COLUMN "Country",
DROP COLUMN "FirstName",
DROP COLUMN "LastName",
DROP COLUMN "Phone",
DROP COLUMN "State",
DROP COLUMN "Zip",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip" TEXT;
