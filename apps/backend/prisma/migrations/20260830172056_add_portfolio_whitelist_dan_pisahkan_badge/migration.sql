/*
  Warnings:

  - The values [TOP_CONTRIBUTOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageUrl` on the `ClassMemory` table. All the data in the column will be lost.
  - Added the required column `mediaUrl` to the `ClassMemory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- AlterTable
ALTER TABLE "ClassMemory" DROP COLUMN "imageUrl",
ADD COLUMN     "mediaType" "MemoryType" NOT NULL DEFAULT 'IMAGE',
ADD COLUMN     "mediaUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Whitelist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "link" TEXT,
    "imageUrl" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_email_key" ON "Whitelist"("email");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
