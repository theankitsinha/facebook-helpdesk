/*
  Warnings:

  - You are about to drop the column `facebookUserId` on the `Message` table. All the data in the column will be lost.
  - Made the column `pageId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_pageId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "facebookUserId",
ALTER COLUMN "pageId" SET NOT NULL,
ALTER COLUMN "pageId" SET DATA TYPE TEXT;
