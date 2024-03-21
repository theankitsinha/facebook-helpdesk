-- DropForeignKey
ALTER TABLE "FacebookPage" DROP CONSTRAINT "FacebookPage_userId_fkey";

-- AlterTable
ALTER TABLE "FacebookPage" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FacebookPage" ADD CONSTRAINT "FacebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
