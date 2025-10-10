-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TimeEntry" DROP CONSTRAINT "TimeEntry_projectId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimeEntry" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
