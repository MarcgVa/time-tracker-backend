-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "issuedAt" DROP NOT NULL,
ALTER COLUMN "issuedAt" DROP DEFAULT;
