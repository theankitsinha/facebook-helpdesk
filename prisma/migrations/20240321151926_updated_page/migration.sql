-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facebookEmail" TEXT,
ADD COLUMN     "facebookPicture" TEXT,
ADD COLUMN     "facebookUserId" TEXT;

-- CreateTable
CREATE TABLE "FacebookPage" (
    "id" SERIAL NOT NULL,
    "pageId" TEXT NOT NULL,
    "name" TEXT,
    "accessToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "facebookUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedUt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacebookPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FacebookPage_pageId_key" ON "FacebookPage"("pageId");

-- AddForeignKey
ALTER TABLE "FacebookPage" ADD CONSTRAINT "FacebookPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
